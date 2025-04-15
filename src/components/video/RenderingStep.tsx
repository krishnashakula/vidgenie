
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";

const RenderingStep: React.FC = () => {
  const { setCurrentStep } = useVideoCreation();

  const handleGoBack = () => {
    setCurrentStep("assembly");
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Render Your Final Video</CardTitle>
          <CardDescription>
            Export your video in high quality for sharing
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Construction className="h-16 w-16 mb-4 text-muted-foreground" />
          <p className="text-xl text-center mb-2">Rendering Coming Soon</p>
          <p className="text-center text-muted-foreground">
            This feature is currently under development. Soon you'll be able to export your finished video.
          </p>
        </CardContent>
        <CardFooter className="flex justify-start">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RenderingStep;
