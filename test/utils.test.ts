import { isNotFound } from '../lib/utils';

describe('utils.ts', () => {
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
