import { RouteMap } from '../../routes';

export const generateWebackEntries = (route: RouteMap): string[] => {
    const result: string[] = [];
    if (route.children) {
        const children: string[] = [];
        for (const key in route.children) {
            children.push(...generateWebackEntries(route.children[key]));
        }
        result.push(...children);
    } else {
        result.push(route.path)
    }
    return result;
};
