import * as path from 'path';
import * as fs from 'fs';
import { walk } from './utils';

export enum RouteType {
    DIRECTORY='DIRECTORY',
    FILE='FILE'
}

export interface Route {
    children?: RouteMap;
    type: RouteType;
}

export interface RouteMap {
    [key: string]: Route;
}

