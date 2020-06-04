#!/usr/bin/env node

import { AutoCdk } from '../lib';

const app = AutoCdk();

const routes = app.constructRoutes();
app.constructApi(routes);
