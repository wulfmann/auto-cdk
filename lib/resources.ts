import { parse } from 'path';
import { IRouteMap, RouteType } from './routes';
import { Config } from './config';

export enum ResourceType {
    RESOURCE = 'RESOURCE',
    METHOD = 'METHOD'
}

export interface IResourceMap {
    name: string;
    path: string;
    assetPath: string;
    type: ResourceType;
    children?: IResource;
}

export interface IResource {
    [key: string]: IResourceMap;
}

export const constructResourceMap = (route: IRouteMap, targetDirectory: string, config: Config): IResourceMap => {
    if (config.debug) {
        console.log(`Constructing ResourceMap for: ${route.name}`);
    }

    const parsed = parse(route.path);

    let adjustedDir = parsed.dir;
    if (config.includeRoot) {
        adjustedDir = parsed.dir.startsWith(targetDirectory) ? parsed.dir.slice(targetDirectory.length): parsed.dir;
    }

    const assetPath = `${adjustedDir}/${parsed.name}`;

    if (route.type === RouteType.DIRECTORY) {
        const item: IResourceMap = {
            name: parsed.name,
            path: route.path,
            assetPath: assetPath,
            type: ResourceType.RESOURCE
        }
        if (route.children) {
            const children = route.children;
            item.children = Object.keys(children)
                .reduce((acc: IResource, key) => {
                    acc[key] = constructResourceMap(children[key], targetDirectory, config);
                    return acc
                }, {})
        }
        return item
    } else {
        return {
            name: parsed.name,
            path: route.path,
            assetPath: assetPath,
            type: ResourceType.METHOD
        }
    }
}
