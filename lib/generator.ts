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
}