import { directoryTree, isNotFound } from './utils';

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

export const constructRouteMap = async (dir: string): Promise<Route> => {
    try {
        return await directoryTree(dir);
    }catch (e) {
        if (isNotFound(e)) {
            return Promise.reject(`${dir} does not exist.`);
        } else {
            return Promise.reject(e);
        }
    }
}
