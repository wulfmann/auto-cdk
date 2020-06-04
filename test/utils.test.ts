import { generateWebackEntries, isNotFound } from '../lib/utils';
import { constructRouteMap } from '../lib/routes';

describe('utils.ts', () => {
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
    it('isNotFound returns true', () => {
        const testError = {
            code : 'ENOENT'
        };
        expect(isNotFound(testError)).toBeTruthy();
    });
    it('isNotFound returns false', () => {
        const testError = {
            code : 'NOTENOENT'
        };
        expect(isNotFound(testError)).toBeFalsy();
    })
});
