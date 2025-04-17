
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      title: "AI Script Generation",
      description: "Transform your ideas into professionally structured scripts with our advanced AI technology.",
      icon: "📝"
    },
    {
      title: "Natural Voice Narration",
      description: "Convert your script to lifelike voice narration using state-of-the-art text-to-speech technology.",
      icon: "🔊"
    },
    {
      title: "Dynamic Visual Generation",
      description: "Our AI automatically selects or generates relevant visuals that perfectly match your script.",
      icon: "🖼️"
    },
    {
      title: "Automated Video Assembly",
      description: "Seamlessly combine audio and visuals with perfect timing, transitions, and effects.",
      icon: "🎬"
    },
    {
      title: "One-Click Export",
      description: "Export your finished videos in multiple formats and resolutions with a single click.",
      icon: "📤"
    },
    {
      title: "Project Management",
      description: "Save, organize, and revisit your video projects anytime for editing or reuse.",
      icon: "📁"
    }
  ];

  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Powerful Features</h1>
          <p className="text-xl text-muted-foreground">
            Discover how our AI-powered platform transforms video creation
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Enter Your Topic</h3>
                  <p className="text-muted-foreground">Start by entering the topic or idea for your video. Our AI will guide you through the rest.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Review & Edit Script</h3>
                  <p className="text-muted-foreground">Our AI generates a structured script that you can review and customize to your liking.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Generate Audio Narration</h3>
                  <p className="text-muted-foreground">Transform your script into natural-sounding narration with our text-to-speech technology.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Add Visuals</h3>
                  <p className="text-muted-foreground">Our AI automatically adds relevant images and video clips that enhance your message.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Export Your Video</h3>
                  <p className="text-muted-foreground">Preview your assembled video and export it in your preferred format and quality.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Video Creation?</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing">
              <Button size="lg">
                View Pricing
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg">
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Features;
