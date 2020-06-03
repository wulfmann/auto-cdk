import { promises } as fs from 'fs';
import { basename } from 'path';
import { RouteType, RouteMap } from './routes';

export async function directoryTree(dir: string): Promise<RouteMap> {
  const item = {
    type: RouteType.DIRECTORY
  }

  for await (const path of await fs.opendir(dir)) {
    if (!('children' in item)) {
      item.children = {};
    }
    const key = path.name;
    if (path.isDirectory()) {
      item.children[key] = await directoryTree(path);
    } else if (path.isFile()) {
      item.children[key] = {
        type: RouteType.FILE
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