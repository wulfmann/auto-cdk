import { directoryTree, isNotFound } from './utils';

export enum RouteType {
    DIRECTORY='DIRECTORY',
    FILE='FILE'
}

export interface IRouteMap {
    children?: IRoute;
    type: RouteType;
    name: string;
    path: string;
}

export interface IRoute {
    [key: string]: IRouteMap;
}

export const constructRouteMap = async (dir: string): Promise<IRouteMap> => {
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
