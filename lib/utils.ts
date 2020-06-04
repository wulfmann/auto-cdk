import { promises as fs } from 'fs';
import { basename, join } from 'path';
import { RouteType, IRouteMap } from './routes';

export async function directoryTree(dir: string): Promise<IRouteMap> {
  const root = basename(dir);
  const item: IRouteMap =  {
    type: RouteType.DIRECTORY,
    name: root,
    path: dir
  }

  for await (const path of await fs.opendir(dir)) {
    if (!(item.children)) {
      item.children = {};
    }
    const name = path.name;
    const fullPath = join(dir, name);
    if (path.isDirectory()) {
      item.children[name] = await directoryTree(fullPath);
    } else if (path.isFile()) {
      item.children[name] = {
        type: RouteType.FILE,
        name,
        path: fullPath
      }
    } else {
      continue;
    }
  }
  return item;
}

export const isNotFound = (error: any) => {
  return error.code === 'ENOENT';
};
