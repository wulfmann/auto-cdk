import { constructRouteMap } from '../lib/utils';
import { RouteType } from '../lib/routes';

describe('utils.ts', () => {
    it('constructs s a route map', async () => {
        const res =  constructRouteMap('./test/mock');
        expect(res).toEqual({});
    });
});
