import { basename } from 'path';
import { AutoCdk } from '../lib';
import { builder } from '../lib/build';
import { Environment } from '../lib/config';

export const build = async (args: any): Promise<void> => {
    try {
        const appName = basename(process.cwd());
        const app = new AutoCdk(appName, Environment.PRODUCTION);
        await builder(app.config);
        await app.constructResources();
        app.synth();
    } catch (e) {
        console.error(e);
        return Promise.reject();
    }
};
