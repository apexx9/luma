import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './schema';

export const DrizzleProvider = {
  provide: 'DRIZZLE',
  useFactory: async () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 1,
    });

    return drizzle(pool, {
      schema,
    });
  },
};
