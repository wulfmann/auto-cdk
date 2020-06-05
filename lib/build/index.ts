import { constructRouteMap } from '../routes';
import { createEntrypoints } from './webpack/entrypoints';
import { createConfig } from './webpack/config';
import { compile } from './webpack/compiler';
import { Config } from '../config';

export async function builder(config: Config) {
    const routes = await constructRouteMap(config.rootDirectory, config);
    const entrypoints = createEntrypoints(routes, config.rootDirectory, config);
    const configs = await createConfig(config, entrypoints, config.env);
    await compile(configs, config.env);
}
