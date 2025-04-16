
import React, { useState, useEffect } from "react";
import { Users, Video, Award, Clock } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";

const GrowthMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: 10000,
    videosCreated: 50000,
    averageRating: 4.9,
    avgProductionTime: 10
  });
  
  const [animatedMetrics, setAnimatedMetrics] = useState({
    activeUsers: 10000,
    videosCreated: 50000,
    averageRating: 4.9,
    avgProductionTime: 10
  });

  // Initialize metrics from the analytics service
  useEffect(() => {
    const growthData = analyticsService.getGrowthMetrics();
    setMetrics(growthData);
    setAnimatedMetrics({
      activeUsers: 0,
      videosCreated: 0,
      averageRating: 0,
      avgProductionTime: 0
    });
  }, []);
  
  // Animate the metrics counting up
  useEffect(() => {
    const duration = 1500; // Animation duration in milliseconds
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (progress >= 1) {
        setAnimatedMetrics(metrics);
        clearInterval(timer);
        return;
      }
      
      setAnimatedMetrics({
        activeUsers: Math.round(progress * metrics.activeUsers),
        videosCreated: Math.round(progress * metrics.videosCreated),
        averageRating: parseFloat((progress * metrics.averageRating).toFixed(1)),
        avgProductionTime: Math.round(progress * metrics.avgProductionTime)
      });
    }, 1000 / framesPerSecond);
    
    return () => clearInterval(timer);
  }, [metrics]);
  
  // Simulate real-time updates with slight variations
  useEffect(() => {
    const liveUpdateInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        videosCreated: prev.videosCreated + Math.floor(Math.random() * 10),
      }));
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(liveUpdateInterval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-4">
      <div className="flex flex-col items-center p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:border-primary/30 group">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">
          {animatedMetrics.activeUsers.toLocaleString()}+
        </div>
        <div className="text-sm text-muted-foreground">Active Users</div>
      </div>
      
      <div className="flex flex-col items-center p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:border-primary/30 group">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
          <Video className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">
          {animatedMetrics.videosCreated.toLocaleString()}+
        </div>
        <div className="text-sm text-muted-foreground">Videos Created</div>
      </div>
      
      <div className="flex flex-col items-center p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:border-primary/30 group">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">
          {animatedMetrics.averageRating.toFixed(1)}/5
        </div>
        <div className="text-sm text-muted-foreground">Average Rating</div>
      </div>
      
      <div className="flex flex-col items-center p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/80 transition-all hover:border-primary/30 group">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2 group-hover:bg-primary/20 transition-colors">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">
          {animatedMetrics.avgProductionTime} mins
        </div>
        <div className="text-sm text-muted-foreground">Avg. Production Time</div>
      </div>
    </div>
  );
};

export default GrowthMetrics;
