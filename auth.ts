import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./src/sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./src/sanity/lib/queries";
import { writeClient } from "./src/sanity/lib/write-client";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    signIn: async ({
      user: {name, email, image},
      profile: {id, login, bio, age}
    }) => {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || '',
          age: age || 0,
        })
      }

      return true;
    },
    jwt: async ({ token, account, profile}) => {
      if (account || profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        token.id = user?._id;
      }

      return token;
    },
    session: async ({session, token}) => {
      Object.assign(session, {id: token.id});
      return session;
    }
  }
})