import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema1 from '../models/location';
import * as schema2 from '../models/shift';
import * as schema3 from '../models/user';
import * as schema4 from '../models/geofence'
import * as schema5 from '../models/security-audit';

// connect to db
export const dbConnection = drizzle(process.env.DATABASE_URL!, {logger: false, schema: {...schema1, ...schema2, ...schema3, ...schema4, ...schema5}});

