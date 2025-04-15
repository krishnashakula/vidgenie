
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";

const AssemblyStep: React.FC = () => {
  const { setCurrentStep, updateProgress } = useVideoCreation();

  const handleGoBack = () => {
    setCurrentStep("visuals");
  };

  const handleContinue = () => {
    // Mark this step as completed
    updateProgress("assembly", true);
    // Move to the next step
    setCurrentStep("rendering");
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Assemble Your Video</CardTitle>
          <CardDescription>
            Review and arrange your script, audio, and visuals
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Construction className="h-16 w-16 mb-4 text-muted-foreground" />
          <p className="text-xl text-center mb-2">Assembly Coming Soon</p>
          <p className="text-center text-muted-foreground">
            This feature is currently under development. Soon you'll be able to assemble and preview your video.
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
            Continue to Rendering
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssemblyStep;
