// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Menu,
//   X,
//   Home,
//   User,
//   Settings,
//   HelpCircle,
//   LogOut,
//   Users,
//   BarChart,
//   FileText,
//   Bell,
//   Search,
//   ChevronUp,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Shield,
//   Database,
//   Activity,
//   Layers,
//   FolderGit2,
//   Box,
// } from "lucide-react";
// import { showInfo } from "@/utils/toast";
// import { signOut } from "next-auth/react";
// import Image from "next/image";
// import { Avatar } from "@/components/ui/avatar";
// import { UserRoles } from "@/app/api/auth/[...nextauth]/route";

// // Type for sidebar menu items with role restrictions
// interface MenuItem {
//   title: string;
//   path?: string;
//   icon: React.ReactNode;
//   submenu?: MenuItem[];
//   allowedRoles?: UserRoles[]; // Roles that can see this item
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [expanded, setExpanded] = useState(true);
//   const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const pathname = usePathname();
//   const { data: session } = useSession();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const userRoles = (session?.user?.roles as UserRoles[]) || [];

//   // Check if we're on mobile on initial render and window resize
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setExpanded(false);
//       }
//     };

//     // Check on mount
//     checkIfMobile();

//     // Check on resize
//     window.addEventListener("resize", checkIfMobile);

//     return () => {
//       window.removeEventListener("resize", checkIfMobile);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Helper function to check if user has access to a menu item
//   const hasAccess = (item: MenuItem): boolean => {
//     // If no specific roles are defined, everyone can see it
//     if (!item.allowedRoles || item.allowedRoles.length === 0) {
//       return true;
//     }

//     // Check if user has any of the required roles
//     return item.allowedRoles.some((role) => userRoles.includes(role));
//   };

//   // Define sidebar menu items with role restrictions
//   const menuItems: MenuItem[] = [
//     {
//       title: "Dashboard",
//       path: "/dashboard",
//       icon: <Home size={20} />,
//       // No allowedRoles - accessible to everyone
//     },
//     {
//       title: "Workspaces",
//       path: "/dashboard/workspaces",
//       icon: <FolderGit2 size={20} />,
//       submenu: [
//         {
//           title: "Projects",
//           path: "/dashboard/workspaces/projects",
//           icon: <Box size={20} />,
//           // allowedRoles: [UserRoles.admin],
//         },
//         {
//           title: "Teams",
//           path: "/dashboard/workspaces/teams",
//           icon: <Users size={20} />,
          
//           // allowedRoles: [UserRoles.admin, UserRoles.teamManager],
//         },
//       ],
//     },
//     {
//       title: "User Management",
//       icon: <Users size={20} />,
//       allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Only admin and managers
//       submenu: [
//         {
//           title: "All Users",
//           path: "/dashboard/users",
//           icon: <User size={20} />,
//           allowedRoles: [UserRoles.admin], // Admin only
//         },
//         {
//           title: "Teams",
//           path: "/dashboard/teams",
//           icon: <Users size={20} />,
//           allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Admin and managers
//         },
//       ],
//     },
//     {
//       title: "Reports",
//       icon: <BarChart size={20} />,
//       submenu: [
//         {
//           title: "Analytics",
//           path: "/dashboard/analytics",
//           icon: <BarChart size={20} />,
//           allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Admin and managers
//         },
//         {
//           title: "Documents",
//           path: "/dashboard/documents",
//           icon: <FileText size={20} />,
//           // No allowedRoles - accessible to everyone
//         },
//       ],
//     },
//     {
//       title: "Admin Panel",
//       icon: <Shield size={20} />,
//       allowedRoles: [UserRoles.admin], // Admin only
//       submenu: [
//         {
//           title: "System Settings",
//           path: "/dashboard/admin/settings",
//           icon: <Database size={20} />,
//           allowedRoles: [UserRoles.admin], // Admin only
//         },
//         {
//           title: "Activity Logs",
//           path: "/dashboard/admin/logs",
//           icon: <Activity size={20} />,
//           allowedRoles: [UserRoles.admin], // Admin only
//         },
//         {
//           title: "Permissions",
//           path: "/dashboard/admin/permissions",
//           icon: <Layers size={20} />,
//           allowedRoles: [UserRoles.admin], // Admin only
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       icon: <Settings size={20} />,
//       submenu: [
//         {
//           title: "Profile Settings",
//           path: "/dashboard/settings/profile",
//           icon: <User size={20} />,
//           // No allowedRoles - accessible to everyone
//         },
//         {
//           title: "Account Settings",
//           path: "/dashboard/settings/account",
//           icon: <Settings size={20} />,
//           // No allowedRoles - accessible to everyone
//         },
//       ],
//     },
//     {
//       title: "Help & Support",
//       path: "/dashboard/help",
//       icon: <HelpCircle size={20} />,
//       // No allowedRoles - accessible to everyone
//     },
//   ];

//   const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

//   // Toggle submenu open/closed
//   const toggleSubmenu = (title: string) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   // Check if path is active
//   const isActive = (path: string) => {
//     return pathname === path;
//   };

//   // Check if parent is active (any child is active)
//   const isParentActive = (submenu?: MenuItem[]) => {
//     if (!submenu) return false;
//     return submenu.some((item) => item.path && pathname === item.path);
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       await signOut({ redirect: false });
//       showInfo("You have been logged out");
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   // Render menu items recursively with role-based filtering
//   const renderMenuItems = (items: MenuItem[]) => {
//     return items
//       .filter((item) => hasAccess(item))
//       .map((item) => {
//         // If item has submenu, filter the submenu items by role too
//         const accessibleSubmenu = item.submenu
//           ? item.submenu.filter((subItem) => hasAccess(subItem))
//           : undefined;

//         // Skip rendering this item if it has a submenu but all submenu items are filtered out
//         if (
//           item.submenu &&
//           accessibleSubmenu &&
//           accessibleSubmenu.length === 0
//         ) {
//           return null;
//         }

//         return (
//           <div key={item.title} className="mb-1">
//             {accessibleSubmenu ? (
//               // Parent menu with dropdown
//               <div>
//                 <div
//                   onClick={() => toggleSubmenu(item.title)}
//                   className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
//                     isParentActive(accessibleSubmenu)
//                       ? "bg-primary/10 text-primary"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <span className="mr-2">{item.icon}</span>
//                     {expanded && <span>{item.title}</span>}
//                   </div>
//                   {expanded && (
//                     <span>
//                       {openMenus[item.title] ? (
//                         <ChevronDown size={16} />
//                       ) : (
//                         <ChevronRight size={16} />
//                       )}
//                     </span>
//                   )}
//                 </div>

//                 {/* Submenu items */}
//                 {openMenus[item.title] && expanded && (
//                   <div className="pl-8 mt-1 space-y-1">
//                     {accessibleSubmenu.map((subItem) => (
//                       <Link
//                         key={subItem.title}
//                         href={subItem.path || "#"}
//                         className={`flex items-center p-2 rounded-md ${
//                           isActive(subItem.path || "")
//                             ? "bg-primary/10 text-primary"
//                             : "hover:bg-gray-100"
//                         }`}
//                       >
//                         <span className="mr-2">{subItem.icon}</span>
//                         <span>{subItem.title}</span>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // Simple menu item with no children
//               <Link
//                 href={item.path || "#"}
//                 className={`flex items-center p-2 rounded-md ${
//                   isActive(item.path || "")
//                     ? "bg-primary/10 text-primary"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {expanded && <span>{item.title}</span>}
//               </Link>
//             )}
//           </div>
//         );
//       });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header - Fixed at top */}
//       <header className="bg-white shadow-sm z-30 sticky top-0">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               {/* Logo/Brand */}
//               <div className="flex gap-2 flex-shrink-0">
//                 <Image
//                   src="/icons/logo.svg"
//                   alt="Logo"
//                   width={20}
//                   height={20}
//                   className="sidebar-icon"
//                 />
//                 <span className="text-[24px] font-bold text-inter">
//                   DIGFlow
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
//                 <span className="sr-only">View notifications</span>
//                 <Bell size={20} />
//                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
//               </button>

//               <div ref={dropdownRef} className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="flex gap-1 hover:bg-[#F4F4F4] shadow-md px-[16px] py-[8px] rounded-[12px] items-center"
//                 >
//                   <Image
//                     src="/avatars/avatar1.svg"
//                     alt="avatar"
//                     width={30}
//                     height={30}
//                     className=""
//                   />
//                   <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
//                     {session?.user?.name || "User"}
//                     {userRoles.length > 0 && (
//                       <span className="ml-1 text-xs text-gray-500">
//                         ({userRoles[0]})
//                       </span>
//                     )}
//                   </span>

//                   {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute transition-all duration-300 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
//                     <ul className="py-2">
//                       <li className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer">
//                         Profile
//                       </li>
//                       <li className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer">
//                         Settings
//                       </li>
//                       <li className=" hover:bg-[#F4F4F4] cursor-pointer">
//                         <button
//                           className="px-4 py-2 flex items-start w-full h-full"
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside
//           className={`${
//             expanded ? "w-64" : "w-20"
//           } bg-white shadow-md transition-all duration-300 flex flex-col ${
//             isMobile && !expanded ? "-ml-20" : ""
//           } ${
//             isMobile && expanded ? "fixed inset-y-0 z-50 top-16" : "relative"
//           }`}
//         >
//           {/* Sidebar header */}
//           <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
//             {expanded && <h1 className="text-lg font-semibold">Menu</h1>}
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="p-1.5 rounded-md hover:bg-gray-100"
//             >
//               {expanded ? (
//                 <PanelLeftClose size={20} />
//               ) : (
//                 <PanelLeftOpen className="ml-1" size={20} />
//               )}
//             </button>
//           </div>

//           {/* Navigation items - Scrollable when overflowing */}
//           <nav className="flex-1 p-4 overflow-y-auto">
//             {renderMenuItems(menuItems)}
//           </nav>

//           {/* Logout button - Always at bottom */}
//           <div className="p-4 border-t mt-auto flex-shrink-0">
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 text-red-500"
//             >
//               <LogOut size={20} className="mr-2" />
//               {expanded && <span>Logout</span>}
//             </button>
//           </div>
//         </aside>

//         {/* Main content - Scrollable when overflowing */}
//         <main className="flex-1 overflow-y-auto">
//           {/* Toggle sidebar button for mobile */}
//           {isMobile && !expanded && (
//             <button
//               onClick={() => setExpanded(true)}
//               className="fixed top-20 left-4 z-30 p-2 bg-white rounded-md shadow-md"
//             >
//               <Menu size={20} />
//             </button>
//           )}

//           {/* Overlay to close sidebar on mobile */}
//           {isMobile && expanded && (
//             <div
//               className="fixed inset-0 bg-black/50 z-40 top-16"
//               onClick={() => setExpanded(false)}
//             ></div>
//           )}

//           {/* Page content */}
//           <div className=" max-w-7xl mx-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  BarChart,
  FileText,
  Bell,
  Search,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  Shield,
  Database,
  Activity,
  Layers,
  FolderGit2,
  Box,
} from "lucide-react";
import { showInfo } from "@/utils/toast";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { UserRoles } from "@/app/api/auth/[...nextauth]/route";// Import the loading component
import ContentLoadingOverlay from "./content-loading";

// Type for sidebar menu items with role restrictions
interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
  allowedRoles?: UserRoles[]; // Roles that can see this item
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userRoles = (session?.user?.roles as UserRoles[]) || [];

  // Add this state to track auth loading
  const [showLoading, setShowLoading] = useState(status === "loading");

  // Update loading state when auth status changes
  useEffect(() => {
    setShowLoading(status === "loading");
  }, [status]);

  // Check if we're on mobile on initial render and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };

    // Check on mount
    checkIfMobile();

    // Check on resize
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to check if user has access to a menu item
  const hasAccess = (item: MenuItem): boolean => {
    // If no specific roles are defined, everyone can see it
    if (!item.allowedRoles || item.allowedRoles.length === 0) {
      return true;
    }

    // Check if user has any of the required roles
    return item.allowedRoles.some((role) => userRoles.includes(role));
  };

  // Define sidebar menu items with role restrictions
  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home size={20} />,
      // No allowedRoles - accessible to everyone
    },
    {
      title: "Workspaces",
      path: "/dashboard/workspaces",
      icon: <FolderGit2 size={20} />,
      submenu: [
        {
          title: "Projects",
          path: "/dashboard/workspaces/projects",
          icon: <Box size={20} />,
          // allowedRoles: [UserRoles.admin],
        },
        {
          title: "Teams",
          path: "/dashboard/workspaces/teams",
          icon: <Users size={20} />,

          // allowedRoles: [UserRoles.admin, UserRoles.teamManager],
        },
      ],
    },
    {
      title: "User Management",
      icon: <Users size={20} />,
      allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Only admin and managers
      submenu: [
        {
          title: "All Users",
          path: "/dashboard/users",
          icon: <User size={20} />,
          allowedRoles: [UserRoles.admin], // Admin only
        },
        {
          title: "Teams",
          path: "/dashboard/teams",
          icon: <Users size={20} />,
          allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Admin and managers
        },
      ],
    },
    {
      title: "Reports",
      icon: <BarChart size={20} />,
      submenu: [
        {
          title: "Analytics",
          path: "/dashboard/analytics",
          icon: <BarChart size={20} />,
          allowedRoles: [UserRoles.admin, UserRoles.teamManager], // Admin and managers
        },
        {
          title: "Documents",
          path: "/dashboard/documents",
          icon: <FileText size={20} />,
          // No allowedRoles - accessible to everyone
        },
      ],
    },
    {
      title: "Admin Panel",
      icon: <Shield size={20} />,
      allowedRoles: [UserRoles.admin], // Admin only
      submenu: [
        {
          title: "System Settings",
          path: "/dashboard/admin/settings",
          icon: <Database size={20} />,
          allowedRoles: [UserRoles.admin], // Admin only
        },
        {
          title: "Activity Logs",
          path: "/dashboard/admin/logs",
          icon: <Activity size={20} />,
          allowedRoles: [UserRoles.admin], // Admin only
        },
        {
          title: "Permissions",
          path: "/dashboard/admin/permissions",
          icon: <Layers size={20} />,
          allowedRoles: [UserRoles.admin], // Admin only
        },
      ],
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      submenu: [
        {
          title: "Profile Settings",
          path: "/dashboard/settings/profile",
          icon: <User size={20} />,
          // No allowedRoles - accessible to everyone
        },
        {
          title: "Account Settings",
          path: "/dashboard/settings/account",
          icon: <Settings size={20} />,
          // No allowedRoles - accessible to everyone
        },
      ],
    },
    {
      title: "Help & Support",
      path: "/dashboard/help",
      icon: <HelpCircle size={20} />,
      // No allowedRoles - accessible to everyone
    },
  ];

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Toggle submenu open/closed
  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Check if path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Check if parent is active (any child is active)
  const isParentActive = (submenu?: MenuItem[]) => {
    if (!submenu) return false;
    return submenu.some((item) => item.path && pathname === item.path);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      showInfo("You have been logged out");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Render menu items recursively with role-based filtering
  const renderMenuItems = (items: MenuItem[]) => {
    return items
      .filter((item) => hasAccess(item))
      .map((item) => {
        // If item has submenu, filter the submenu items by role too
        const accessibleSubmenu = item.submenu
          ? item.submenu.filter((subItem) => hasAccess(subItem))
          : undefined;

        // Skip rendering this item if it has a submenu but all submenu items are filtered out
        if (
          item.submenu &&
          accessibleSubmenu &&
          accessibleSubmenu.length === 0
        ) {
          return null;
        }

        return (
          <div key={item.title} className="mb-1">
            {accessibleSubmenu ? (
              // Parent menu with dropdown
              <div>
                <div
                  onClick={() => toggleSubmenu(item.title)}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                    isParentActive(accessibleSubmenu)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    {expanded && <span>{item.title}</span>}
                  </div>
                  {expanded && (
                    <span>
                      {openMenus[item.title] ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  )}
                </div>

                {/* Submenu items */}
                {openMenus[item.title] && expanded && (
                  <div className="pl-8 mt-1 space-y-1">
                    {accessibleSubmenu.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path || "#"}
                        className={`flex items-center p-2 rounded-md ${
                          isActive(subItem.path || "")
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className="mr-2">{subItem.icon}</span>
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Simple menu item with no children
              <Link
                href={item.path || "#"}
                className={`flex items-center p-2 rounded-md ${
                  isActive(item.path || "")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {expanded && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        );
      });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - Fixed at top */}
      <header className="bg-white shadow-sm z-30 sticky top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Logo/Brand */}
              <div className="flex gap-2 flex-shrink-0">
                <Image
                  src="/icons/logo.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                  className="sidebar-icon"
                />
                <span className="text-[24px] font-bold text-inter">
                  DIGFlow
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                <span className="sr-only">View notifications</span>
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex gap-1 hover:bg-[#F4F4F4] shadow-md px-[16px] py-[8px] rounded-[12px] items-center"
                >
                  <Image
                    src="/avatars/avatar1.svg"
                    alt="avatar"
                    width={30}
                    height={30}
                    className=""
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                    {session?.user?.name || "User"}
                    {userRoles.length > 0 && (
                      <span className="ml-1 text-xs text-gray-500">
                        ({userRoles[0]})
                      </span>
                    )}
                  </span>

                  {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                </button>

                {isDropdownOpen && (
                  <div className="absolute transition-all duration-300 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-[#F4F4F4] cursor-pointer">
                        Settings
                      </li>
                      <li className=" hover:bg-[#F4F4F4] cursor-pointer">
                        <button
                          className="px-4 py-2 flex items-start w-full h-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            expanded ? "w-64" : "w-20"
          } bg-white shadow-md transition-all duration-300 flex flex-col ${
            isMobile && !expanded ? "-ml-20" : ""
          } ${
            isMobile && expanded ? "fixed inset-y-0 z-50 top-16" : "relative"
          }`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
            {expanded && <h1 className="text-lg font-semibold">Menu</h1>}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-md hover:bg-gray-100"
            >
              {expanded ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen className="ml-1" size={20} />
              )}
            </button>
          </div>

          {/* Navigation items - Scrollable when overflowing */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {renderMenuItems(menuItems)}
          </nav>

          {/* Logout button - Always at bottom */}
          <div className="p-4 border-t mt-auto flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 text-red-500"
            >
              <LogOut size={20} className="mr-2" />
              {expanded && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main content - Scrollable when overflowing */}
        <main className="flex-1 overflow-y-auto">
          {/* Toggle sidebar button for mobile */}
          {isMobile && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="fixed top-20 left-4 z-30 p-2 bg-white rounded-md shadow-md"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Overlay to close sidebar on mobile */}
          {isMobile && expanded && (
            <div
              className="fixed inset-0 bg-black/50 z-40 top-16"
              onClick={() => setExpanded(false)}
            ></div>
          )}

          {/* Page content with loading overlay */}
          <div className="max-w-7xl mx-auto relative">
            {showLoading && <ContentLoadingOverlay />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}