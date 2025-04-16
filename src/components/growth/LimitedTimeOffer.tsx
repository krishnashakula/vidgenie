
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, CheckCircle } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";

const LimitedTimeOffer: React.FC = () => {
  // In a real implementation, this would come from your backend or be stored in localStorage
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
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
    
    return () => clearInterval(timer);
  }, []);
  
  const { resetProject } = useVideoCreation();
  
  const handleClaimOffer = () => {
    resetProject();
    // In a real implementation, you would apply the special offer to the user's account
  };

  return (
    <Card className="mb-16 border-primary/30 bg-primary/5 overflow-hidden">
      <div className="absolute top-0 right-0">
        <Badge variant="destructive" className="rounded-none rounded-bl-lg px-3 py-1">
          <Clock className="h-3 w-3 mr-1" /> Limited Time
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
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <div className="text-sm text-muted-foreground mb-1">Offer expires in:</div>
              <div className="flex gap-2 text-lg font-mono">
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.hours.toString().padStart(2, '0')}</div>
                <div>:</div>
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.minutes.toString().padStart(2, '0')}</div>
                <div>:</div>
                <div className="bg-primary/10 rounded px-2 py-1 min-w-[40px]">{timeRemaining.seconds.toString().padStart(2, '0')}</div>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">
                <span className="line-through text-muted-foreground mr-2">$49</span>
                <span className="text-3xl">$29</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Save 40% for a limited time
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="gap-2"
              onClick={handleClaimOffer}
            >
              Claim This Offer <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LimitedTimeOffer;
