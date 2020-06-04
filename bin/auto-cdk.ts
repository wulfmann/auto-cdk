#!/usr/bin/env node

import { AutoCdk } from '../lib';
import { build } from '../lib/build';

(async () => {
    try {
        const app = new AutoCdk('MyApp');
        await build(app.config.root, app.config);
    } catch (e) {
        console.error(e);
    }
})();
