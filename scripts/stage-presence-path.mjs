import { mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const presenceDir = join(dist, 'presence');

mkdirSync(presenceDir, { recursive: true });

for (const entry of readdirSync(dist)) {
  if (entry === 'presence') continue;
  renameSync(join(dist, entry), join(presenceDir, entry));
}
