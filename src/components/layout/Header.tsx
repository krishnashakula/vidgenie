
import React, { useState } from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogIn, User, FolderOpen, LogOut, Plus, UserPlus, Gift, Home, Info, Settings, DollarSign, Mail, BookOpen, FileText, ShieldCheck, HelpCircle } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import ProjectSelector from "@/components/project/ProjectSelector";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Header = () => {
  const { user, logout, project } = useVideoCreation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [projectSelectorOpen, setProjectSelectorOpen] = useState(false);

  return (
    <header className="border-b bg-background py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-primary">AI</span> Video Creator
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* Fix: Don't nest Link inside NavigationMenuLink */}
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/" className="flex items-center">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </div>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border rounded-md p-2 shadow-lg w-[400px]">
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <Link to="/features" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Features</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Discover our powerful video creation tools
                      </span>
                    </Link>
                    <Link to="/pricing" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Pricing</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Choose the perfect plan for your needs
                      </span>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                {/* Fix: Don't nest Link inside NavigationMenuLink */}
                <div className={navigationMenuTriggerStyle()}>
                  <Link to="/blog" className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Blog
                  </Link>
                </div>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background border rounded-md p-2 shadow-lg w-[400px]">
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <Link to="/about" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">About Us</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Learn more about our mission and team
                      </span>
                    </Link>
                    <Link to="/contact" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Contact</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Get in touch with our support team
                      </span>
                    </Link>
                    <Link to="/faq" className="flex flex-col space-y-1 rounded-md p-3 hover:bg-accent">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">FAQ</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Find answers to common questions
                      </span>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/referrals">
            <Button 
              variant="ghost" 
              className="gap-2 hidden md:flex"
            >
              <UserPlus className="h-4 w-4 text-primary" />
              Refer & Earn
            </Button>
          </Link>
          
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
              <DropdownMenuContent align="end" className="bg-background border shadow-lg">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/">
                  <DropdownMenuItem>
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => setProjectSelectorOpen(true)}>
                  <FolderOpen className="h-4 w-4 mr-2" />
                  My Projects
                </DropdownMenuItem>
                <Link to="/referrals">
                  <DropdownMenuItem>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Referral Program
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
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
