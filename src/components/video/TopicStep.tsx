
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { initializeOpenAI } from "@/services/openaiService";

const TopicStep: React.FC = () => {
  const { project, setProject, updateProgress, setCurrentStep, openaiApiKey, setOpenaiApiKey } = useVideoCreation();
  const [topic, setTopic] = useState<string>(project.topic || "");
  const [description, setDescription] = useState<string>(project.description || "");
  const [apiKeyInput, setApiKeyInput] = useState<string>(openaiApiKey);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic for your video");
      return;
    }
    
    if (!apiKeyInput.trim()) {
      setError("Please enter your OpenAI API key");
      return;
    }
    
    try {
      setIsValidating(true);
      // Validate the OpenAI API key
      initializeOpenAI(apiKeyInput);
      
      // Update project with topic info
      setProject((prev) => ({
        ...prev,
        topic: topic.trim(),
        description: description.trim(),
        updatedAt: new Date()
      }));
      
      // Save API key to context
      setOpenaiApiKey(apiKeyInput);
      
      // Mark this step as completed
      updateProgress("topic", true);
      
      // Move to the next step
      setCurrentStep("script");
    } catch (error) {
      console.error("Error validating API key:", error);
      setError("Invalid OpenAI API key. Please check and try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What's your video about?</CardTitle>
          <CardDescription>
            Start by defining the topic of your video. Be specific to get the best results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., The History of Artificial Intelligence"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Additional Details (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any specific points you want to include in your video..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Label htmlFor="api-key" className="flex items-center gap-2">
              OpenAI API Key
              <span className="text-xs text-muted-foreground">(Required for script generation)</span>
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your API key is only used in your browser and never stored on our servers.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={isValidating || !topic.trim() || !apiKeyInput.trim()}
          >
            {isValidating ? (
              <>
                <span className="animate-pulse mr-2">Validating</span>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                Continue to Script
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TopicStep;
