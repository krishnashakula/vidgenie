
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { format } from "date-fns";
import { Plus, FolderOpen, Video } from "lucide-react";

interface ProjectSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectSelector = ({ isOpen, onClose }: ProjectSelectorProps) => {
  const { projects, loadProject, createNewProject } = useVideoCreation();

  const handleLoadProject = (projectId: string) => {
    loadProject(projectId);
    onClose();
  };

  const handleCreateProject = () => {
    createNewProject();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Your Projects</DialogTitle>
          <DialogDescription>
            Select an existing project or create a new one
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 mb-4" 
            onClick={handleCreateProject}
          >
            <Plus className="h-4 w-4" /> Create New Project
          </Button>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {projects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No projects yet. Create your first one!
              </div>
            ) : (
              projects.map((project) => (
                <div 
                  key={project.id}
                  className="border rounded-md p-3 hover:bg-accent cursor-pointer flex justify-between items-center"
                  onClick={() => handleLoadProject(project.id)}
                >
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">
                        {project.topic || "Untitled Project"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Last edited: {format(new Date(project.updatedAt), 'PP')}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FolderOpen className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectSelector;
