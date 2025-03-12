"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Filter,
  Plus,
  FolderGit2,
  SlidersHorizontal,
  Database,
  Zap,
  Smartphone,
  FileCode,
  Pencil,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import AddTeamModal from "@/app/components/AddTeamModal";
import { useRouter } from "next/navigation";
import { UserRoles } from "@/lib/types";

// Types for our teams data
interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

interface Team {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  identifier: string;
  members: TeamMember[];
  iconType: string;
  activeProjects: number;
}

export default function TeamsPage() {
  const router = useRouter()
  const { data: session } = useSession();
  const userRoles = (session?.user?.roles as UserRoles[]) || [];
  const isAdmin = userRoles.includes(UserRoles.admin);
  const isTeamManager = userRoles.includes(UserRoles.teamManager);

  // Mock data for teams
  const teams: Team[] = [
    {
      id: "1",
      name: "BACKEND",
      icon: <Database size={20} className="text-blue-500" />,
      color: "bg-blue-100",
      identifier: "BE",
      iconType: "database",
      members: Array.from({ length: 18 }, (_, i) => ({
        id: `be-${i}`,
        name: `Member ${i + 1}`,
        avatar: `/avatars/avatar${(i % 10) + 1}.svg`,
      })),
      activeProjects: 0,
    },
    {
      id: "2",
      name: "Backend Boilerplate",
      icon: <Database size={20} className="text-purple-500" />,
      color: "bg-purple-100",
      identifier: "BAC",
      iconType: "zap",
      members: [
        {
          id: "bac-1",
          name: "Member 1",
          avatar: "/avatars/avatar1.svg",
        },
      ],
      activeProjects: 0,
    },
    {
      id: "3",
      name: "Endpoint Tracking",
      icon: <FileCode size={20} className="text-orange-500" />,
      color: "bg-orange-100",
      identifier: "END",
      iconType: "smartphone",
      members: [
        {
          id: "end-1",
          name: "Member 1",
          avatar: "/avatars/avatar3.svg",
        },
      ],
      activeProjects: 0,
    },
    {
      id: "4",
      name: "FE",
      icon: <Zap size={20} className="text-orange-500" />,
      color: "bg-orange-100",
      identifier: "FE",
      iconType: "code",
      members: Array.from({ length: 11 }, (_, i) => ({
        id: `fe-${i}`,
        name: `Member ${i + 1}`,
        avatar: `/avatars/avatar${(i % 8) + 1}.svg`,
      })),
      activeProjects: 0,
    },
    {
      id: "5",
      name: "Mobile",
      icon: <Smartphone size={20} className="text-blue-500" />,
      color: "bg-blue-100",
      identifier: "MOB",
      iconType: "smartphone",
      members: Array.from({ length: 17 }, (_, i) => ({
        id: `mob-${i}`,
        name: `Member ${i + 1}`,
        avatar: `/avatars/avatar${(i % 9) + 1}.svg`,
      })),
      activeProjects: 0,
    },
    {
      id: "6",
      name: "MOBILE DEV (ANGRY BIRD)",
      icon: <Smartphone size={20} className="text-blue-500" />,
      color: "bg-blue-100",
      identifier: "MOB2",
      iconType: "smartphone",
      members: Array.from({ length: 5 }, (_, i) => ({
        id: `mob2-${i}`,
        name: `Member ${i + 1}`,
        avatar: `/avatars/avatar${(i % 7) + 1}.svg`,
      })),
      activeProjects: 0,
    },
    {
      id: "7",
      name: "MOBILE DEV (AUTH_PACKAGE)",
      icon: <Smartphone size={20} className="text-orange-500" />,
      color: "bg-orange-100",
      identifier: "MOA1",
      iconType: "smartphone",
      members: Array.from({ length: 2 }, (_, i) => ({
        id: `moa1-${i}`,
        name: `Member ${i + 1}`,
        avatar: `/avatars/avatar${(i % 5) + 1}.svg`,
      })),
      activeProjects: 0,
    },
    {
      id: "8",
      name: "MOBILE DEV TEAM SKETCH PAD",
      icon: <Pencil size={20} className="text-blue-500" />,
      color: "bg-blue-100",
      identifier: "MOB3",
      iconType: "pencil",
      members: [
        {
          id: "mob3-1",
          name: "Member 1",
          avatar: "/avatars/avatar2.svg",
        },
      ],
      activeProjects: 0,
    },
  ];

  // State for the add team modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Function to open add team modal
  const handleAddTeam = () => {
    setIsAddModalOpen(true);
  };

   const getTeamIcon = (iconType: string) => {
     switch (iconType) {
       case "database":
         return <Database size={20} className="text-blue-500" />;
       case "zap":
         return <Zap size={20} className="text-orange-500" />;
       case "smartphone":
         return <Smartphone size={20} className="text-blue-500" />;
       case "code":
         return <FileCode size={20} className="text-orange-500" />;
       case "pencil":
         return <Pencil size={20} className="text-blue-500" />;
       default:
         return <Database size={20} className="text-blue-500" />;
     }
   };

 return (
   <div className="container mx-auto px-4 py-4">
     {/* Header with teams count and add button */}
     <div className="flex justify-between items-center mb-6">
       <div className="flex items-center gap-2">
         <h1 className="text-2xl font-semibold">Teams</h1>
         <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">
           {teams.length}
         </span>
         <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
           <SlidersHorizontal size={20} />
         </button>
       </div>

       {/* Add team button - only visible to admins */}
       {isAdmin && (
         <button
           onClick={handleAddTeam}
           className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
         >
           <Plus size={18} />
           <span>Add team</span>
         </button>
       )}
     </div>

     {/* Filter and display controls */}
     <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-sm">
       <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md">
         <Filter size={18} />
         <span>Filter</span>
       </button>

       <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md">
         <SlidersHorizontal size={18} />
         <span>Display</span>
       </button>
     </div>

     {/* Table */}
     <div className="bg-white rounded-lg shadow-sm overflow-hidden">
       {teams.length > 0 ? (
         <table className="w-full">
           <thead>
             <tr className="border-b">
               <th className="text-left py-4 px-6 text-gray-500 font-medium">
                 Name
               </th>
               <th className="text-left py-4 px-6 text-gray-500 font-medium">
                 Membership
               </th>
               <th className="text-left py-4 px-6 text-gray-500 font-medium">
                 Identifier
               </th>
               <th className="text-left py-4 px-6 text-gray-500 font-medium">
                 Members
               </th>
               <th className="text-left py-4 px-6 text-gray-500 font-medium">
                 Active projects
               </th>
               {/* Actions column header - only for admin/managers */}
               {(isAdmin || isTeamManager) && <th className="w-16"></th>}
             </tr>
           </thead>
           <tbody>
             {teams.map((team) => (
               <tr
                 key={team.id}
                 className="border-b hover:bg-gray-50 cursor-pointer"
                 onClick={() =>
                   router.push(`/dashboard/workspaces/teams/${team.id}`)
                 }
               >
                 <td className="py-4 px-6">
                   <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${team.color}`}>
                       {getTeamIcon(team.iconType)}
                     </div>
                     <span className="font-medium">{team.name}</span>
                   </div>
                 </td>
                 <td className="py-4 px-6">
                   {/* Membership info could be added here */}
                 </td>
                 <td className="py-4 px-6 text-gray-500">{team.identifier}</td>
                 <td className="py-4 px-6">
                   <div className="flex -space-x-2 overflow-hidden">
                     {team.members.slice(0, 8).map((member, index) => (
                       <div
                         key={`${team.id}-member-${index}`}
                         className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                       >
                         <Image
                           src={member.avatar}
                           alt={member.name}
                           width={32}
                           height={32}
                           className="rounded-full"
                         />
                       </div>
                     ))}
                     {team.members.length > 8 && (
                       <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white text-xs font-medium text-gray-500">
                         +{team.members.length - 8}
                       </div>
                     )}
                   </div>
                   {team.members.length > 0 && (
                     <span className="ml-2 text-sm text-gray-500">
                       {team.members.length}
                     </span>
                   )}
                 </td>
                 <td className="py-4 px-6">
                   <div className="flex items-center gap-2">
                     <FolderGit2 size={18} className="text-gray-400" />
                     <span>{team.activeProjects}</span>
                   </div>
                 </td>
                 {/* Actions column - only visible to admins and managers */}
                 {(isAdmin || isTeamManager) && (
                   <td className="py-4 px-6 text-right">
                     <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                       <MoreHorizontal size={18} />
                     </button>
                   </td>
                 )}
               </tr>
             ))}
           </tbody>
         </table>
       ) : (
         <div className="p-8 text-center">
           <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
             <FolderGit2 size={24} className="text-gray-400" />
           </div>
           <h3 className="text-lg font-medium text-gray-900 mb-1">
             No teams found
           </h3>
           <p className="text-gray-500 mb-6">
             You are not a member of any teams yet.
           </p>

           {isAdmin && (
             <button
               onClick={handleAddTeam}
               className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
             >
               <Plus size={18} />
               <span>Create a team</span>
             </button>
           )}
         </div>
       )}
     </div>

     {/* Context menu for each row - only for admin/managers */}
     {(isAdmin || isTeamManager) && (
       <div className="fixed inset-0 z-40 pointer-events-none">
         {/* Context menus would be rendered here */}
       </div>
     )}

     {/* Add Team Modal */}
     {isAddModalOpen && (
       <AddTeamModal
         isOpen={isAddModalOpen}
         onClose={() => setIsAddModalOpen(false)}
       />
     )}
   </div>
 );
}
