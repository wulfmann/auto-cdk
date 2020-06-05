import { parse } from 'path';
import { IRouteMap } from '../../routes';
import { Config } from '../../config';

export interface Entrypoint {
    [key: string]: string;
}

/**
 * Converts a IRouteMap to a map of webpack entrypoints
 */
export const createEntrypoints = (routeMap: IRouteMap, targetDirectory: string, config: Config): Entrypoint => {
    let result: Entrypoint = {};
    if (routeMap.children) {
        for (const key in routeMap.children) {
            Object.assign(result, createEntrypoints(routeMap.children[key], targetDirectory, config));
        }
    } else {
        const parsed = parse(routeMap.path);
        let adjustedDir = parsed.dir;
        if (config.includeRoot) {
            adjustedDir = parsed.dir.startsWith(targetDirectory) ? parsed.dir.slice(targetDirectory.length): parsed.dir;
        }
        const key = `${adjustedDir}/${parsed.name}`
        result[key] = routeMap.relativePath;
    }
    return result
}
