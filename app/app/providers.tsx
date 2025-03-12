// "use client";

// import { SessionProvider } from "next-auth/react";
// import ProtectedRouteProvider from "./protected";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <ProtectedRouteProvider>{children}</ProtectedRouteProvider>
//     </SessionProvider>
//   );
// }


"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import ProtectedRouteProvider from "./protected";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* Add the Sonner Toaster component */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 4000,
          // You can add classNames here for styling customization
          className: "my-toast",
        }}
        // Optional themes: "light", "dark", "system"
        theme="system"
        // Various visual options
        closeButton
        richColors
        expand={false}
      />
      <ProtectedRouteProvider>{children}</ProtectedRouteProvider>
    </SessionProvider>
  );
}