
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, Share2, Eye, Clock, Bookmark, ThumbsUp } from "lucide-react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import { useToast } from "@/components/ui/use-toast";

// Sample trending videos data (in a real implementation, this would come from your backend)
const TRENDING_VIDEOS = [
  {
    id: "trend-1",
    title: "10 Ways to Boost Your Marketing with AI",
    views: "14.2K",
    likes: 823,
    creator: "Marketing Insights",
    thumbnail: "https://placehold.co/600x400/3b82f6/ffffff?text=Marketing+AI",
    createdAt: "3 hours ago",
    category: "Marketing"
  },
  {
    id: "trend-2",
    title: "The Future of Remote Work",
    views: "9.8K",
    likes: 612,
    creator: "Future Trends",
    thumbnail: "https://placehold.co/600x400/10b981/ffffff?text=Remote+Work",
    createdAt: "6 hours ago",
    category: "Business"
  },
  {
    id: "trend-3",
    title: "Learn Python in 10 Minutes",
    views: "22.5K",
    likes: 1240,
    creator: "Code Masters",
    thumbnail: "https://placehold.co/600x400/8b5cf6/ffffff?text=Python+Tutorial",
    createdAt: "1 day ago",
    category: "Education"
  },
  {
    id: "trend-4",
    title: "Healthy Meal Prep Ideas",
    views: "7.3K",
    likes: 521,
    creator: "Healthy Living",
    thumbnail: "https://placehold.co/600x400/f97316/ffffff?text=Meal+Prep",
    createdAt: "2 days ago",
    category: "Health"
  },
  {
    id: "trend-5",
    title: "5 Minute Meditation for Focus",
    views: "12.9K",
    likes: 894,
    creator: "Mindful Moments",
    thumbnail: "https://placehold.co/600x400/ec4899/ffffff?text=Meditation",
    createdAt: "3 days ago",
    category: "Health"
  },
  {
    id: "trend-6",
    title: "Home Office Setup Guide",
    views: "8.7K",
    likes: 734,
    creator: "Productivity Pro",
    thumbnail: "https://placehold.co/600x400/6366f1/ffffff?text=Home+Office",
    createdAt: "4 days ago",
    category: "Lifestyle"
  }
];

const TrendingVideos: React.FC = () => {
  const { resetProject, setCurrentStep } = useVideoCreation();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("trending");
  
  const filters = ["All", "Marketing", "Business", "Education", "Health", "Lifestyle"];
  
  const handleGetInspired = (title: string) => {
    resetProject();
    setCurrentStep("topic");
    // In a real implementation, you would set the topic based on the trending video
    toast({
      title: "Template Selected",
      description: `Using "${title}" as inspiration for your new video.`,
      duration: 3000,
    });
  };
  
  const handleShareVideo = (videoId: string) => {
    // In a real implementation, this would open a share dialog
    toast({
      title: "Share Video",
      description: "Sharing options will be available in the full version.",
      duration: 3000,
    });
  };
  
  const handleBookmarkVideo = (videoId: string) => {
    toast({
      title: "Video Bookmarked",
      description: "This video has been added to your bookmarks.",
      duration: 3000,
    });
  };

  return (
    <div className="mb-16 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Trending Videos</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="px-3 py-1 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Updated hourly
          </Badge>
          <div className="flex">
            <Button variant="ghost" size="sm" className={sortBy === "trending" ? "bg-muted" : ""} 
              onClick={() => setSortBy("trending")}>
              Trending
            </Button>
            <Button variant="ghost" size="sm" className={sortBy === "newest" ? "bg-muted" : ""} 
              onClick={() => setSortBy("newest")}>
              Newest
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button 
            key={filter} 
            variant={activeFilter === filter ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRENDING_VIDEOS.map((video) => (
          <Card key={video.id} className="overflow-hidden group hover:border-primary/50 transition-all">
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
              <div className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
                {video.category}
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {video.views} views
              </div>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {video.createdAt}
              </div>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>{video.creator}</span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" /> {video.likes}
                </span>
              </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleGetInspired(video.title)}
              >
                Get Inspired
              </Button>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleBookmarkVideo(video.id)}>
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleShareVideo(video.id)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" /> Load More Trending Videos
        </Button>
      </div>
    </div>
  );
};

export default TrendingVideos;
