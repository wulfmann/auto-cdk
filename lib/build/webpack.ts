import { join } from 'path';
import { IRouteMap } from '../routes';
import { Config } from '../config';
import * as webpack from 'webpack'

export type CompilerResult = {
    errors: string[]
    warnings: string[]
}

export interface Entrypoint {
    [key: string]: string;
}

// export const generateWebackEntries = (route: IRouteMap): Entry => {
//     const result: Entry = {};
//     // if (route.children) {
//     //     const children: Entry = {};
//     //     for (const key in route.children) {
//     //         const current = route.children[key];
//     //         children[current.name] = generateWebackEntries(current)
//     //         children.push(...generateWebackEntries(route.children[key]));
//     //     }
//     // } else {
//     //     result[route.name] = route.path;
//     // }
//     return result;
// };

export const createEntrypoints = (routeMap: IRouteMap): Entrypoint => {
    let result: Entrypoint = {};
    if (routeMap.children) {
        for (const key in routeMap.children) {
            const current = routeMap.children[key];
            result[current.path] = createEntrypoints(routeMap.children[key]).toString();
        }
    } else {
        result[routeMap.path] = routeMap.path;
    }
    return result
}

export const createWebpackConfig = async (dir: string, config: Config, entry: Entrypoint): Promise<webpack.Configuration> => {
    console.log(entry)
    return {
        mode: 'production',
        entry,
        output: {
            path: join(config.root, 'dist'),
            filename: 'bundle.js'
        }
    };
}

function generateStats(result: CompilerResult, stat: webpack.Stats): CompilerResult {
    const { errors, warnings } = stat.toJson('errors-warnings')
    if (errors.length > 0) {
        result.errors.push(...errors)
    }

    if (warnings.length > 0) {
        result.warnings.push(...warnings)
    }

    return result
}

export const compile = (config: webpack.Configuration): Promise<CompilerResult> => {
    return new Promise(async (resolve, reject) => {
        const compiler = webpack(config);
        compiler.run(
            (err: Error, statsOrMultiStats: { stats: webpack.Stats[] } | webpack.Stats) => {
                if (err) {
                    const reason = err?.toString()
                    if (reason) {
                        return resolve({ errors: [reason], warnings: [] })
                    }
                    return reject(err)
                }

                if ('stats' in statsOrMultiStats) {
                    const result: CompilerResult = statsOrMultiStats.stats.reduce(
                        generateStats,
                        { errors: [], warnings: [] }
                    )
                    return resolve(result)
                }

                const result = generateStats(
                    { errors: [], warnings: [] },
                    statsOrMultiStats
                )
                return resolve(result)
            }
        );
    })
}