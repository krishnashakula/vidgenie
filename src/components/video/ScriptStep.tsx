import React, { useState } from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, Wand2, Loader2, Save, Edit, CheckCircle, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateScript } from "@/services/openaiService";
import { Script } from "@/types/video";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from 'react-markdown';
import { analyzeScript, initializeScriptCritic, ScriptFeedback } from "@/services/scriptCriticService";
import { v4 as uuidv4 } from "uuid";

const ScriptStep: React.FC = () => {
  const { project, setProject, setCurrentStep, updateProgress, openaiApiKey } = useVideoCreation();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("auto");
  const [tone, setTone] = useState<"casual" | "professional" | "enthusiastic">("professional");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [script, setScript] = useState<Script | null>(project.script);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedScript, setEditedScript] = useState<{
    title: string;
    introduction: string;
    body: string;
    conclusion: string;
  }>({
    title: project.script?.title || "",
    introduction: project.script?.introduction || "",
    body: project.script?.body || "",
    conclusion: project.script?.conclusion || "",
  });

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<ScriptFeedback | null>(null);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    setError("");
    setFeedback(null);
    
    try {
      const generatedScript = await generateScript(project.topic, length, tone);
      setScript(generatedScript);
      
      setProject((prev) => ({
        ...prev,
        script: {
          ...generatedScript,
          id: uuidv4()
        },
        updatedAt: new Date()
      }));
      
      setEditedScript({
        title: generatedScript.title,
        introduction: generatedScript.introduction,
        body: generatedScript.body,
        conclusion: generatedScript.conclusion
      });
      
      updateProgress("script", true);
      
      setActiveTab("preview");
    } catch (error) {
      console.error("Error generating script:", error);
      setError(`Failed to generate script: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdits = () => {
    const updatedScript: Script = {
      id: project.script?.id || uuidv4(),
      title: editedScript.title,
      introduction: editedScript.introduction,
      body: editedScript.body,
      conclusion: editedScript.conclusion,
      fullText: `${editedScript.title}\n\n${editedScript.introduction}\n\n${editedScript.body}\n\n${editedScript.conclusion}`
    };
    
    setScript(updatedScript);
    setProject((prev) => ({
      ...prev,
      script: updatedScript,
      updatedAt: new Date()
    }));
    
    setEditMode(false);
    updateProgress("script", true);
    setFeedback(null);
  };

  const handleContinue = () => {
    setCurrentStep("audio");
  };

  const handleGoBack = () => {
    setCurrentStep("topic");
  };
  
  const handleAnalyzeScript = async () => {
    if (!script) return;
    
    setIsAnalyzing(true);
    setError("");
    
    try {
      initializeScriptCritic(openaiApiKey);
      const scriptFeedback = await analyzeScript(script, project.topic);
      setFeedback(scriptFeedback);
      
      if (scriptFeedback.improvedScript) {
        setEditedScript({
          title: scriptFeedback.improvedScript.title,
          introduction: scriptFeedback.improvedScript.introduction,
          body: scriptFeedback.improvedScript.body,
          conclusion: scriptFeedback.improvedScript.conclusion
        });
      }
    } catch (error) {
      console.error("Error analyzing script:", error);
      setError(`Failed to analyze script: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleApplyImprovedScript = () => {
    if (!feedback?.improvedScript) return;
    
    const updatedScript: Script = {
      id: project.script?.id || uuidv4(),
      ...feedback.improvedScript
    };
    
    setScript(updatedScript);
    setProject((prev) => ({
      ...prev,
      script: updatedScript,
      updatedAt: new Date()
    }));
    
    setFeedback(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Video Script</CardTitle>
          <CardDescription>
            Generate a professional script for your video on "{project.topic}"
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="auto" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="auto">Auto-Generate</TabsTrigger>
              <TabsTrigger value="manual">Write Manually</TabsTrigger>
              {script && <TabsTrigger value="preview">Preview</TabsTrigger>}
              {script && <TabsTrigger value="critic">Script Critic</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="auto" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Script Tone</Label>
                  <RadioGroup 
                    defaultValue="professional" 
                    value={tone}
                    onValueChange={(value) => setTone(value as any)} 
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="casual" id="tone-casual" />
                      <Label htmlFor="tone-casual">Casual</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="tone-professional" />
                      <Label htmlFor="tone-professional">Professional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enthusiastic" id="tone-enthusiastic" />
                      <Label htmlFor="tone-enthusiastic">Enthusiastic</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Script Length</Label>
                  <RadioGroup 
                    defaultValue="medium" 
                    value={length}
                    onValueChange={(value) => setLength(value as any)} 
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="length-short" />
                      <Label htmlFor="length-short">Short (~2min)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="length-medium" />
                      <Label htmlFor="length-medium">Medium (~4min)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="length-long" />
                      <Label htmlFor="length-long">Long (~8min)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <Button
                onClick={handleGenerateScript}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Script...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Script
                  </>
                )}
              </Button>
              
              {script && (
                <div className="mt-4">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      Script generated successfully! You can preview it in the "Preview" tab or edit it in the "Write Manually" tab.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="manual" className="space-y-4">
              {!editMode && script ? (
                <div className="space-y-6">
                  <Button onClick={() => setEditMode(true)} variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Script
                  </Button>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="font-medium text-lg">Title</Label>
                      <p className="mt-1 p-2 border rounded-md bg-muted/40">{script.title}</p>
                    </div>
                    <div>
                      <Label className="font-medium text-lg">Introduction</Label>
                      <p className="mt-1 p-2 border rounded-md bg-muted/40 whitespace-pre-line">
                        {script.introduction}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium text-lg">Body</Label>
                      <p className="mt-1 p-2 border rounded-md bg-muted/40 whitespace-pre-line">
                        {script.body}
                      </p>
                    </div>
                    <div>
                      <Label className="font-medium text-lg">Conclusion</Label>
                      <p className="mt-1 p-2 border rounded-md bg-muted/40 whitespace-pre-line">
                        {script.conclusion}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Textarea
                      id="title"
                      placeholder="Enter a catchy title for your video"
                      rows={2}
                      value={editedScript.title}
                      onChange={(e) => setEditedScript(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="introduction">Introduction</Label>
                    <Textarea
                      id="introduction"
                      placeholder="Write an engaging introduction that hooks your audience"
                      rows={4}
                      value={editedScript.introduction}
                      onChange={(e) => setEditedScript(prev => ({ ...prev, introduction: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body">Body</Label>
                    <Textarea
                      id="body"
                      placeholder="Write the main content of your script with key points and examples"
                      rows={8}
                      value={editedScript.body}
                      onChange={(e) => setEditedScript(prev => ({ ...prev, body: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="conclusion">Conclusion</Label>
                    <Textarea
                      id="conclusion"
                      placeholder="Write a conclusion summarizing your main points"
                      rows={3}
                      value={editedScript.conclusion}
                      onChange={(e) => setEditedScript(prev => ({ ...prev, conclusion: e.target.value }))}
                    />
                  </div>
                  
                  <Button onClick={handleSaveEdits} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Script
                  </Button>
                </div>
              )}
            </TabsContent>
            
            {script && (
              <TabsContent value="preview" className="space-y-6">
                <div className="p-6 border rounded-lg bg-white">
                  <h2 className="text-2xl font-bold mb-4 text-center">{script.title}</h2>
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Introduction</h3>
                      <div className="prose">
                        {script.introduction}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Main Content</h3>
                      <div className="prose">
                        {script.body}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-2">Conclusion</h3>
                      <div className="prose">
                        {script.conclusion}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            )}
            
            {script && (
              <TabsContent value="critic" className="space-y-6">
                <div className="mb-6">
                  <Button
                    onClick={handleAnalyzeScript}
                    disabled={isAnalyzing || !script}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Script...
                      </>
                    ) : (
                      <>
                        <Star className="mr-2 h-4 w-4" />
                        Analyze & Improve Script
                      </>
                    )}
                  </Button>
                </div>
                
                {feedback && (
                  <div className="space-y-4">
                    <Alert className={feedback.hasSuggestions ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}>
                      <Star className={`h-4 w-4 ${feedback.hasSuggestions ? "text-amber-500" : "text-green-500"}`} />
                      <AlertDescription className={feedback.hasSuggestions ? "text-amber-700" : "text-green-700"}>
                        {feedback.hasSuggestions ? "Our AI critic has some suggestions for your script." : "Great job! Your script looks good with minimal suggestions."}
                      </AlertDescription>
                    </Alert>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-2">Feedback & Suggestions</h3>
                      {feedback.suggestions.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {feedback.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No significant issues found in your script.</p>
                      )}
                    </div>
                    
                    {feedback.improvedScript && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Improved Script Available</h3>
                        <Button onClick={handleApplyImprovedScript} className="w-full">
                          Apply Improved Script
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleContinue} 
            disabled={!script}
          >
            Continue to Audio
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScriptStep;
