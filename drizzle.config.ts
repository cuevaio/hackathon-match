import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV', NODE_ENV);

const isDevelopmentEnv = NODE_ENV === 'development';
console.log('isDevelopmentEnv', isDevelopmentEnv);

const envFilePath = isDevelopmentEnv ? '.env.development' : '.env';
console.log('Loading environment file:', envFilePath);

// Add override: true to force use of development variables
dotenv.config({
  path: envFilePath,
  override: true, // This will override existing env vars
});

const DATABASE_URL = process.env.DATABASE_URL;
console.log('Loaded DATABASE_URL:', DATABASE_URL);

if (!DATABASE_URL) {
  throw new Error(
    'Cannot read environment, probably DATABASE_URL was not set',
  );
}

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});