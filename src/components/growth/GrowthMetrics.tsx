
import React from "react";
import { Users, Video, Award, Clock } from "lucide-react";

const GrowthMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-4">
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">10,000+</div>
        <div className="text-sm text-muted-foreground">Active Users</div>
      </div>
      
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <Video className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">50,000+</div>
        <div className="text-sm text-muted-foreground">Videos Created</div>
      </div>
      
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <Award className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">4.9/5</div>
        <div className="text-sm text-muted-foreground">Average Rating</div>
      </div>
      
      <div className="flex flex-col items-center p-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <div className="text-2xl font-bold">10 mins</div>
        <div className="text-sm text-muted-foreground">Avg. Production Time</div>
      </div>
    </div>
  );
};

export default GrowthMetrics;
