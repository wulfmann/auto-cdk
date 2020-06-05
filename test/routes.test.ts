import { RouteType, constructRouteMap } from '../lib/routes';
import { Config, Environment } from '../lib/config';

describe('routes.ts', () => {
    it('constructRouteMap', async () => {
        const config = new Config({ env: Environment.DEVELOPMENT });
        const res = await constructRouteMap('test/mock', config);
        expect(res).toEqual({
            name: 'mock',
            type: RouteType.DIRECTORY,
            path: 'test/mock',
            relativePath: './test/mock',
            children: {
                api: {
                    type: RouteType.DIRECTORY,
                    name: 'api',
                    path: 'test/mock/api',
                    relativePath: './test/mock/api',
                    children: {
                        '{id}': {
                            name: '{id}',
                            type: RouteType.DIRECTORY,
                            path: 'test/mock/api/{id}',
                            relativePath: './test/mock/api/{id}',
                            children: {
                                'index.ts': {
                                    name: 'index.ts',
                                    path: 'test/mock/api/{id}/index.ts',
                                    relativePath:
                                        './test/mock/api/{id}/index.ts',
                                    type: RouteType.FILE,
                                },
                                'settings.ts': {
                                    name: 'settings.ts',
                                    path: 'test/mock/api/{id}/settings.ts',
                                    relativePath:
                                        './test/mock/api/{id}/settings.ts',
                                    type: RouteType.FILE,
                                },
                            },
                        },
                        another: {
                            name: 'another',
                            path: 'test/mock/api/another',
                            relativePath: './test/mock/api/another',
                            type: RouteType.DIRECTORY,
                            children: {
                                'test.ts': {
                                    name: 'test.ts',
                                    path: 'test/mock/api/another/test.ts',
                                    relativePath:
                                        './test/mock/api/another/test.ts',
                                    type: RouteType.FILE,
                                },
                            },
                        },
                        'index.ts': {
                            name: 'index.ts',
                            path: 'test/mock/api/index.ts',
                            relativePath: './test/mock/api/index.ts',
                            type: RouteType.FILE,
                        },
                    },
                },
            },
        });
    });
});
