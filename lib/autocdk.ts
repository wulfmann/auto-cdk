import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { constructRouteMap, IRouteMap } from './routes';
import { constructResourceMap, IResourceMap, IResource, ResourceType } from './resources';
import { Config, Environment, ConfigProps } from './config';

const INDEX = 'index';

export type ResourceLike = ag.Resource | ag.IResource;
export type MethodLike = ag.Method;

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
    const routeMap = await constructRouteMap(this.config.rootDirectory, this.config);
    this.routeMap = routeMap;
    return this.routeMap;
  }
  
  public async constructResources(): Promise<void> {
    const routes = await this.constructRoutes();
    const resourceMap = constructResourceMap(routes, this.config.rootDirectory, this.config);
    this.createResourcesFromMap(this.api.root, resourceMap);
  }

  private createResourcesFromMap(parent: ResourceLike, resourceMap: IResourceMap) {
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
        this.createMethod(parent, resourceMap);
      } else {
        const resource = this.createResource(parent, resourceMap.name);
        this.createMethod(resource, resourceMap);
      }
    }
  }

  private createResource(parent: ResourceLike, path: string, options?: ag.ResourceOptions) {
    if (this.config.debug) {
      console.log(`Creating Resource: ${path}`);
    }
    
    return parent.addResource(path, options);
  }

  private createMethod(parent: ResourceLike, resource: IResourceMap, options?: ag.MethodOptions) {
    const method = 'ANY';

    if (this.config.debug) {
      console.log(`Attaching Method: ${method}, to Resource: ${parent.path}`);
    }
    
    const logicalId = `${this.id}${parent.path}${method}Function`;
    const integration = this.createIntegration(resource, logicalId);
    return parent.addMethod(method, integration, options);
  }

  private createIntegration(resource: IResourceMap, id: string, props?: CreateIntegrationProps) {
    const normalizedAssetDir = this.config.assetDir.endsWith('/') ? this.config.assetDir : `${this.config.assetDir}/`;
    const assetPath = `${normalizedAssetDir}${resource.assetPath}`;
    const lambdaProps = {
      runtime: props?.runtime || this.config.defaultRuntime,
      handler: props?.handler || this.config.defaultHandler,
      code: lambda.Code.fromAsset(assetPath)
    };

    const fn = this.createLambda(`${id}Function`, lambdaProps);
    return new ag.LambdaIntegration(fn);
  }

  private createLambda(id: string, props: lambda.FunctionProps) {
    return new lambda.Function(this.stack, id, props);
  }
}
