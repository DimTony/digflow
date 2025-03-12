// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useStore } from "@/store/store";
// import { showWarning, showInfo } from "@/utils/toast";

// // List of unprotected routes
// const publicRoutes = ["/", "/login"];

// export default function ProtectedRouteProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { data: session, status } = useSession();
//   const { loadSession, auth } = useStore();
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [previousAuthState, setPreviousAuthState] = useState<string | null>(null);
//   const isPublicRoute = publicRoutes.includes(pathname);

//   console.log("[PROTECTED_ROUTE] Rendering with pathname:", pathname);
//   console.log("[PROTECTED_ROUTE] Session status:", status);
//   console.log("[PROTECTED_ROUTE] Is public route:", isPublicRoute);
  
//   // Track auth state changes for notifications
//   useEffect(() => {
//     const currentAuthState = status;
    
//     // Only process when we have a definite state
//     if (currentAuthState !== "loading") {
//       // If previous state exists and changed from unauthenticated to authenticated
//       if (previousAuthState === "unauthenticated" && currentAuthState === "authenticated") {
//         // Don't show this on initial load
//         if (previousAuthState !== null) {
//           showInfo("You have been authenticated");
//         }
//       }
      
//       // If state changed from authenticated to unauthenticated (logout or session expiry)
//       if (previousAuthState === "authenticated" && currentAuthState === "unauthenticated") {
//         showWarning("Your session has ended", {
//           description: "Please log in again to continue.",
//           // Sonner provides action buttons directly
//           action: {
//             label: "Login",
//             onClick: () => router.replace("/login")
//           }
//         });
//       }
      
//       // Update previous state
//       setPreviousAuthState(currentAuthState);
//     }
//   }, [status, previousAuthState, router]);

//   // Sync NextAuth session with our store
//   useEffect(() => {
//     console.log("[PROTECTED_ROUTE] Loading session from store");
//     loadSession().then(() => {
//       console.log("[PROTECTED_ROUTE] Session loaded from store");
//     });
//   }, [loadSession]);

//   // Handle initial loading state
//   useEffect(() => {
//     // If we're still checking authentication, maintain loading state
//     if (status === "loading") {
//       return;
//     }

//     // Set loading to false after a short delay to prevent flashes
//     const timer = setTimeout(() => {
//       setIsInitialLoading(false);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [status]);

//   // Handle authentication redirects
//   useEffect(() => {
//     // If still in initial loading state, don't redirect yet
//     if (isInitialLoading || status === "loading") {
//       console.log("[PROTECTED_ROUTE] Still loading, no redirect yet");
//       return;
//     }

//     console.log("[PROTECTED_ROUTE] Route protection check:", {
//       pathname,
//       isPublicRoute,
//       status,
//       storeAuthenticated: auth.isAuthenticated,
//     });

//     // CASE 1: Unauthenticated user trying to access protected route
//     if (!isPublicRoute && status === "unauthenticated") {
//       const loginUrl = `/login?returnUrl=${encodeURIComponent(pathname)}`;
//       console.log(
//         "[PROTECTED_ROUTE] Unauthenticated on protected route, redirecting to:",
//         loginUrl
//       );
//       // Sonner allows more complex toast content
//       showWarning("Authentication Required", {
//         description: "Please log in to access this page",
//         duration: 5000
//       });
//       router.replace(loginUrl); // Use replace to prevent back button issues
//     } 
//     // CASE 2: Authenticated user trying to access login page
//     else if (isPublicRoute && status === "authenticated" && pathname === "/login") {
//       console.log(
//         "[PROTECTED_ROUTE] Authenticated on login page, redirecting to dashboard"
//       );
//       router.replace("/dashboard"); // Use replace for cleaner navigation history
//     } 
//     // CASE 3: All other cases - no redirect needed
//     else {
//       console.log("[PROTECTED_ROUTE] No redirect needed");
//     }
//   }, [pathname, router, status, auth.isAuthenticated, isPublicRoute, isInitialLoading]);

//   // Show loading state while checking authentication
//   // This prevents any content flash, including login page for authenticated users
//   if ((isInitialLoading || status === "loading") && 
//       // Don't show loading on public routes that aren't login
//       (pathname === "/login" || !isPublicRoute)) {
//     console.log("[PROTECTED_ROUTE] Showing loading screen");
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   console.log("[PROTECTED_ROUTE] Rendering children");
//   return <>{children}</>;
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStore } from "@/store/store";
import { showWarning, showInfo } from "@/utils/toast";

// List of unprotected routes
const publicRoutes = ["/", "/login"];

export default function ProtectedRouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { loadSession, auth } = useStore();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [previousAuthState, setPreviousAuthState] = useState<string | null>(
    null
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  console.log("[PROTECTED_ROUTE] Rendering with pathname:", pathname);
  console.log("[PROTECTED_ROUTE] Session status:", status);
  console.log("[PROTECTED_ROUTE] Is public route:", isPublicRoute);

  // Track auth state changes for notifications
  useEffect(() => {
    const currentAuthState = status;

    // Only process when we have a definite state
    if (currentAuthState !== "loading") {
      // If previous state exists and changed from unauthenticated to authenticated
      if (
        previousAuthState === "unauthenticated" &&
        currentAuthState === "authenticated"
      ) {
        // Don't show this on initial load
        if (previousAuthState !== null) {
          showInfo("You have been authenticated");
        }
      }

      // If state changed from authenticated to unauthenticated (logout or session expiry)
      if (
        previousAuthState === "authenticated" &&
        currentAuthState === "unauthenticated"
      ) {
        showWarning("Your session has ended", {
          description: "Please log in again to continue.",
          // Sonner provides action buttons directly
          action: {
            label: "Login",
            onClick: () => router.replace("/login"),
          },
        });
      }

      // Update previous state
      setPreviousAuthState(currentAuthState);
    }
  }, [status, previousAuthState, router]);

  // Sync NextAuth session with our store
  useEffect(() => {
    console.log("[PROTECTED_ROUTE] Loading session from store");
    loadSession().then(() => {
      console.log("[PROTECTED_ROUTE] Session loaded from store");
    });
  }, [loadSession]);

  // Handle initial loading state
  useEffect(() => {
    // If we're still checking authentication, maintain loading state
    if (status === "loading") {
      return;
    }

    // Set loading to false after a short delay to prevent flashes
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [status]);

  // Handle authentication redirects
  useEffect(() => {
    // If still in initial loading state, don't redirect yet
    if (isInitialLoading || status === "loading") {
      console.log("[PROTECTED_ROUTE] Still loading, no redirect yet");
      return;
    }

    console.log("[PROTECTED_ROUTE] Route protection check:", {
      pathname,
      isPublicRoute,
      status,
      storeAuthenticated: auth.isAuthenticated,
    });

    // CASE 1: Unauthenticated user trying to access protected route
    if (!isPublicRoute && status === "unauthenticated") {
      const loginUrl = `/login?returnUrl=${encodeURIComponent(pathname)}`;
      console.log(
        "[PROTECTED_ROUTE] Unauthenticated on protected route, redirecting to:",
        loginUrl
      );
      // Sonner allows more complex toast content
      showWarning("Authentication Required", {
        description: "Please log in to access this page",
        duration: 5000,
      });
      router.replace(loginUrl); // Use replace to prevent back button issues
    }
    // CASE 2: Authenticated user trying to access login page
    else if (
      isPublicRoute &&
      status === "authenticated" &&
      pathname === "/login"
    ) {
      console.log(
        "[PROTECTED_ROUTE] Authenticated on login page, redirecting to dashboard"
      );
      router.replace("/dashboard"); // Use replace for cleaner navigation history
    }
    // CASE 3: All other cases - no redirect needed
    else {
      console.log("[PROTECTED_ROUTE] No redirect needed");
    }
  }, [
    pathname,
    router,
    status,
    auth.isAuthenticated,
    isPublicRoute,
    isInitialLoading,
  ]);

  console.log("[ROTECTED_ROUTE] Rendering children");
  // Always render children directly - no more loading screen here
  return <>{children}</>;
}