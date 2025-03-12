import { UserRoles } from "@/lib/types";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const MockAuthProvider = CredentialsProvider({
  id: "mock",
  name: "Mock Auth",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      throw new Error("Missing username or password");
    }

    console.log(
      "🔐 Mock auth provider called with username:",
      credentials.username
    );

    const mockUsers = [
      {
        id: "1",
        name: "Toluwani Akano",
        username: "toluwani",
        roles: [UserRoles.admin],
      },
      {
        id: "2",
        name: "Leslie Chukwunweike",
        username: "leslie",
        roles: [UserRoles.teamManager],
      },
      {
        id: "3",
        name: "Dim Obinna",
        username: "obinna",
        roles: [UserRoles.teamMember],
      },
    ];

    const user = mockUsers.find((u) => u.username === credentials.username);

    if (!user) {
      console.log("❌ No matching user found");
      throw new Error("Invalid credentials");
    }

    console.log("✅ User found:", user.username);
    return user;
  },
});

export const authOptions: AuthOptions = {
  providers: [MockAuthProvider],
  callbacks: {
    async session({ session, token }) {
      console.log("🔄 Session callback", {
        hasToken: !!token,
        hasUser: !!session?.user,
      });

      // Map JWT properties to session
      if (session.user) {
        session.user.id = token.id || "";
        session.user.username = token.username || "";
        session.user.token = token.token as string;
        session.user.roles = token.roles as UserRoles[];

        console.log("✅ Session updated with user data");
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log("🔑 JWT callback", {
        hasExistingToken: !!token,
        isNewUser: !!user,
      });

      // Update token with user info on first sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.token = user.token;
        token.roles = user.roles;

        console.log("✅ JWT updated with new user", user.username);
      }
      return token;
    },
  },
  // Make secret explicitly defined and strong
  secret:
    process.env.NEXTAUTH_SECRET || "a-very-strong-secret-for-development-only",
  session: {
    strategy: "jwt",
    // Set max age to 30 days for persistent sessions
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
