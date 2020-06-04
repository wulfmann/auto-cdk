export enum RouteType {
    DIRECTORY='DIRECTORY',
    FILE='FILE'
}

export interface Route {
    children?: RouteMap;
    type: RouteType;
    name: string;
    path: string;
}

export interface RouteMap {
    [key: string]: Route;
}

