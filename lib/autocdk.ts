import { join, parse } from 'path';
import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';

import { constructRouteMap, IRouteMap } from './routes';
import { constructResourceMap, IResourceMap } from './resources';
import { Config } from './config';

export type ResourceLike = ag.Resource | ag.IResource;
export type MethodLike = ag.Method;

export interface AutoCdkProps{
  app?: cdk.App;
  stack?: cdk.Stack;
  api?: ag.RestApi;
  root?: string;
}

export class AutoCdk {
  public readonly app: cdk.App;
  public readonly stack: cdk.Stack;
  public readonly api: ag.RestApi;
  public readonly config: Config;
  public routeMap: IRouteMap;

  private readonly root: string;

  constructor(id: string, props?: AutoCdkProps) {
    this.root = props?.root || join(process.cwd(), 'api');

    const defaultConfig: Config = {
      createEmptyResources: true,
      root: this.root
    };

    this.config = defaultConfig;
    this.app = props?.app  || new cdk.App({
      outdir: `${process.cwd()}/cdk.out`
    });
    this.stack = props?.stack || new cdk.Stack(this.app, id);
    this.api = props?.api || new ag.RestApi(this.stack, id);
  }

  public synth() {
    return this.app.synth();
  }
  
  public async constructRoutes(): Promise<IRouteMap> {
    const routeMap = await constructRouteMap(this.root);
    this.routeMap = routeMap;
    return this.routeMap;
  }
  
  public async constructResources(): Promise<IResourceMap> {
    const routes = await this.constructRoutes();
    return constructResourceMap(routes);
  }

  // private createResource(parent: ResourceLike, path: string) {
  //   console.log(`Creating Resource: /${path}`);
  //   return parent.addResource(path);
  // }

  // private createMethod(parent: ResourceLike, method='ANY') {
  //   console.log(`Attaching Method: ${method}, to Resource: ${parent.path}`);
  //   return parent.addMethod(method);
  // }
}
