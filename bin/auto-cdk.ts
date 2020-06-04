#!/usr/bin/env node

import { AutoCdk } from '../lib';

(async () => {
    try {
        const app = new AutoCdk('MyApp');
        await app.constructApi();
        app.synth();
    } catch (e) {
        console.error(e);
    }
})();
