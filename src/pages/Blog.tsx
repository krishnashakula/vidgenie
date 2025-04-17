
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    id: "1",
    title: "The Future of Video Creation: How AI is Transforming the Industry",
    excerpt: "Discover how artificial intelligence is revolutionizing video production, making it faster, cheaper, and more accessible than ever before.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
    date: "April 12, 2025",
    readTime: "6 min read",
    author: "Sarah Chen",
    category: "Technology"
  };

  const posts = [
    {
      id: "2",
      title: "5 Ways AI Videos Are Boosting Marketing ROI",
      excerpt: "Learn how businesses are leveraging AI-generated videos to increase engagement and conversion rates in their marketing campaigns.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400",
      date: "April 5, 2025",
      readTime: "4 min read",
      author: "Michael Rodriguez",
      category: "Marketing"
    },
    {
      id: "3",
      title: "Creating Educational Content with AI: A Teacher's Guide",
      excerpt: "How educators are using AI video tools to create engaging learning materials for students of all ages.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=400",
      date: "March 28, 2025",
      readTime: "5 min read",
      author: "Dr. Emily Wong",
      category: "Education"
    },
    {
      id: "4",
      title: "Voice Technology in 2025: Beyond Text-to-Speech",
      excerpt: "Explore the latest advancements in voice synthesis and how they're creating more natural and expressive AI narrations.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400",
      date: "March 20, 2025",
      readTime: "7 min read",
      author: "James Wilson",
      category: "Technology"
    },
    {
      id: "5",
      title: "How Small Businesses Can Compete with Video Marketing",
      excerpt: "A complete guide for small business owners to leverage AI video tools for creating professional marketing content on a budget.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", 
      date: "March 15, 2025",
      readTime: "6 min read",
      author: "Alex Johnson",
      category: "Business"
    },
    {
      id: "6",
      title: "The Ethics of AI-Generated Media: Navigating the New Frontier",
      excerpt: "Examining the ethical considerations and best practices for creating and sharing AI-generated video content.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400",
      date: "March 8, 2025",
      readTime: "8 min read",
      author: "Dr. Amara Patel",
      category: "Ethics"
    }
  ];

  // In a real app, you'd fetch this from your backend
  const categories = [
    "All", "Technology", "Marketing", "Education", "Business", "Ethics", "Tutorials"
  ];

  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground">
            Insights, guides, and news from the world of AI video creation
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-muted-foreground">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{featuredPost.author}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="h-48">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button variant="outline">
            Load More Articles
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Blog;
