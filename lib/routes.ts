import { directoryTree, isNotFound } from './utils';
import { Config } from './config';

export enum RouteType {
    DIRECTORY='DIRECTORY',
    FILE='FILE'
}

export interface IRouteMap {
    children?: IRoute;
    type: RouteType;
    name: string;
    path: string;
    relativePath: string;
}

export interface IRoute {
    [key: string]: IRouteMap;
}

export const constructRouteMap = async (dir: string, config: Config): Promise<IRouteMap> => {
    console.log(process.cwd())
    if (config.debug) {
        console.log(`Constructing RouteMap for: ${dir}`);
    }
    try {
        return await directoryTree(dir);
    }catch (e) {
        if (isNotFound(e)) {
            return Promise.reject(`${dir} does not exist in ${config.workingDirectory}`);
        } else {
            return Promise.reject(e);
        }
    }
}
