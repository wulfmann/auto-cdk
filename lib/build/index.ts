import { constructRouteMap } from '../routes';
import { createEntrypoints } from './webpack/entrypoints';
import { createConfig } from './webpack/config';
import { compile } from './webpack/compiler';
import { Config } from '../config';
import { Compiler } from 'webpack';

export async function builder(config: Config): Promise<Compiler> {
    const routes = await constructRouteMap(config.rootDirectory, config);
    const entrypoints = createEntrypoints(routes, config.rootDirectory, config);
    const configs = await createConfig(config, entrypoints, config.env);
    return await compile(configs, config.env);
}
