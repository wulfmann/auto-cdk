#!/usr/bin/env node

import { AutoCdk } from '../lib';

(async () => {
    try {
        const app = new AutoCdk('MyApp');
        const resources = await app.constructResources();
        app.synth();
    } catch (e) {
        console.error(e);
    }
})();
