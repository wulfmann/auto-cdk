import { join, parse } from 'path';
import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';

import { constructRouteMap, Route, RouteType, RouteMap } from './routes';

export interface Config {
  createEmptyResources: boolean;
}

export type ResourceLike = ag.Resource | ag.IResource;
export type MethodLike = ag.Method;

export interface ResourceItem {
  name: string;
  path: string;
  children?: ResourceMap;
  construct?: ResourceLike | MethodLike;
}

export interface ResourceMap {
  [key: string]: ResourceItem;
}

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
  private readonly root: string;
  public readonly config: Config;
  private apiResources: ResourceItem;

  constructor(id: string, props?: AutoCdkProps) {
    const defaultConfig: Config = {
      createEmptyResources: true
    };

    this.config = defaultConfig;

    this.root = props?.root || join(process.cwd(), 'api')
    this.app = props?.app  || new cdk.App({
      outdir: `${process.cwd()}/cdk.out`
    });
    this.stack = props?.stack || new cdk.Stack(this.app, id);
    this.api = props?.api || new ag.RestApi(this.stack, id);
  }

  public synth() {
    return this.app.synth();
  }
  
  public async constructRoutes(): Promise<Route> {
    return constructRouteMap(this.root);
  }
  
  public async constructApi(): Promise<void> {
    const routes = await this.constructRoutes();
    this.apiResources = this.constructResourceTree(this.api.root, routes);
  }

  private constructResourceTree(parent: ResourceLike, route: Route) {
    const item: ResourceItem = {
      name: route.name,
      path: route.path
    };

    const parsed = parse(route.path);

    if (route.type === RouteType.DIRECTORY) {
      const construct = this.createResource(parent, route.name);
      item.construct = construct;

      if (route.children) {
        const children = route.children;
        item.children = Object.keys(children).reduce((acc: ResourceMap, key) => {
          acc[key] = this.constructResourceTree(construct, children[key]);
          return acc
        }, {})
      }
    } else {
      if (parsed.name === 'index') {
        item.construct = this.createMethod(parent);
      } else {
        const resource = this.createResource(parent, parsed.name);
        item.construct = this.createMethod(resource);
      }
    }
    
    return item
  }
  
  private createResource(parent: ResourceLike, path: string) {
    console.log(`Creating Resource: /${path}`);
    return parent.addResource(path);
  }

  private createMethod(parent: ResourceLike, method='ANY') {
    console.log(`Attaching Method: ${method}, to Resource: ${parent.path}`);
    return parent.addMethod(method);
  }
}
