//all env variables usinf zod
import { createEnv } from "@t3-oss/env-nextjs"; //t3o-oss helps us mng env variables
import { z } from "zod"; //schema validation.

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY: z.string().min(1),
    NEXT_PUBLIC_KNOCK_FEED_ID: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY:
      process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY,
    NEXT_PUBLIC_KNOCK_FEED_ID: process.env.NEXT_PUBLIC_KNOCK_FEED_ID,
  },
});
