import * as path from 'path';
import * as webpack from 'webpack';
import { generateEntries } from '../utils';

export default new Promise(async (resolve, reject) => {
    const config: webpack.Configuration = {
        mode: 'production',
        entry: await generateEntries(),
        output: {
            path: path.resolve('__dirname', 'dist'),
            filename: 'foo.bundle.js'
        }
    };

    resolve(config);
});