import { betterAuth } from "better-auth";
import { createClient } from "@supabase/supabase-js";

// Better Auth configured with Supabase
export const auth = betterAuth({
    database: {
        provider: "postgres", // Supabase is Postgres
        url: process.env.DATABASE_URL || "", // Needs to be set in .env
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "placeholder",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "placeholder",
        },
    },
});
