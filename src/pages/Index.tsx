
import React, { useState, useEffect } from "react";
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
import { ArrowRight, Sparkles, Clock, Users, Star, Award, TrendingUp, Crown, Gift, Zap, 
  BarChart, Share2, UserPlus, BadgeCheck, ShieldCheck, Hourglass } from "lucide-react";
import GrowthMetrics from "@/components/growth/GrowthMetrics";
import TrendingVideos from "@/components/growth/TrendingVideos";
import LimitedTimeOffer from "@/components/growth/LimitedTimeOffer";
import { useNavigate } from "react-router-dom";
import { CreationStep } from "@/types/video";

const Index = () => {
  const { currentStep, setCurrentStep, progress, projects, user, resetProject } = useVideoCreation();
  const navigate = useNavigate();
  const [showingTrending, setShowingTrending] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(11); // FOMO trigger
  const [showReferralBanner, setShowReferralBanner] = useState(true);
  const [activeUsers, setActiveUsers] = useState(327);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      setActiveUsers(prev => Math.max(300, Math.min(450, prev + change)));
      
      if (Math.random() > 0.9) {
        setSlotsRemaining(prev => Math.max(2, prev - 1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStartNewProject = () => {
    resetProject();
    setCurrentStep("topic");
  };

  const handleReferralClick = () => {
    navigate("/referrals");
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

  const isInVideoCreationFlow = currentStep !== null;
  
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4">
          {showReferralBanner && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Invite friends & earn 50 free renders</p>
                  <p className="text-sm text-muted-foreground">Get 5 renders for each friend who signs up</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={handleReferralClick}>
                  <Share2 className="h-4 w-4" /> Share
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowReferralBanner(false)}>
                  Dismiss
                </Button>
              </div>
            </div>
          )}
          
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500">
              Create Professional Videos in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Generate engaging videos powered by AI - no design skills required
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-muted-foreground mb-8">
              <div className="flex items-center">
                <Hourglass className="h-4 w-4 inline-block mr-1 text-amber-500" /> 
                Only <span className="text-amber-500 font-semibold">{slotsRemaining} slots</span> remaining today
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                <span className="text-green-600 font-semibold">{activeUsers}</span> users online now
              </div>
            </div>
            
            <GrowthMetrics />
          </div>

          <LimitedTimeOffer />
          
          <VideoCreationPsychTriggers />
          
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

          <VideoConversionBanner />
          
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

          <RetentionFeatures />
        </div>
      </div>
    </div>
  );
};

const VideoCreationPsychTriggers = () => {
  return (
    <div className="mb-16 bg-gradient-to-br from-muted/20 to-muted/40 p-6 rounded-xl border border-border">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <Zap className="h-6 w-6 text-amber-500" /> Trending AI Video Templates
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Product Showcase",
            views: "2.4K",
            conversion: "32%",
            tag: "High Converting",
            color: "bg-green-500"
          },
          {
            title: "Testimonial Compilation",
            views: "4.7K",
            conversion: "28%",
            tag: "Most Popular",
            color: "bg-blue-500"
          },
          {
            title: "Problem-Solution",
            views: "1.8K",
            conversion: "41%",
            tag: "New",
            color: "bg-purple-500"
          }
        ].map((template, index) => (
          <div key={index} className="bg-background rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all">
            <div className="h-40 bg-muted flex items-center justify-center relative">
              <div className="text-2xl">📹</div>
              <div className={`absolute top-2 right-2 ${template.color} text-white text-xs px-2 py-1 rounded-full`}>
                {template.tag}
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm">Use Template</Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{template.title}</h3>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{template.views} views</span>
                <span className="text-green-600">{template.conversion} conversion</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" /> View All Templates
        </Button>
      </div>
    </div>
  );
};

const VideoConversionBanner = () => {
  return (
    <div className="mb-16 bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg border border-primary/20 p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <div className="inline-block bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <BadgeCheck className="h-4 w-4 inline-block mr-1" /> Professional Feature
          </div>
          <h3 className="text-2xl font-bold mb-2">Unlock Advanced Video Analytics</h3>
          <p className="text-muted-foreground mb-4">
            Track engagement, analyze viewer behavior, and optimize your videos for maximum conversion.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Heatmaps", "Attention Tracking", "A/B Testing", "Conversion Metrics"].map((feature, i) => (
              <span key={i} className="bg-background/80 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0">
          <Button className="gap-2">
            <BarChart className="h-4 w-4" /> Activate Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

const RetentionFeatures = () => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <ShieldCheck className="h-5 w-5 inline-block mr-2 text-primary" />
        Platform Exclusives
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500/20 p-3 rounded-full">
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Creator Achievements</h3>
              <p className="text-muted-foreground mb-3">
                Earn badges and unlock special features as you create more videos.
              </p>
              <div className="flex gap-2">
                {["Beginner", "Intermediate", "Professional"].map((level, i) => (
                  <div key={i} className={`text-xs px-2 py-1 rounded-full ${i === 0 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {level}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Weekly Bonus Credits</h3>
              <p className="text-muted-foreground mb-3">
                Log in weekly to claim bonus rendering credits and template access.
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Gift className="h-4 w-4" /> Claim This Week's Bonus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
