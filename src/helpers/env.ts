import { z, TypeOf } from "zod";
import "dotenv/config";

const env = z.object({
  CONNECTION_URL: z.string(),
  PROGRAM_ID: z.string(),
  TEAM_WALLET: z.string(),
  AUTHORITY_SECRET_KEY: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends TypeOf<typeof env> {}
  }
}

const parsed = env.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "invalid environment variables",
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}
