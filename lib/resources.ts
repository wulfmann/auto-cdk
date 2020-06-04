import { IRouteMap, RouteType } from './routes';

export enum ResourceType {
    RESOURCE = 'RESOURCE',
    METHOD = 'METHOD'
}

export interface IResourceMap {
    name: string;
    path: string;
    type: ResourceType;
    children?: IResource;
}

export interface IResource {
    [key: string]: IResourceMap;
}

export const constructResourceMap = (route: IRouteMap): IResourceMap => {
    if (route.type === RouteType.DIRECTORY) {
        const item: IResourceMap = {
            name: route.name,
            path: route.path,
            type: ResourceType.RESOURCE
        }
        if (route.children) {
            const children = route.children;
            item.children = Object.keys(children)
                .reduce((acc: IResource, key) => {
                    acc[key] = constructResourceMap(children[key]);
                    return acc
                }, {})
        }
        return item
    } else {
        return {
            name: route.name,
            path: route.path,
            type: ResourceType.METHOD
        }
    }
}
