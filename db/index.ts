import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Configuración actualizada para versiones recientes
const client = postgres(connectionString, {
  prepare: false,
  max: 1, // Para serverless environments
});

export const db = drizzle({ client, schema });
