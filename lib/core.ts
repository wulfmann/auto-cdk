import * as cdk from '@aws-cdk/core';
import * as ag from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';

export interface CoreProps {
  app?: cdk.App;
  stack?: cdk.Stack;
}

export class Core {
  public app: cdk.App;
  public stack: cdk.Stack;
  public api: ag.RestApi;

  constructor(id: string, props?: CoreProps) {
    this.app = props?.app || new cdk.App();
    this.stack = props?.stack || new cdk.Stack(this.app);
    this.api = new ag.RestApi(id);
  }
}
