"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { showInfo } from "@/utils/toast";
import { createTeam } from "../dashboard/workspaces/teams/_actions";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTeamModal({ isOpen, onClose }: AddTeamModalProps) {
  const [teamName, setTeamName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName || !identifier) {
      showInfo("Please fill in all required fields", {
        description: "Team name and identifier are required",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await createTeam({
        name: teamName,
        identifier: identifier,
      });
      
      if (result.success) {
        showInfo("Success", {
          description: "Team created successfully",
          duration: 3000,
        });
        onClose();
        setTeamName("");
        setIdentifier("");
      } else {
        showInfo("Error", {
          description: result.message || "Failed to create team",
          duration: 5000,
        });
      }
    } catch (error) {
      showInfo("Error", {
        description: "An unexpected error occurred",
        duration: 5000,
      });
      console.error("Error creating team:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Team</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Backend Team"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identifier <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
              placeholder="e.g. BE"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={4}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Short code for the team (max 4 characters)
            </p>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}