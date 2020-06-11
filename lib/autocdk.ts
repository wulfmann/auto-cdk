import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { constructRouteMap, IRouteMap } from './routes';
import { constructResourceMap, IResourceMap, IResource, ResourceType } from './resources';
import { Config, Environment, ConfigProps } from './config';
import { isNotFound } from './utils';

const INDEX = 'index';

export type ResourceLike = ag.Resource | ag.IResource;
export type MethodLike = ag.Method;

export interface ExportedIntegrationOptions {
  model?: {
    contentType: string
    schema: ag.JsonSchema;
  }
}

export interface AutoCdkProps{
  app?: cdk.App;
  stack?: cdk.Stack;
  api?: ag.RestApi;
  config?: ConfigProps;
}

export interface CreateIntegrationProps {
  runtime?: lambda.Runtime;
  handler?: string;
}

export class AutoCdk {
  public readonly app: cdk.App;
  public readonly stack: cdk.Stack;
  public readonly api: ag.RestApi;
  public readonly config: Config;
  public routeMap: IRouteMap;
  private readonly id: string;

  constructor(id: string, env: Environment, props?: AutoCdkProps) {
    this.id = id;
    this.config = new Config({ env, ...props?.config });

    if (this.config.debug) {
      console.log(`Using: ${this.config.workingDirectory} as working directory`);
    }

    this.app = props?.app  || new cdk.App({
      outdir: `${this.config.workingDirectory}/cdk.out`
    });

    this.stack = props?.stack || new cdk.Stack(this.app, id);
    this.api = props?.api || new ag.RestApi(this.stack, id);
  }

  public synth() {
    return this.app.synth();
  }
  
  public async constructRoutes(): Promise<IRouteMap> {
    if (this.config.debug) {
      console.log('Constructing Routes')
    }
    const routeMap = await constructRouteMap(this.config.rootDirectory, this.config);
    this.routeMap = routeMap;
    return this.routeMap;
  }
  
  public async constructResources(): Promise<void> {
    if (this.config.debug) {
      console.log('Constructing Resources')
    }
    const routes = await this.constructRoutes();
    const resourceMap = constructResourceMap(routes, this.config.rootDirectory, this.config);
    this.createResourcesFromMap(this.api.root, resourceMap);
  }

  private async createResourcesFromMap(parent: ResourceLike, resourceMap: IResourceMap) {
    if (resourceMap.type === ResourceType.RESOURCE) {
      if (resourceMap.children) {
        const resource = this.createResource(parent, resourceMap.name);
        const children = resourceMap.children;
        Object.keys(children).forEach(child => {
          this.createResourcesFromMap(resource, children[child]);
        })
      } else {
        if (this.config.createEmptyResources) {
          this.createResource(parent, resourceMap.name);
        }
      }
    } else {
      if (resourceMap.name === INDEX) {
        await this.createMethod(parent, resourceMap);
      } else {
        const resource = this.createResource(parent, resourceMap.name);
        await this.createMethod(resource, resourceMap);
      }
    }
  }

  private createResource(parent: ResourceLike, path: string, options?: ag.ResourceOptions) {
    if (this.config.debug) {
      console.log(`Creating Resource: ${path}`);
    }
    
    return parent.addResource(path, options);
  }

  private async createMethod(parent: ResourceLike, resource: IResourceMap, options?: ag.MethodOptions) {
    const method = 'ANY';

    if (this.config.debug) {
      console.log(`Attaching Method: ${method}, to Resource: ${parent.path}`);
    }
    
    const logicalId = `${this.id}${parent.path}${method}Function`;
    const normalizedAssetDir = this.config.assetDir.endsWith('/') ? this.config.assetDir : `${this.config.assetDir}/`;
    const assetPath = `${normalizedAssetDir}${resource.assetPath}`;

    const exportedIntegrationOptions: ExportedIntegrationOptions = await gatherIntegrationOptions(assetPath);

    const integration = await this.createIntegration(assetPath, logicalId);

    const methodProps: {
      requestModels?: {
        [param: string]: ag.IModel;
      },
      requestValidator?: ag.IRequestValidator;
    } = {};

    if (exportedIntegrationOptions.model) {
      const { schema, contentType } = exportedIntegrationOptions.model;
      const modelName = ''
      const model = this.api.addModel('', {
        schema,
        modelName
      });

      if (!methodProps.requestModels) {
        methodProps.requestModels = {}
      }

      methodProps.requestModels[contentType] = {
        modelId: model.modelId
      }

      const validatorLogicalId = ''
      const validator = new ag.RequestValidator(this.stack, validatorLogicalId, {
        restApi: this.api,
        requestValidatorName: `${modelName}-validator`,
        validateRequestBody: true
      });

      methodProps.requestValidator = validator;
    }

    const addMethodOptions: ag.MethodOptions = Object.assign({}, methodProps);

    return parent.addMethod(method, integration, addMethodOptions);
  }

  private async createIntegration(assetPath: string, id: string, props?: CreateIntegrationProps) {
    const lambdaProps = {
      runtime: props?.runtime || this.config.defaultRuntime,
      handler: props?.handler || this.config.defaultHandler,
      code: lambda.Code.fromAsset(assetPath)
    };

    try {
      const fn = this.createLambda(`${id}Function`, lambdaProps);
      return new ag.LambdaIntegration(fn);
    } catch (e) {
      if (isNotFound(e)) {
        console.error(`Unable to add lambda integration. ${assetPath} was not found. This most likely means webpack did not run before this process.`);
        process.exit();
      } else {
        throw e;
      }
    }
  }

  private createLambda(id: string, props: lambda.FunctionProps) {
    return new lambda.Function(this.stack, id, props);
  }
}

export async function gatherIntegrationOptions(path: string): Promise<ExportedIntegrationOptions> {
  const exports = await import(path);
  return {}
}
