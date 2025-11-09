import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '../../data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { jobs: [], dlq: [], config: { maxRetries: 3, backoffBase: 2 } });

await db.read();

export default db;