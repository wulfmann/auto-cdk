import { createEntrypoints } from '../../../lib/build/webpack';
import { constructRouteMap } from '../../../lib/routes';

describe('build/webpack/entries.ts', () => {
    it('createEntrypoints', async () => {
        const routes = await constructRouteMap('./test/mock');
        const entries = createEntrypoints(routes);
        expect(entries).toEqual([
            'test/mock/{id}/settings.ts',
            'test/mock/{id}/index.ts',
            'test/mock/index.ts',
            'test/mock/another/test.ts',
        ]);
    });
});
