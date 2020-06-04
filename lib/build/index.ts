import { constructRouteMap } from '../routes';
import { createEntrypoints, createWebpackConfig, compile } from './webpack';
import { Config } from '../config';

export async function build(dir: string, config: Config) {
    const routes = await constructRouteMap(dir);
    const entrypoints = createEntrypoints(routes);
    console.log(entrypoints)
    const configs = await createWebpackConfig(dir, config, entrypoints);
    const result = await compile(configs);
    console.log(result);
}
