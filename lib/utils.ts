import * as fs from 'fs';

import { ResourceMap } from './generator';

export const constructResourceMap = async (path: string): ResourceMap {
  for await (const p of walk('/tmp/'))
    console.log(p)
};

async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* await walk(entry);
        else if (d.isFile()) yield entry;
    }
}

export const generateEntries = async () => {
  return
}