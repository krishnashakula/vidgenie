
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";

const VisualsStep: React.FC = () => {
  const { setCurrentStep, updateProgress } = useVideoCreation();

  const handleGoBack = () => {
    setCurrentStep("audio");
  };

  const handleContinue = () => {
    // Mark this step as completed
    updateProgress("visuals", true);
    // Move to the next step
    setCurrentStep("assembly");
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Visuals to Your Video</CardTitle>
          <CardDescription>
            Add images and video clips to accompany your audio narration
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Construction className="h-16 w-16 mb-4 text-muted-foreground" />
          <p className="text-xl text-center mb-2">Visual Selection Coming Soon</p>
          <p className="text-center text-muted-foreground">
            This feature is currently under development. Soon you'll be able to add images and videos to your project.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleContinue}
          >
            Continue to Assembly
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VisualsStep;
