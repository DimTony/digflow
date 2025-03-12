"use server";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { UserRoles } from "@/lib/types";
import { authOptions } from "@/app/api/_services/auth.service";

// Type definitions
interface TeamData {
  name: string;
  identifier: string;
  members?: string[]; // Member IDs
}

// Check if the current user is authorized for the action
async function isAuthorized(requiredRoles: UserRoles[]) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.roles) {
    return false;
  }

  const userRoles = session.user.roles as UserRoles[];
  return userRoles.some((role) => requiredRoles.includes(role));
}

// Create a new team (admin only)
export async function createTeam(teamData: TeamData) {
  const authorized = await isAuthorized([UserRoles.admin]);

  if (!authorized) {
    return {
      success: false,
      message: "You don't have permission to create teams",
    };
  }

  try {
    // In a real application, this would be a database operation
    console.log("Creating team:", teamData);

    // For demo purposes, just return success
    revalidatePath("/dashboard/workspaces/teams");

    return {
      success: true,
      message: "Team created successfully",
    };
  } catch (error) {
    console.error("Error creating team:", error);
    return {
      success: false,
      message: "Failed to create team",
    };
  }
}

// Update a team (admin and team manager)
export async function updateTeam(teamId: string, teamData: Partial<TeamData>) {
  const authorized = await isAuthorized([
    UserRoles.admin,
    UserRoles.teamManager,
  ]);

  if (!authorized) {
    return {
      success: false,
      message: "You don't have permission to update teams",
    };
  }

  try {
    // In a real application, this would be a database operation
    console.log("Updating team:", teamId, teamData);

    // For demo purposes, just return success
    revalidatePath("/dashboard/workspaces/teams");

    return {
      success: true,
      message: "Team updated successfully",
    };
  } catch (error) {
    console.error("Error updating team:", error);
    return {
      success: false,
      message: "Failed to update team",
    };
  }
}

// Delete a team (admin only)
export async function deleteTeam(teamId: string) {
  const authorized = await isAuthorized([UserRoles.admin]);

  if (!authorized) {
    return {
      success: false,
      message: "You don't have permission to delete teams",
    };
  }

  try {
    // In a real application, this would be a database operation
    console.log("Deleting team:", teamId);

    // For demo purposes, just return success
    revalidatePath("/dashboard/workspaces/teams");

    return {
      success: true,
      message: "Team deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting team:", error);
    return {
      success: false,
      message: "Failed to delete team",
    };
  }
}

// Add a member to a team (admin and team manager)
export async function addTeamMember(teamId: string, userId: string) {
  const authorized = await isAuthorized([
    UserRoles.admin,
    UserRoles.teamManager,
  ]);

  if (!authorized) {
    return {
      success: false,
      message: "You don't have permission to add team members",
    };
  }

  try {
    // In a real application, this would be a database operation
    console.log("Adding member to team:", teamId, userId);

    // For demo purposes, just return success
    revalidatePath("/dashboard/workspaces/teams");

    return {
      success: true,
      message: "Team member added successfully",
    };
  } catch (error) {
    console.error("Error adding team member:", error);
    return {
      success: false,
      message: "Failed to add team member",
    };
  }
}

// Remove a member from a team (admin and team manager)
export async function removeTeamMember(teamId: string, userId: string) {
  const authorized = await isAuthorized([
    UserRoles.admin,
    UserRoles.teamManager,
  ]);

  if (!authorized) {
    return {
      success: false,
      message: "You don't have permission to remove team members",
    };
  }

  try {
    // In a real application, this would be a database operation
    console.log("Removing member from team:", teamId, userId);

    // For demo purposes, just return success
    revalidatePath("/dashboard/workspaces/teams");

    return {
      success: true,
      message: "Team member removed successfully",
    };
  } catch (error) {
    console.error("Error removing team member:", error);
    return {
      success: false,
      message: "Failed to remove team member",
    };
  }
}
