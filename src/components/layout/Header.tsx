
import React, { useState } from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, User, FolderOpen, LogOut, Plus } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import ProjectSelector from "@/components/project/ProjectSelector";

const Header = () => {
  const { user, logout, project } = useVideoCreation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);

  return (
    <header className="border-b bg-background py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">AI Video Creator</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setProjectSelectorOpen(true)}
            className="gap-2"
          >
            <FolderOpen className="h-4 w-4" />
            {project.topic ? 
              project.topic.length > 20 ? 
                `${project.topic.substring(0, 20)}...` : 
                project.topic : 
              "Projects"
            }
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setProjectSelectorOpen(true)}>
                  <FolderOpen className="h-4 w-4 mr-2" />
                  My Projects
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)}>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
      />
      
      <ProjectSelector
        isOpen={projectSelectorOpen}
        onClose={() => setProjectSelectorOpen(false)}
      />
    </header>
  );
};

export default Header;
