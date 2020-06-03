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

export const generateRouteMap = (dir: string): any => {
    let result: any = {}
    fs.readdirSync(dir).forEach(item => {
        const full = path.join(dir, item);
        const stats = fs.statSync(full);
        if (stats.isDirectory()) {
            const parent = path.basename(path.dirname(full));
            if (parent in result) {
                result[parent].children[item] = {
                    type: RouteType.DIRECTORY
                }
            } else {
                result[item] = {
                    type: RouteType.DIRECTORY
                }
            }
            
            return generateRouteMap(full)
        } else if (stats.isFile()) {
            const parsed = path.parse(full);
            const parent = path.basename(path.dirname(full));
            console.log(parent, parsed)
            console.log(result)
            if (parent in result) {
                console.log('found parent')
                if (!('children' in result[parent])) {
                    result[parent].children = {}
                }

                // result[parent].children[item] = {
                //     type: RouteType.FILE
                // }
            } else {
                result[item] = {
                    type: RouteType.FILE
                }
            }
            return
        } else {
            throw new Error(`expected directory or file`)
        }
    })
    return result
}
