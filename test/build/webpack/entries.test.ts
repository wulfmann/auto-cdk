import { createEntrypoints } from '../../../lib/build/webpack/entrypoints';
import { constructRouteMap } from '../../../lib/routes';
import { Config, Environment } from '../../../lib/config';

describe('build/webpack/entries.ts', () => {
    it('createEntrypoints no includeRoot', async () => {
        const config = new Config({ env: Environment.DEVELOPMENT });
        const routes = await constructRouteMap('./test/mock', config);
        const entries = createEntrypoints(routes, config.rootDirectory, config);
        expect(entries).toEqual({
            "test/mock/api/another/test": "./test/mock/api/another/test.ts",
            "test/mock/api/index": "./test/mock/api/index.ts",
            "test/mock/api/{id}/index": "./test/mock/api/{id}/index.ts",
            "test/mock/api/{id}/settings": "./test/mock/api/{id}/settings.ts"
        });
    });
    it('createEntrypoints includeRoot', async () => {
        const config = new Config({ env: Environment.DEVELOPMENT, includeRoot: true });
        const routes = await constructRouteMap('./test/mock', config);
        const entries = createEntrypoints(routes, config.rootDirectory, config);
        expect(entries).toEqual({
            "test/mock/api/another/test": "./test/mock/api/another/test.ts",
            "test/mock/api/index": "./test/mock/api/index.ts",
            "test/mock/api/{id}/index": "./test/mock/api/{id}/index.ts",
            "test/mock/api/{id}/settings": "./test/mock/api/{id}/settings.ts"
        });
    });
});
