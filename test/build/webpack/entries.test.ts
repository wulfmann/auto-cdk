import { generateWebackEntries } from '../../../lib/build/webpack/entries';
import { constructRouteMap } from '../../../lib/routes';

describe('build/webpack/entries.ts', () => {
    it('generateWebackEntries', async () => {
        const routes = await constructRouteMap('./test/mock');
        const entries = generateWebackEntries(routes);
        expect(entries).toEqual([
            'test/mock/{id}/settings.ts',
            'test/mock/{id}/index.ts',
            'test/mock/index.ts',
            'test/mock/another/test.ts',
        ]);
    });
});
