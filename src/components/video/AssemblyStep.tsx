
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle, Image as ImageIcon, File, AudioLines } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AssemblyStep: React.FC = () => {
  const { project, setCurrentStep, updateProgress } = useVideoCreation();
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  
  const handleGoBack = () => {
    setCurrentStep("visuals");
  };

  const handleContinue = () => {
    // Mark this step as completed
    updateProgress("assembly", true);
    // Move to the next step
    setCurrentStep("rendering");
  };

  const handlePreviewToggle = () => {
    setIsPreviewPlaying(!isPreviewPlaying);
  };

  const audioAvailable = !!project.audio?.src;
  const scriptAvailable = !!project.script;

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Assemble Your Video</CardTitle>
          <CardDescription>
            Review and arrange your script, audio, and visuals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="assets">Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <div className="bg-muted aspect-video rounded-lg flex items-center justify-center relative">
                {isPreviewPlaying ? (
                  <div className="text-center">
                    <p className="text-muted-foreground">Preview playing...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <p className="text-xl">Preview Your Video</p>
                    <Button 
                      variant="secondary" 
                      onClick={handlePreviewToggle}
                      className="mx-auto"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Preview
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Video Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-center bg-muted/50 p-3 rounded-md">
                    <AudioLines className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Audio Track</p>
                      {audioAvailable ? (
                        <p className="text-sm text-muted-foreground">
                          Duration: {Math.round(project.audio.duration)}s
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No audio generated yet
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center bg-muted/50 p-3 rounded-md">
                    <ImageIcon className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="font-medium">Visual Elements</p>
                      <p className="text-sm text-muted-foreground">
                        {project.visuals.length > 0 
                          ? `${project.visuals.length} visuals added` 
                          : "No visuals added yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-3">Available Assets</h3>
                
                {scriptAvailable && (
                  <div className="bg-muted/50 p-4 rounded-md mb-4">
                    <div className="flex items-center mb-2">
                      <File className="h-5 w-5 mr-2 text-primary" />
                      <h4 className="font-medium">Script</h4>
                    </div>
                    <p className="text-sm line-clamp-3 mb-2">{project.script.fullText.substring(0, 150)}...</p>
                    <Button variant="outline" size="sm">View Full Script</Button>
                  </div>
                )}
                
                {audioAvailable && (
                  <div className="bg-muted/50 p-4 rounded-md mb-4">
                    <div className="flex items-center mb-2">
                      <AudioLines className="h-5 w-5 mr-2 text-primary" />
                      <h4 className="font-medium">Audio</h4>
                    </div>
                    <audio controls className="w-full mt-2" src={project.audio.src} />
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                      <h4 className="font-medium">Visuals</h4>
                    </div>
                    <Button variant="outline" size="sm">Add Visual</Button>
                  </div>
                  
                  {project.visuals.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {project.visuals.map((visual, index) => (
                        <div key={visual.id} className="border rounded-md p-2 flex flex-col">
                          <div className="bg-muted aspect-video rounded-md flex items-center justify-center mb-2">
                            Visual {index + 1}
                          </div>
                          <p className="text-xs truncate text-muted-foreground">{visual.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No visuals added yet</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button onClick={handleContinue}>
            Continue to Rendering
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssemblyStep;
