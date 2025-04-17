
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
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Sparkles, Clock, Users, Star, Award, TrendingUp, Crown, Gift, 
  Zap, BarChart, Share2, UserPlus, BadgeCheck, ShieldCheck, Hourglass, 
  CheckCircle, Play, ChevronRight, Lightbulb, PieChart, Briefcase, Video,
  ArrowUpRight, HelpCircle, FileText, Info, DollarSign, Mail, BookOpen
} from "lucide-react";
import GrowthMetrics from "@/components/growth/GrowthMetrics";
import TrendingVideos from "@/components/growth/TrendingVideos";
import LimitedTimeOffer from "@/components/growth/LimitedTimeOffer";
import { useNavigate, Link } from "react-router-dom";
import { CreationStep } from "@/types/video";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const { currentStep, setCurrentStep, progress, projects, user, resetProject } = useVideoCreation();
  const navigate = useNavigate();
  const [showingTrending, setShowingTrending] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(11); // FOMO trigger
  const [showReferralBanner, setShowReferralBanner] = useState(true);
  const [activeUsers, setActiveUsers] = useState(327);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      setActiveUsers(prev => Math.max(300, Math.min(450, prev + change)));
      
      if (Math.random() > 0.9) {
        setSlotsRemaining(prev => Math.max(2, prev - 1));
      }
    }, 5000);
    
    // Rotate testimonials
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => {
      clearInterval(interval);
      clearInterval(testimonialTimer);
    };
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <HeroSection 
          handleStartNewProject={handleStartNewProject} 
          setShowingTrending={setShowingTrending}
          slotsRemaining={slotsRemaining}
          activeUsers={activeUsers}
        />
        
        {showReferralBanner && (
          <div className="container mx-auto px-4 mb-12">
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center justify-between animate-fade-in">
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
          </div>
        )}

        <div className="container mx-auto px-4">
          <SiteNavigation />
          <GrowthMetrics />
          <LimitedTimeOffer />
          <FeaturesSection />
          <TestimonialsSection testimonialIndex={testimonialIndex} />
          {showingTrending && <TrendingVideos />}
          <PlatformStatsSection />
          <VideoTemplatesSection />
          <VideoAnalyticsFeature />
          <CallToActionSection handleStartNewProject={handleStartNewProject} />
          <RetentionFeatures />
          <FaqPreviewSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const HeroSection = ({ handleStartNewProject, setShowingTrending, slotsRemaining, activeUsers }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted/30 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4 animate-fade-in">
            <Star className="h-4 w-4 inline-block mr-1" /> Trusted by 10,000+ content creators
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 leading-tight animate-scale-in">
            Create Professional Videos <br className="hidden md:block" />in Minutes with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Generate studio-quality videos powered by advanced AI - <span className="font-medium text-foreground">no design skills required</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in">
            <Button 
              size="lg" 
              onClick={handleStartNewProject}
              className="text-lg gap-2 py-6 px-8 shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all"
            >
              Create Your First Video <ArrowRight className="h-5 w-5" />
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
          
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm mb-8 animate-fade-in">
            <div className="flex items-center">
              <Hourglass className="h-4 w-4 inline-block mr-1 text-amber-500" /> 
              Only <span className="text-amber-500 font-semibold">{slotsRemaining} slots</span> remaining today
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
              <span className="text-green-600 font-semibold">{activeUsers}</span> users online now
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 inline-block mr-1 text-primary" />
              <span className="font-medium">No credit card required</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Script Generation" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Professional Voiceovers" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "HD Video Rendering" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Smart Visuals" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Custom Branding" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Save Hours of Work" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Team Collaboration" },
              { icon: <CheckCircle className="h-4 w-4 text-primary" />, text: "Export in 4K" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm">
                {item.icon}
                <span className="text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card border shadow-xl rounded-xl overflow-hidden aspect-video">
            <div className="flex items-center justify-center h-full bg-muted/40">
              <Play className="h-16 w-16 text-primary opacity-70" />
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border shadow-lg rounded-full px-6 py-3 flex items-center gap-3 text-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border border-background flex items-center justify-center text-xs font-medium">
                  {i}
                </div>
              ))}
            </div>
            <span className="font-medium">3-step process</span>
            <span className="text-muted-foreground">|</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Ready in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SiteNavigation = () => {
  return (
    <div className="mb-16 py-8">
      <h2 className="text-xl font-medium text-center mb-8">Explore Our Platform</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { icon: <Info className="h-5 w-5" />, name: "About", path: "/about" },
          { icon: <Star className="h-5 w-5" />, name: "Features", path: "/features" },
          { icon: <DollarSign className="h-5 w-5" />, name: "Pricing", path: "/pricing" },
          { icon: <Mail className="h-5 w-5" />, name: "Contact", path: "/contact" },
          { icon: <BookOpen className="h-5 w-5" />, name: "Blog", path: "/blog" },
          { icon: <FileText className="h-5 w-5" />, name: "Terms", path: "/terms" },
          { icon: <ShieldCheck className="h-5 w-5" />, name: "Privacy", path: "/privacy" },
          { icon: <HelpCircle className="h-5 w-5" />, name: "FAQ", path: "/faq" },
        ].map((item, i) => (
          <Link 
            key={i}
            to={item.path}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-2">Enterprise-Grade Quality</Badge>
        <h2 className="text-3xl font-bold mb-4">
          Create Videos That <span className="text-primary">Convert</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered platform delivers professional results in minutes, not days
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI-Powered Scripts</h3>
          <p className="text-muted-foreground">
            Professional scripts written and optimized by our advanced AI. 
            Our script critic ensures perfect content every time.
          </p>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Save Hours of Work</h3>
          <p className="text-muted-foreground">
            What takes days with traditional tools takes minutes with our platform. 
            Complete videos ready in under 15 minutes.
          </p>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Built for Teams</h3>
          <p className="text-muted-foreground">
            Collaborate seamlessly with team members. Share projects
            and get feedback in real-time.
          </p>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Smart Suggestions</h3>
          <p className="text-muted-foreground">
            Our AI analyzes your content and provides intelligent recommendations 
            to enhance engagement and conversion rates.
          </p>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <PieChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
          <p className="text-muted-foreground">
            Track performance metrics and viewer engagement to optimize 
            your video content for maximum impact.
          </p>
        </div>
        
        <div className="bg-muted/40 rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-md">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
          <p className="text-muted-foreground">
            Scalable infrastructure designed for high-volume video production
            with advanced security and compliance features.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/features">
          <Button variant="outline" className="gap-2">
            Explore All Features <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const testimonials = [
  {
    quote: "This platform cut our video production time by 90%. What used to take us days now takes minutes. Game changer for our marketing team.",
    author: "Sarah K.",
    role: "Marketing Director",
    company: "TechGrowth Inc."
  },
  {
    quote: "The quality of the AI-generated scripts is outstanding. Our engagement rates increased by 47% after switching to videos made with this platform.",
    author: "Michael R.",
    role: "Content Creator",
    company: "CreativeSphere"
  },
  {
    quote: "As a non-designer, I never thought I could create professional videos. This tool makes it possible and the results look amazing!",
    author: "Alex T.",
    role: "Small Business Owner",
    company: "Boutique Solutions"
  },
  {
    quote: "We've seen a 3x increase in conversion rate since implementing videos created with this platform. The ROI is incredible.",
    author: "Jennifer L.",
    role: "E-commerce Director",
    company: "Retail Innovations"
  }
];

const TestimonialsSection = ({ testimonialIndex }) => {
  const testimonial = testimonials[testimonialIndex];
  
  return (
    <div className="mb-16 bg-muted/30 py-12 px-6 rounded-xl border border-border">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-2">Success Stories</Badge>
        <h2 className="text-3xl font-bold mb-4">
          Trusted by Creators <span className="text-primary">Everywhere</span>
        </h2>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-background p-8 rounded-lg border border-border relative mb-8">
          <div className="text-4xl text-primary/20 absolute top-4 left-4 font-serif">"</div>
          <p className="text-xl mb-6 text-center italic">
            {testimonial.quote}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-1">
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i === testimonialIndex ? 'bg-primary' : 'bg-primary/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlatformStatsSection = () => {
  return (
    <div className="mb-16 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { number: "10K+", label: "Videos Created", icon: <Video className="h-6 w-6 text-primary" /> },
          { number: "98%", label: "Customer Satisfaction", icon: <CheckCircle className="h-6 w-6 text-primary" /> },
          { number: "2.1M", label: "Minutes Saved", icon: <Clock className="h-6 w-6 text-primary" /> },
          { number: "300+", label: "Enterprise Clients", icon: <Briefcase className="h-6 w-6 text-primary" /> }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4">
            <div className="mb-2 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-1">{stat.number}</div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoTemplatesSection = () => {
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
          <div key={index} className="bg-background rounded-lg border border-border overflow-hidden group hover:border-primary/50 transition-all hover:shadow-md">
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

const VideoAnalyticsFeature = () => {
  return (
    <div className="mb-16 bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg border border-primary/20 p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <div className="inline-block bg-amber-500/20 text-amber-600 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <BadgeCheck className="h-4 w-4 inline-block mr-1" /> Professional Feature
          </div>
          <h3 className="text-2xl font-bold mb-3">Unlock Advanced Video Analytics</h3>
          <p className="text-muted-foreground mb-4">
            Track engagement, analyze viewer behavior, and optimize your videos for maximum conversion.
            Our enterprise-grade analytics help you make data-driven decisions.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {["Heatmaps", "Attention Tracking", "A/B Testing", "Conversion Metrics", "Viewer Demographics", "Engagement Scoring"].map((feature, i) => (
              <span key={i} className="bg-background/80 text-xs px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
          </div>
          <Button className="gap-2">
            <BarChart className="h-4 w-4" /> Activate Analytics
          </Button>
        </div>
        <div className="flex-1">
          <div className="bg-background border rounded-lg shadow-lg p-4 overflow-hidden">
            <div className="bg-muted h-40 rounded flex items-center justify-center">
              <BarChart className="h-12 w-12 text-muted-foreground/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CallToActionSection = ({ handleStartNewProject }) => {
  return (
    <div className="text-center py-16 px-8 bg-gradient-to-br from-primary/10 via-background to-indigo-500/10 rounded-xl border border-primary/20 mb-16">
      <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
        <Crown className="h-4 w-4 inline-block mr-1" /> Limited Availability
      </div>
      
      <h2 className="text-4xl font-bold mb-4">
        Elevate Your Content Strategy
      </h2>
      
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Join thousands of creators producing professional videos in minutes. Secure your access now.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={handleStartNewProject}
          className="text-lg gap-2 py-6 shadow-lg hover:shadow-primary/20"
        >
          Create Your First Video <ArrowRight className="h-5 w-5" />
        </Button>
        
        <Link to="/pricing">
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg gap-2 py-6"
          >
            View Pricing <DollarSign className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-8 flex justify-center">
        <Badge variant="outline" className="gap-1">
          <ShieldCheck className="h-4 w-4" /> 100% satisfaction guarantee
        </Badge>
      </div>
    </div>
  );
};

const RetentionFeatures = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <ShieldCheck className="h-5 w-5 inline-block mr-2 text-primary" />
        Platform Exclusives
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        <div className="bg-muted/30 p-6 rounded-lg border border-border">
          <div className="flex items-start gap-4">
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Creator Community</h3>
              <p className="text-muted-foreground mb-3">
                Connect with other video creators, share tips, and collaborate on projects.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowUpRight className="h-4 w-4" /> Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqPreviewSection = () => {
  return (
    <div className="mb-16 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Quick answers to common questions</p>
      </div>
      
      <div className="max-w-3xl mx-auto grid gap-4">
        {[
          { question: "What is AI Video Creator?", answer: "AI Video Creator is a platform that uses artificial intelligence to automate video creation. It helps you generate scripts, convert text to speech, select or generate visuals, and assemble complete videos with minimal effort." },
          { question: "Do I need technical skills to use the platform?", answer: "No, our platform is designed to be user-friendly for people of all skill levels. You simply input your topic and follow the step-by-step guide to create your video." },
          { question: "How long does it take to create a video?", answer: "Depending on the length and complexity, a video can be created in as little as 5 minutes. The AI works quickly to generate scripts and assemble content, saving you hours of manual work." },
        ].map((faq, i) => (
          <div key={i} className="bg-background border rounded-lg p-4">
            <h3 className="font-medium mb-2 flex items-center">
              <ChevronRight className="h-4 w-4 text-primary mr-2" />
              {faq.question}
            </h3>
            <p className="text-muted-foreground text-sm pl-6">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link to="/faq">
          <Button variant="outline" className="gap-2">
            View All FAQs <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;

