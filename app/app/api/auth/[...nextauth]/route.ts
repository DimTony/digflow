import { UserRoles } from "@/lib/types";
import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "../../_services/auth.service";

// NextAuth Configuration with improved logging

// NextAuth API Route Handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
