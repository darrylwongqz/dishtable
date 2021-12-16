import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  //configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // frontend should include - signIn("credentials", {redirect: false, email: enteredEmail, password: enteredPassword})
        // make the axios call to backend express server - we should get back a token from the backend.
        // return user object
        console.log(
          "authorize function executed on next api/auth/[...nextauth]"
        );
        try {
          const response = await axios.post(
            "https://api-dishtable-supa.herokuapp.com/api/auth/login",
            { email: credentials.email, password: credentials.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          //   console.log(response.data);

          return response.data;
        } catch (error) {
          console.log(error.response.data);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: "lbfjbeglasfljanf",
  callbacks: {
    async jwt({ token, user, account, ...rest }) {
      // Initial sign in...
      //first time jwt callback is run, user object is available but no token, so we assign the user to the token
      if (user) {
        token = user;
      }

      //   console.log("jwt token", token);
      //   console.log("jwt user", user);
      //   console.log("jwt account", account);
      //   console.log("jwt rest", rest);
      return token;
    },
    async session({ session, token, user, ...rest }) {
      //if there is a token, assign it to the session
      if (token) {
        session = token;
      }
      //   console.log("session session", session);
      //   console.log("session token", token);
      //   console.log("session user", user);
      //   console.log("session rest", rest);

      return session;
    },
  },
});
