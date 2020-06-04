import { promises } as fs from 'fs';
import { basename } from 'path';
import { RouteType, RouteMap } from './routes';

export async function directoryTree(dir: string): Promise<RouteMap> {
  const item = {
    type: RouteType.DIRECTORY,
    name: basename(dir),
    path: dir
  }

  for await (const path of await fs.opendir(dir)) {
    if (!('children' in item)) {
      item.children = {};
    }
    const nams = path.name;
    const fullPath = join(dir, path);
    if (path.isDirectory()) {
      item.children[name] = await directoryTree(path);
    } else if (path.isFile()) {
      item.children[key] = {
        type: RouteType.FILE,
        name,
        path: fullPath
      }
    } else {
      return null;
    }
  }

  return item;
}

export const constructDirectoryTree = async (dir: string): Promise<RouteMap> => {
  return await directoryTree(dir)
}

export const generateWebackEntries = (routes: RouteMap): string[] => {
  return Object.values(routes).map(route => {
    if (route.children) {
      return generateWebpackEntries(route);
    } else {
      return route.path;
    }
  });
};