import * as cdk from 'aws-cdk';
import { AutoCdk } from 'auto-cdk';

const app = new cdk.App();
const stack = new cdk.Stack();

new AutoCdk('my-api', {
  app,
  stack
}).build():
