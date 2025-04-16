
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, CheckCircle, Users, Lock, Sparkles, Crown } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const LimitedTimeOffer: React.FC = () => {
  // In a real implementation, this would come from your backend or be stored in localStorage
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  const [claimersCount, setClaimersCount] = useState(89);
  const [maxClaimers, setMaxClaimers] = useState(100);
  const [claimed, setClaimed] = useState(false);
  const { toast } = useToast();
  
  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    // Simulate periodic claimer increases (social proof)
    const claimerTimer = setInterval(() => {
      if (claimersCount < maxClaimers - 1) {
        setClaimersCount(prev => prev + 1);
      }
    }, 30000); // Update every 30 seconds
    
    return () => {
      clearInterval(timer);
      clearInterval(claimerTimer);
    };
  }, [claimersCount, maxClaimers]);
  
  const { resetProject } = useVideoCreation();
  
  const handleClaimOffer = () => {
    setClaimed(true);
    setClaimersCount(prev => prev + 1);
    // In a real implementation, you would apply the special offer to the user's account
    toast({
      title: "Premium Offer Claimed!",
      description: "You've successfully activated your premium package.",
      duration: 5000,
    });
  };

  const progressPercentage = (claimersCount / maxClaimers) * 100;

  return (
    <Card className="mb-16 border-primary/30 bg-gradient-to-br from-primary/5 to-indigo-400/5 overflow-hidden relative animate-scale-in">
      {/* Live viewers indicator - Social proof trigger */}
      <div className="absolute top-3 right-3">
        <Badge variant="outline" className="gap-1 border-amber-500/50 bg-amber-500/10 text-amber-600">
          <Users className="h-3 w-3 animate-pulse" /> 
          {214 + Math.floor(Math.random() * 20)} people viewing this offer
        </Badge>
      </div>
      
      <div className="absolute top-0 right-0">
        <Badge variant="destructive" className="rounded-none rounded-bl-lg px-3 py-1">
          <Clock className="h-3 w-3 mr-1 animate-pulse" /> Limited Time
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Zap className="h-6 w-6 text-yellow-500" /> Special Launch Offer
        </CardTitle>
        <CardDescription>
          Get premium features at a special introductory price
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">
              Unlock Premium Features
            </h3>
            <ul className="space-y-3">
              {[
                "Unlimited HD video renders",
                "Priority processing queue",
                "Advanced script critic",
                "Premium voiceover options",
                "Branding removal",
                "Priority support"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 bg-background/40 rounded-lg p-4 border border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> People claimed this offer
                </span>
                <span className="font-medium">{claimersCount}/{maxClaimers}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {maxClaimers - claimersCount} spots remaining at this price
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-4 bg-background/60 px-6 py-4 rounded-lg border border-border">
              <div className="text-sm text-muted-foreground mb-1">Offer expires in:</div>
              <div className="flex gap-2 text-lg font-mono">
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.hours.toString().padStart(2, '0')}</div>
                <div>:</div>
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
                <div>:</div>
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-2xl font-bold">
                <span className="line-through text-muted-foreground mr-2">$49</span>
                <span className="text-3xl">$29</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="text-sm text-primary">
                Save 40% for a limited time
              </div>
              <div className="flex items-center gap-1 justify-center mt-1">
                <Crown className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-amber-600">Best value</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="gap-2 relative overflow-hidden group w-full"
              onClick={handleClaimOffer}
              disabled={claimed}
            >
              {claimed ? (
                <>
                  <CheckCircle className="h-4 w-4" /> Offer Claimed
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Claim This Offer
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
                </>
              )}
            </Button>
            
            {!claimed && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Secure checkout
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LimitedTimeOffer;
