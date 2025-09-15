import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema"; // adjust the path

export const db = drizzle(process.env.DATABASE_URL!, { schema });
