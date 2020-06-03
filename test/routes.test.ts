import { generateRouteMap, RouteType } from '../lib/routes';

describe('routes.ts', () => {
    it('generates a route map', async () => {
        const res =  generateRouteMap('./test/mock');
        console.log(res)
        expect(res).toEqual({
            another: {
                type: RouteType.DIRECTORY
            },
            'index.ts': {
                type: RouteType.FILE
            },
            '{id}': {
                type: RouteType.DIRECTORY
            }
        });
    });
});