import { basename } from 'path';
import { AutoCdk } from '../lib';
import { builder } from '../lib/build';
import { Environment } from '../lib/config';
import { compilerHandler } from '../lib/build/webpack/compiler';

export const build = async (args: any): Promise<void> => {
    try {
        const appName = basename(process.cwd());
        const app = new AutoCdk(appName, Environment.PRODUCTION);
        const compiler = await builder(app.config);
        compiler.run(compilerHandler);
        await app.constructResources();
        app.synth();
    } catch (e) {
        console.error(e);
        return Promise.reject();
    }
};
