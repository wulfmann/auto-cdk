import { promises as fs } from 'fs';
import { basename, join } from 'path';
import { RouteType, RouteMap, Route } from './routes';

export async function directoryTree(dir: string): Promise<Route> {
  const root = basename(dir);
  const item: Route =  {
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

export const constructRouteMap = async (dir: string): Promise<RouteMap> => {
  const root = basename(dir);
  return {
    [root]: await directoryTree(dir)
  }
}

// export const generateWebackEntries = (routes: RouteMap): string[] => {
//   return Object.values(routes).map(route => {
//     if (route.children) {
//       return generateWebpackEntries(route);
//     } else {
//       return route.path;
//     }
//   });
// };