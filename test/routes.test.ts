import { RouteType, constructRouteMap } from '../lib/routes';

describe('routes.ts', () => {
    it('constructRouteMap', async () => {
        const res = await constructRouteMap('./test/mock');
        expect(res).toEqual({
            name: 'mock',
            type: RouteType.DIRECTORY,
            path: './test/mock',
            children: {
                '{id}': {
                    name: '{id}',
                    type: RouteType.DIRECTORY,
                    path: 'test/mock/{id}',
                    children: {
                        'index.ts': {
                            name: 'index.ts',
                            path: 'test/mock/{id}/index.ts',
                            type: RouteType.FILE
                        },
                        'settings.ts': {
                            name: 'settings.ts',
                            path: 'test/mock/{id}/settings.ts',
                            type: RouteType.FILE
                        }
                    }
                },
                another: {
                    name: 'another',
                    path: 'test/mock/another',
                    type: RouteType.DIRECTORY,
                    children: {
                        'test.ts': {
                            name: 'test.ts',
                            path: 'test/mock/another/test.ts',
                            type: RouteType.FILE
                        }
                    }
                },
                'index.ts': {
                    name: 'index.ts',
                    path: 'test/mock/index.ts',
                    type: RouteType.FILE
                }
            }
        });
    });
});
