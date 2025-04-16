
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, Share2, Eye } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";

// Sample trending videos data (in a real implementation, this would come from your backend)
const TRENDING_VIDEOS = [
  {
    id: "trend-1",
    title: "10 Ways to Boost Your Marketing with AI",
    views: "14.2K",
    likes: 823,
    creator: "Marketing Insights",
    thumbnail: "https://placehold.co/600x400/3b82f6/ffffff?text=Marketing+AI"
  },
  {
    id: "trend-2",
    title: "The Future of Remote Work",
    views: "9.8K",
    likes: 612,
    creator: "Future Trends",
    thumbnail: "https://placehold.co/600x400/10b981/ffffff?text=Remote+Work"
  },
  {
    id: "trend-3",
    title: "Learn Python in 10 Minutes",
    views: "22.5K",
    likes: 1240,
    creator: "Code Masters",
    thumbnail: "https://placehold.co/600x400/8b5cf6/ffffff?text=Python+Tutorial"
  },
  {
    id: "trend-4",
    title: "Healthy Meal Prep Ideas",
    views: "7.3K",
    likes: 521,
    creator: "Healthy Living",
    thumbnail: "https://placehold.co/600x400/f97316/ffffff?text=Meal+Prep"
  },
  {
    id: "trend-5",
    title: "5 Minute Meditation for Focus",
    views: "12.9K",
    likes: 894,
    creator: "Mindful Moments",
    thumbnail: "https://placehold.co/600x400/ec4899/ffffff?text=Meditation"
  },
  {
    id: "trend-6",
    title: "Home Office Setup Guide",
    views: "8.7K",
    likes: 734,
    creator: "Productivity Pro",
    thumbnail: "https://placehold.co/600x400/6366f1/ffffff?text=Home+Office"
  }
];

const TrendingVideos: React.FC = () => {
  const { resetProject } = useVideoCreation();

  const handleGetInspired = (title: string) => {
    resetProject();
    // In a real implementation, you would set the topic based on the trending video
    // For now, we just reset the project
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending Videos</h2>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          Updated hourly
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRENDING_VIDEOS.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="aspect-video bg-muted relative group">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="ghost" size="icon" className="rounded-full bg-background/20 hover:bg-background/40">
                  <Play className="h-8 w-8" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.views} views
              </div>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              <CardDescription>{video.creator}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleGetInspired(video.title)}
              >
                Get Inspired
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingVideos;
