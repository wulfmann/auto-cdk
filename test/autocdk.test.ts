import { AutoCdk } from '../lib/autocdk';
import { ResourceType } from '../lib/resources';
import { RouteType } from '../lib/routes';

describe('autocdk.ts', () => {
    it('constructRoutes', async () => {
        const app = new AutoCdk('MyApp', { root: 'test/mock' });
        const res = await app.constructRoutes();
        expect(res).toEqual({
            name: 'mock',
            type: RouteType.DIRECTORY,
            path: 'test/mock',
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
    it('constructResources', async () => {
        const app = new AutoCdk('MyApp', { root: 'test/mock' });
        const res = await app.constructResources();
        const expectedResources = {
            name: 'mock',
            path: 'test/mock',
            type: ResourceType.RESOURCE,
            children: {
                '{id}': {
                    name: '{id}',
                    path: 'test/mock/{id}',
                    type: ResourceType.RESOURCE,
                    children: {
                        'index.ts': {
                            name: 'index.ts',
                            path: 'test/mock/{id}/index.ts',
                            type: ResourceType.METHOD,
                        },
                        'settings.ts': {
                            name: 'settings.ts',
                            path: 'test/mock/{id}/settings.ts',
                            type: ResourceType.METHOD,
                        }
                    }
                },
                'index.ts': {
                    name: 'index.ts',
                    path: 'test/mock/index.ts',
                    type: ResourceType.METHOD,
                },
                another: {
                    name: 'another',
                    path: 'test/mock/another',
                    type: ResourceType.RESOURCE,
                    children: {
                        'test.ts': {
                            name: 'test.ts',
                            path: 'test/mock/another/test.ts',
                            type: ResourceType.METHOD,
                        }
                    }
                }
            }
        };
        expect(res).toEqual(expectedResources);
    })
});
