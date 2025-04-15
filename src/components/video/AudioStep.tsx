
import React, { useState, useEffect, useRef } from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, Volume2, CheckCircle, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElevenLabsService, DEFAULT_VOICES, MODELS } from "@/services/elevenLabsService";
import { AudioSettings } from "@/types/video";

const AudioStep: React.FC = () => {
  const { project, setProject, setCurrentStep, audioSettings, setAudioSettings, updateProgress, elevenLabsApiKey, setElevenLabsApiKey } = useVideoCreation();
  const [apiKeyInput, setApiKeyInput] = useState<string>(elevenLabsApiKey);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voices, setVoices] = useState(DEFAULT_VOICES);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reset audio on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleGenerateAudio = async () => {
    if (!project.script) {
      setError("No script available. Please go back and create a script first.");
      return;
    }
    
    if (!apiKeyInput) {
      setError("Please enter your ElevenLabs API key");
      return;
    }
    
    setIsGenerating(true);
    setError("");
    
    try {
      const elevenLabsService = new ElevenLabsService(apiKeyInput);
      
      // Generate audio from script
      const audioData = await elevenLabsService.textToSpeech(
        project.script.fullText,
        audioSettings
      );
      
      // Create a blob URL for the audio
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      
      setAudioUrl(url);
      
      // Calculate audio duration when loaded
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        // Update project with audio information
        setProject((prev) => ({
          ...prev,
          audio: {
            src: url,
            duration: audio.duration
          },
          updatedAt: new Date()
        }));
      });
      
      // Save API key to context
      setElevenLabsApiKey(apiKeyInput);
      
      // Mark this step as completed
      updateProgress("audio", true);
    } catch (error) {
      console.error("Error generating audio:", error);
      setError(`Failed to generate audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFetchVoices = async () => {
    if (!apiKeyInput) {
      setError("Please enter your ElevenLabs API key");
      return;
    }
    
    try {
      const elevenLabsService = new ElevenLabsService(apiKeyInput);
      const fetchedVoices = await elevenLabsService.getVoices();
      setVoices(fetchedVoices);
    } catch (error) {
      console.error("Error fetching voices:", error);
      // Fallback to default voices if API call fails
    }
  };

  const handleContinue = () => {
    setCurrentStep("visuals");
  };

  const handleGoBack = () => {
    setCurrentStep("script");
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Generate Audio Narration</CardTitle>
          <CardDescription>
            Convert your script into professional voiceover using ElevenLabs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key" className="flex items-center gap-2">
                ElevenLabs API Key
                <span className="text-xs text-muted-foreground">(Required for audio generation)</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Your ElevenLabs API key"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={handleFetchVoices}
                  disabled={!apiKeyInput}
                >
                  Load Voices
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your API key is only used in your browser and never stored on our servers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voice">Voice</Label>
                  <Select
                    value={audioSettings.voice}
                    onValueChange={(value) => setAudioSettings(prev => ({ ...prev, voice: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.voice_id} value={voice.voice_id}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select
                    value={audioSettings.model}
                    onValueChange={(value) => setAudioSettings(prev => ({ ...prev, model: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {MODELS.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="speed">
                    Speaking Speed: {audioSettings.speed.toFixed(1)}x
                  </Label>
                  <Slider
                    id="speed"
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    value={[audioSettings.speed]}
                    onValueChange={(value) => setAudioSettings(prev => ({ ...prev, speed: value[0] }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stability">
                    Stability: {audioSettings.stability.toFixed(2)}
                  </Label>
                  <Slider
                    id="stability"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[audioSettings.stability]}
                    onValueChange={(value) => setAudioSettings(prev => ({ ...prev, stability: value[0] }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clarity">
                    Clarity Boost: {audioSettings.clarity.toFixed(2)}
                  </Label>
                  <Slider
                    id="clarity"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[audioSettings.clarity]}
                    onValueChange={(value) => setAudioSettings(prev => ({ ...prev, clarity: value[0] }))}
                  />
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleGenerateAudio}
              disabled={isGenerating || !apiKeyInput}
              className="w-full mt-4"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Audio...
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Generate Audio Narration
                </>
              )}
            </Button>
            
            {audioUrl && (
              <div className="mt-6 p-4 border rounded-md bg-muted/20">
                <h3 className="font-medium mb-2">Audio Preview</h3>
                <audio 
                  ref={audioRef}
                  controls 
                  className="w-full" 
                  src={audioUrl}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            onClick={handleContinue} 
            disabled={!project.audio}
          >
            Continue to Visuals
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudioStep;
