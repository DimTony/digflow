// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

export interface ClientProps {
  children: React.ReactNode;
}

// Extend next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      token?: string;
      roles: UserRoles[];
    } & DefaultSession["user"];
  }

  // Define User in next-auth module to match our User interface
  interface User {
    id: string;
    name: string;
    username: string;
    token?: string;
    roles: UserRoles[];
  }
}

// Important: Let NextAuth manage the JWT structure
declare module "next-auth/jwt" {
  interface JWT {
    // Add our user properties to the JWT
    id?: string;
    username?: string;
    token?: string;
    roles?: UserRoles[];
    // Don't nest under 'user' property - this causes issues
  }
}

export enum UserRoles {
  admin = "Admin",
  teamManager = "Team Manager",
  teamMember = "Team Member",
}


export interface User {
  id: string;
  name: string;
  username: string;
  token?: string;
  roles: UserRoles[];
}
