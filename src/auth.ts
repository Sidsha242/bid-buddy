import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { database } from "./db/database";
import { users, accounts, sessions, verificationTokens } from "./db/schema";
// import { saltAndHashPassword } from "@/utils/password";
// import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(database, {
    usersTable: users as any,
    accountsTable: accounts as any,
    sessionsTable: sessions as any,
    verificationTokensTable: verificationTokens as any,
  }),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials({
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   authorize: async (credentials) => {
    //     let user = null;

    //     // logic to salt and hash password
    //     const pwHash = saltAndHashPassword(credentials.password);

    //     // logic to verify if the user exists
    //     user = await getUserFromDb(credentials.email, pwHash);

    //     if (!user) {
    //       // No user found, so this is their first attempt to login
    //       // meaning this is also the place you could do registration
    //       throw new Error("User not found.");
    //     }

    //     // return user object with their profile data
    //     return user;
    //   },
    // }),
  ],
});
