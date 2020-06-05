import { join } from 'path';
import { Config } from '../../config';
import { Configuration, ProgressPlugin } from 'webpack';
import { Entrypoint } from './entrypoints';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

/**
 * Generates the configuration that webpack will use
 */
export const createDevelopmentConfig = async (config: Config, entry: Entrypoint): Promise<Configuration> => {
    return {
        mode: 'development',
        entry,
        output: {
            path: join(config.workingDirectory, 'dist'),
            filename: '[name]/index.js'
        },
        watch: true,
        plugins: [
            new ProgressPlugin(),
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false
            }),
        ]
    };
}


/**
 * Generates the configuration that webpack will use
 */
export const createProductionConfig = async (config: Config, entry: Entrypoint): Promise<Configuration> => {
    return {
        mode: 'production',
        entry,
        output: {
            path: join(config.workingDirectory, 'dist'),
            filename: '[name]/index.js'
        },
        plugins: [
            new ProgressPlugin(),
            new CleanWebpackPlugin(),
        ]
    };
}

export const createConfig = async(config: Config, entry: Entrypoint, env: string): Promise<Configuration> => {
    if (env === 'development') {
        return createDevelopmentConfig(config, entry);
    } else if (env === 'production') {
        return createProductionConfig(config, entry);
    } else {
       return Promise.reject(`expected ${env} to be one of development or production. Not sure how to handle this environment`)
    }
}