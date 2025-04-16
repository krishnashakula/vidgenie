
import React, { useState } from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import VideoCreationHeader from "@/components/video/VideoCreationHeader";
import TopicStep from "@/components/video/TopicStep";
import ScriptStep from "@/components/video/ScriptStep";
import AudioStep from "@/components/video/AudioStep";
import VisualsStep from "@/components/video/VisualsStep";
import AssemblyStep from "@/components/video/AssemblyStep";
import RenderingStep from "@/components/video/RenderingStep";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Users, Star, Award, TrendingUp, Crown } from "lucide-react";
import GrowthMetrics from "@/components/growth/GrowthMetrics";
import TrendingVideos from "@/components/growth/TrendingVideos";
import LimitedTimeOffer from "@/components/growth/LimitedTimeOffer";
import { useNavigate } from "react-router-dom";
import { CreationStep } from "@/types/video";

const Index = () => {
  const { currentStep, setCurrentStep, progress, projects, user, resetProject } = useVideoCreation();
  const navigate = useNavigate();
  const [showingTrending, setShowingTrending] = useState(false);

  const handleStartNewProject = () => {
    resetProject();
    setCurrentStep("topic");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "topic":
        return <TopicStep />;
      case "script":
        return <ScriptStep />;
      case "audio":
        return <AudioStep />;
      case "visuals":
        return <VisualsStep />;
      case "assembly":
        return <AssemblyStep />;
      case "rendering":
        return <RenderingStep />;
      default:
        return <TopicStep />;
    }
  };

  // Check if we're in the video creation flow
  const isInVideoCreationFlow = currentStep && currentStep !== null;
  
  if (isInVideoCreationFlow) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1">
          <div className="container mx-auto py-8 px-4">
            <VideoCreationHeader 
              currentStep={currentStep}
              setStep={setCurrentStep}
              progress={progress}
            />
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    );
  }

  // Home page view
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Create Professional Videos in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate engaging videos powered by AI - no design skills required
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                onClick={handleStartNewProject}
                className="text-lg gap-2 py-6"
              >
                Create New Video <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg gap-2 py-6"
                onClick={() => setShowingTrending(true)}
              >
                View Trending Videos <TrendingUp className="h-5 w-5" />
              </Button>
            </div>
            
            <GrowthMetrics />
          </div>

          <LimitedTimeOffer />
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Create Videos That <span className="text-primary">Convert</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-muted/40 rounded-lg p-6 border border-border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Scripts</h3>
                <p className="text-muted-foreground">
                  Professional scripts written and optimized by our advanced AI. 
                  Our script critic ensures perfect content every time.
                </p>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-6 border border-border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Save Hours of Work</h3>
                <p className="text-muted-foreground">
                  What takes days with traditional tools takes minutes with our platform. 
                  Complete videos ready in under 15 minutes.
                </p>
              </div>
              
              <div className="bg-muted/40 rounded-lg p-6 border border-border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Built for Teams</h3>
                <p className="text-muted-foreground">
                  Collaborate seamlessly with team members. Share projects
                  and get feedback in real-time.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16 bg-muted/30 py-12 px-6 rounded-xl border border-border">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Trusted by Creators <span className="text-primary">Everywhere</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "This platform cut our video production time by 90%. What used to take us days
                  now takes minutes. Game changer for our marketing team."
                </p>
                <div className="font-medium">Sarah K. - Marketing Director</div>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The quality of the AI-generated scripts is outstanding. Our engagement rates
                  increased by 47% after switching to videos made with this platform."
                </p>
                <div className="font-medium">Michael R. - Content Creator</div>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a non-designer, I never thought I could create professional videos.
                  This tool makes it possible and the results look amazing!"
                </p>
                <div className="font-medium">Alex T. - Small Business Owner</div>
              </div>
            </div>
          </div>
          
          {showingTrending && <TrendingVideos />}
          
          <div className="text-center py-10 px-6 bg-primary/10 rounded-xl border border-primary/20 mb-12">
            <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Crown className="h-4 w-4 inline-block mr-1" /> Limited Availability
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              Get Started While Premium Slots Last
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're limiting new users to ensure quality. Join now to secure your spot.
            </p>
            
            <Button 
              size="lg" 
              onClick={handleStartNewProject}
              className="text-lg gap-2 py-6"
            >
              Create Your First Video <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
