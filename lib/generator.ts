import * as ag from '@aws-cdk/aws-apigateway';
import { Core } from './core';
import { RouteMap } from './routes';

export class Generator {
  private core: Core;
  private routes: RouteMap;

  constructor(core: Core, routes: RouteMap) {
    this.core = core;
    this.routes = routes;
  }
  
  private constructResourceTree(parent: ag.Resource, route: RouteMap) => {
    const item = {};
    if (route.type === RouteType.DIRECTORY) {
      const resource = this.createResource(parent, route.name);
      item.construct = resource;
      
      if (route.children) {
        item.children = constructResourceTree(item.construct, route.children)
      }
    } else {
      const method = this.createMethod(parent, route.path);
      item.construct = method;
    }
    
    return item
  }
  
  private createResource(parent: ag.Resource, path: string) => {
    return parent.addResource(path);
  }
  
  private createMethod(parent: ag.Resource, path: string) => {
    const integration = this.createIntegration(path);
    return parent.addMethod(integration);
  }
  
  private createIntegration(path: string) => {
  
  }
}