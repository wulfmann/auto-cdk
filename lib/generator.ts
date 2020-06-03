import * as ag from '@aws-cdk/aws-apigateway';
import { Core } from './core';

export enum ResourceTypes {
  RESOURCE='RESOURCE',
  METHOD='METHOD'
}

export interface ResourceMapItem {
  path: string;
  child?: ResourceMapItem;
  isParameter: boolean;
}

export interface ResourceMap {
  [key: string]: ResourceMapItem;
}

export class Generator {
  private core: Core;
  private resources: ResourceMap;

  constructor(core: Core, resources: ResourceMap) {
    this.core = core;
    this.resources = resources;
    
    for (const r in this.resources) {
    this.createResource(this.core.api.root, this.resources[r]);
    }
  }
  
  private createResource(parent: ag.Resource | ag.IResource, next: ResourceMapItem): ag.Resource | ag.IResource {
    const current = parent.addResource(next.path);
    if (next.child) {
      return this.createResource(current, next.child);
    } else {
      return current
    }
  }
}