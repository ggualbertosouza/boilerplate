import fs from 'node:fs';
import path from 'node:path';
import { NODE_ENV } from '../config';

export async function loadModules(folderPath: string) {
  const files = await fs.readdirSync(path.resolve(folderPath));

  const modules: any[] = [];

  for (const file of files) {
    const fileExtension = NODE_ENV === 'development' ? '.ts' : '.js';

    if (!file.endsWith(fileExtension)) continue;

    const fullPath = path.resolve(path.join(folderPath, file));

    const module = await import(fullPath);
    modules.push(module.default || module);
  }

  return modules;
}
