"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus,
  FolderGit2,
  Calendar,
  Users,
  MoreHorizontal,
  Database,
  Zap,
  Smartphone,
  FileCode,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserRoles } from "@/app/api/auth/[...nextauth]/route";

// Project interface
interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "archived";
  progress: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  members: {
    id: string;
    name: string;
    avatar: string;
  }[];
  taskCount: {
    total: number;
    completed: number;
  };
}

// Function to get project status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-500 bg-green-50";
    case "completed":
      return "text-blue-500 bg-blue-50";
    case "archived":
      return "text-gray-500 bg-gray-50";
    default:
      return "text-gray-500 bg-gray-50";
  }
};

export default function TeamDetail() {
  const router = useRouter();
  const { teamId } = useParams() as { teamId: string };
  const [team, setTeam] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userRoles = (session?.user?.roles as UserRoles[]) || [];
  const isAdmin = userRoles.includes(UserRoles.admin);
  const isManager = userRoles.includes(UserRoles.teamManager);
  const canManage = isAdmin || isManager;

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchTeamData = async () => {
      try {
        // Mock team data
        const teamData = {
          id: teamId,
          name:
            teamId === "1" ? "BACKEND" : teamId === "2" ? "Frontend" : "Mobile",
          iconType:
            teamId === "1" ? "database" : teamId === "2" ? "zap" : "smartphone",
          color:
            teamId === "1"
              ? "bg-blue-100"
              : teamId === "2"
              ? "bg-orange-100"
              : "bg-purple-100",
          identifier: teamId === "1" ? "BE" : teamId === "2" ? "FE" : "MOB",
          description:
            "Team responsible for developing and maintaining the backend services.",
          members: Array.from({ length: 8 }, (_, i) => ({
            id: `member-${i + 1}`,
            name: `Team Member ${i + 1}`,
            avatar: `/avatars/avatar${(i % 5) + 1}.svg`,
          })),
          createdAt: "2021-09-15T12:00:00Z",
          updatedAt: "2023-02-28T15:30:00Z",
        };

        // Mock projects data
        const projectsData: Project[] = [
          {
            id: "1",
            name: "HNG Frontend 4",
            description: "Frontend development for the HNG application",
            status: "active",
            progress: 65,
            teamId: teamId,
            createdAt: "2023-01-15T09:00:00Z",
            updatedAt: "2023-03-10T14:20:00Z",
            members: Array.from({ length: 4 }, (_, i) => ({
              id: `member-${i + 1}`,
              name: `Project Member ${i + 1}`,
              avatar: `/avatars/avatar${(i % 5) + 1}.svg`,
            })),
            taskCount: {
              total: 24,
              completed: 16,
            },
          },
          {
            id: "2",
            name: "API Integration",
            description: "Integrate backend APIs with frontend applications",
            status: "active",
            progress: 40,
            teamId: teamId,
            createdAt: "2023-02-10T11:30:00Z",
            updatedAt: "2023-03-05T16:45:00Z",
            members: Array.from({ length: 3 }, (_, i) => ({
              id: `member-${i + 1}`,
              name: `Project Member ${i + 1}`,
              avatar: `/avatars/avatar${(i % 5) + 1}.svg`,
            })),
            taskCount: {
              total: 18,
              completed: 7,
            },
          },
          {
            id: "3",
            name: "Dashboard Redesign",
            description: "Redesign the dashboard UI with new components",
            status: "completed",
            progress: 100,
            teamId: teamId,
            createdAt: "2022-11-05T10:15:00Z",
            updatedAt: "2023-01-20T13:10:00Z",
            members: Array.from({ length: 2 }, (_, i) => ({
              id: `member-${i + 1}`,
              name: `Project Member ${i + 1}`,
              avatar: `/avatars/avatar${(i % 5) + 1}.svg`,
            })),
            taskCount: {
              total: 15,
              completed: 15,
            },
          },
        ];

        setTeam(teamData);
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team data:", error);
        setLoading(false);
      }
    };

    if (teamId) {
      fetchTeamData();
    }
  }, [teamId]);

  // Function to get team icon
  const getTeamIcon = (iconType: string) => {
    switch (iconType) {
      case "database":
        return <Database size={24} className="text-blue-500" />;
      case "zap":
        return <Zap size={24} className="text-orange-500" />;
      case "smartphone":
        return <Smartphone size={24} className="text-purple-500" />;
      case "code":
        return <FileCode size={24} className="text-orange-500" />;
      case "pencil":
        return <Pencil size={24} className="text-blue-500" />;
      default:
        return <Database size={24} className="text-blue-500" />;
    }
  };

  // Function to handle creating a new project
  const handleCreateProject = () => {
    alert("Create project functionality will be implemented here");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">Team not found</h2>
        <p className="mt-2 text-gray-500">
          The team you're looking for doesn't exist or you don't have access.
        </p>
        <button
          onClick={() => router.push("/dashboard/workspaces/teams")}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Back to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Team header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${team.color}`}>
              {getTeamIcon(team.iconType)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{team.name}</h1>
                <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded">
                  {team.identifier}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{team.description}</p>
            </div>
          </div>
          {canManage && (
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} />
            <span>{team.members.length} members</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FolderGit2 size={18} />
            <span>{projects.length} projects</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>Created {new Date(team.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Team members */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Team Members</h2>
          {canManage && (
            <button className="text-primary hover:underline text-sm font-medium">
              Manage Members
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          {team.members.map((member: any) => (
            <div
              key={member.id}
              className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg"
            >
              <Image
                src={member.avatar || "/avatars/avatar1.svg"}
                alt={member.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{member.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Projects</h2>
          {canManage && (
            <button
              onClick={handleCreateProject}
              className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary/90 text-sm"
            >
              <Plus size={16} />
              <span>Create Project</span>
            </button>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                href={`/dashboard/workspaces/projects/${project.id}`}
                key={project.id}
                className="block border rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{project.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>{project.taskCount.completed}</span>
                      <span>/</span>
                      <span>{project.taskCount.total}</span>
                      <span>tasks</span>
                    </div>

                    <div className="flex -space-x-2">
                      {project.members.map((member, index) => (
                        <Image
                          key={`${project.id}-member-${index}`}
                          src={member.avatar}
                          alt={member.name}
                          width={24}
                          height={24}
                          className="rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FolderGit2 size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No projects found
            </h3>
            <p className="text-gray-500 mb-6">
              This team doesn't have any projects yet.
            </p>

            {canManage && (
              <button
                onClick={handleCreateProject}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                <Plus size={18} />
                <span>Create first project</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
