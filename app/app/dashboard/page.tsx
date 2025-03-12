// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const handleSignOut = async () => {
//     await signOut({ redirect: false });
//     router.push("/login");
//   };

//   if (status === "loading") {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-6 border-b pb-4">
//           <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           <button
//             onClick={handleSignOut}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Sign Out
//           </button>
//         </div>

//         {session ? (
//           <div>
//             <div className="bg-green-50 p-4 rounded-md mb-6">
//               <h2 className="text-green-800 font-medium mb-2">
//                 Authentication Successful!
//               </h2>
//               <p className="text-green-700">
//                 You are now logged in and viewing a protected page.
//               </p>
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md">
//               <h3 className="font-medium mb-2">Your User Information:</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <strong>Name:</strong> {session.user.name}
//                 </li>
//                 <li>
//                   <strong>Username:</strong> {session.user.username}
//                 </li>
//                 <li>
//                   <strong>ID:</strong> {session.user.id}
//                 </li>
//                 <li>
//                   <strong>Roles:</strong> {session.user.roles.join(", ")}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-red-50 p-4 rounded-md">
//             <h2 className="text-red-800 font-medium">Not Authenticated</h2>
//             <p className="text-red-700">
//               You shouldn't be seeing this page. Please log in.
//             </p>
//             <button
//               onClick={() => router.push("/login")}
//               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Go to Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {session?.user?.name}!
        </h1>
        {/* <p className="text-gray-600">
          This is your dashboard homepage. You can navigate to different
          sections using the sidebar.
        </p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Activity</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold">25</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                <path d="M15 7h6v6"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Reports</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">New Reports</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full text-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-start border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                {i % 3 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                  </svg>
                ) : i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                    <path d="M15 7h6v6"></path>
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <p className="font-medium">
                  {i % 3 === 0
                    ? "New report generated"
                    : i % 2 === 0
                    ? "User profile updated"
                    : "Project milestone reached"}
                </p>
                <p className="text-sm text-gray-500">
                  {`${i * 2} hour${i * 2 > 1 ? "s" : ""} ago`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}