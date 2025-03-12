"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus,
  ChevronDown,
  Search,
  ChevronRight,
  MoreHorizontal,
  GripVertical,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { UserRoles } from "@/app/api/auth/[...nextauth]/route";

// Task type definition
interface Task {
  id: string;
  title: string;
  description?: string;
  status: "backlog" | "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  labels: string[];
  assignees?: {
    id: string;
    name: string;
    avatar: string;
  }[];
  dueDate?: string;
  estimatedTime?: string;
}

// Column type definition
interface Column {
  id: string;
  title: string;
  taskCount: number;
  tasks: Task[];
}

// Label colors
const labelColors: Record<string, string> = {
  frontend: "bg-orange-100 text-orange-800",
  design: "bg-purple-100 text-purple-800",
  backend: "bg-blue-100 text-blue-800",
  bug: "bg-red-100 text-red-800",
  feature: "bg-green-100 text-green-800",
  ui: "bg-pink-100 text-pink-800",
  ux: "bg-indigo-100 text-indigo-800",
};

// Priority colors
const priorityColors: Record<string, string> = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export default function ProjectBoard() {
  const router = useRouter();
  const { projectId } = useParams() as { projectId: string };
  const [project, setProject] = useState<any>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const userRoles = (session?.user?.roles as UserRoles[]) || [];
  const isAdmin = userRoles.includes(UserRoles.admin);
  const isManager = userRoles.includes(UserRoles.teamManager);
  const canManage = isAdmin || isManager;

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProjectData = async () => {
      try {
        // Mock project data
        const projectData = {
          id: projectId,
          name: "HNG Frontend 4",
          description: "Frontend development for the HNG application",
          teamId: "1",
          teamName: "BACKEND",
          status: "active",
          createdAt: "2023-01-15T09:00:00Z",
          updatedAt: "2023-03-10T14:20:00Z",
        };

        // Mock tasks data
        const tasksData: Task[] = [
          {
            id: "1",
            title: "Design Mobile Column Layout",
            description: "Create responsive scrolling solution for mobile view",
            status: "todo",
            priority: "medium",
            labels: ["design", "frontend"],
            assignees: [
              {
                id: "user-1",
                name: "User One",
                avatar: "/avatars/avatar1.svg",
              },
              {
                id: "user-2",
                name: "User Two",
                avatar: "/avatars/avatar2.svg",
              },
            ],
            estimatedTime: "2d 4h",
          },
          {
            id: "2",
            title: "Build Interactive Prototypes",
            description: "Connect the components with proper transitions",
            status: "todo",
            priority: "high",
            labels: ["frontend", "ui"],
            assignees: [
              {
                id: "user-3",
                name: "User Three",
                avatar: "/avatars/avatar3.svg",
              },
            ],
            estimatedTime: "3d 5h",
          },
          {
            id: "3",
            title: "Create Task Card Component",
            description: "Design a new task card with all the required fields",
            status: "in_progress",
            priority: "high",
            labels: ["design", "frontend"],
            assignees: [
              {
                id: "user-4",
                name: "User Four",
                avatar: "/avatars/avatar4.svg",
              },
            ],
            dueDate: "2023-04-15",
          },
          {
            id: "4",
            title: "Create Design System Page",
            description: "Document color palette, typography, and components",
            status: "in_progress",
            priority: "medium",
            labels: ["design", "ui"],
            assignees: [
              {
                id: "user-5",
                name: "User Five",
                avatar: "/avatars/avatar5.svg",
              },
            ],
          },
          {
            id: "5",
            title: "Define Typography Scale",
            description: "Create font scales using design system rules",
            status: "in_progress",
            priority: "low",
            labels: ["design"],
          },
          {
            id: "6",
            title: "Design Logo for KanFlow",
            description: "Create a simple, memorable logo for the header",
            status: "done",
            priority: "medium",
            labels: ["design"],
            assignees: [
              {
                id: "user-5",
                name: "User Five",
                avatar: "/avatars/avatar5.svg",
              },
            ],
          },
          {
            id: "7",
            title: "Create Color Palette",
            description: "Define a color scheme for the Kanban board UI",
            status: "done",
            priority: "medium",
            labels: ["design", "ui"],
          },
        ];

        // Group tasks by status
        const backlogTasks = tasksData.filter(
          (task) => task.status === "backlog"
        );
        const todoTasks = tasksData.filter((task) => task.status === "todo");
        const inProgressTasks = tasksData.filter(
          (task) => task.status === "in_progress"
        );
        const doneTasks = tasksData.filter((task) => task.status === "done");

        // Create columns
        const columnsData: Column[] = [
          {
            id: "backlog",
            title: "BACKLOG",
            taskCount: backlogTasks.length,
            tasks: backlogTasks,
          },
          {
            id: "todo",
            title: "TO DO",
            taskCount: todoTasks.length,
            tasks: todoTasks,
          },
          {
            id: "in_progress",
            title: "IN PROGRESS",
            taskCount: inProgressTasks.length,
            tasks: inProgressTasks,
          },
          {
            id: "done",
            title: "DONE",
            taskCount: doneTasks.length,
            tasks: doneTasks,
          },
        ];

        setProject(projectData);
        setColumns(columnsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleAddTask = (columnId: string) => {
    alert(`Add new task to ${columnId} column`);
  };

  const handleAddColumn = () => {
    alert("Add new column");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          Project not found
        </h2>
        <p className="mt-2 text-gray-500">
          The project you're looking for doesn't exist or you don't have access.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Project header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              onClick={() => router.back()}
              className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="rotate-180 h-5 w-5" />
              <span className="ml-1 text-sm">Back</span>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">{project.name}</h1>
              <span className="ml-2 text-sm text-gray-500">Task 1</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm">
              <Plus size={16} />
              <span>Add new status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* Board container */}
      <div className="flex-grow overflow-x-auto bg-gray-50 p-4">
        <div className="flex h-full gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-64 bg-gray-100 rounded-md flex flex-col max-h-full"
            >
              {/* Column header */}
              <div className="p-2 border-b bg-gray-100 flex items-center justify-between sticky top-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-sm">{column.title}</h3>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    {column.taskCount}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Column tasks */}
              <div className="flex-grow overflow-y-auto p-2 space-y-3">
                {column.tasks.length > 0 ? (
                  column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-md shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      {/* Task labels */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {task.labels.map((label) => (
                          <span
                            key={`${task.id}-${label}`}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              labelColors[label] || "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                          </span>
                        ))}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            priorityColors[task.priority] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </span>
                      </div>

                      {/* Task title */}
                      <h4 className="font-medium text-sm mb-2">{task.title}</h4>

                      {/* Task description */}
                      {task.description && (
                        <p className="text-xs text-gray-600 mb-3">
                          {task.description}
                        </p>
                      )}

                      {/* Task footer */}
                      <div className="flex justify-between items-center mt-2">
                        {/* Assignees */}
                        {task.assignees && task.assignees.length > 0 && (
                          <div className="flex -space-x-2">
                            {task.assignees.map((assignee, index) => (
                              <Image
                                key={`${task.id}-assignee-${index}`}
                                src={assignee.avatar}
                                alt={assignee.name}
                                width={24}
                                height={24}
                                className="rounded-full border-2 border-white"
                              />
                            ))}
                          </div>
                        )}

                        {/* Estimated time */}
                        {task.estimatedTime && (
                          <span className="text-xs text-gray-500">
                            {task.estimatedTime}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500">
                      No tasks in this column
                    </p>
                  </div>
                )}
              </div>

              {/* Add task button */}
              <div className="p-2 border-t bg-gray-100 sticky bottom-0">
                <button
                  onClick={() => handleAddTask(column.id)}
                  className="w-full text-sm flex items-center justify-center gap-1 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add item</span>
                </button>
              </div>
            </div>
          ))}

          {/* Add column button */}
          {canManage && (
            <div className="flex-shrink-0 w-12 flex items-center justify-center">
              <button
                onClick={handleAddColumn}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <Plus size={20} className="text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
