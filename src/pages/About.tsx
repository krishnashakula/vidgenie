
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground">
            We're revolutionizing video creation with AI technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                Founded in 2023, AI Video Creator began with a simple mission: to democratize professional video creation for everyone. Our team of AI experts, video professionals, and software engineers came together with a shared vision of making high-quality video production accessible, affordable, and effortless.
              </p>
              <p className="mb-4">
                What started as a small startup has quickly grown into a leading platform trusted by content creators, marketers, educators, and businesses worldwide. We're proud to have helped thousands of users transform their ideas into compelling videos without the need for specialized skills or expensive equipment.
              </p>
              <p>
                Today, we continue to push the boundaries of what's possible with AI-driven video creation, constantly improving our technology and expanding our offerings to meet the evolving needs of our diverse user base.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="prose max-w-none">
              <p>
                We believe that everyone should have the power to create professional-quality videos, regardless of their technical skills or budget. Our mission is to remove the barriers to video creation by leveraging the latest advances in artificial intelligence, making it possible for anyone to produce engaging video content in minutes rather than days.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Innovation</h3>
                  <p>We constantly push the boundaries of what's possible with AI and video technology.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Accessibility</h3>
                  <p>We strive to make our platform accessible to creators of all skill levels and backgrounds.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">Quality</h3>
                  <p>We're committed to delivering professional-quality results that exceed expectations.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">User-Centric</h3>
                  <p>We put our users first in everything we do, from product design to customer support.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-bold">Alex Johnson</h3>
                <p className="text-muted-foreground">CEO & Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👩‍💼</span>
                </div>
                <h3 className="text-xl font-bold">Sarah Chen</h3>
                <p className="text-muted-foreground">CTO & Co-Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍🎨</span>
                </div>
                <h3 className="text-xl font-bold">Michael Rodriguez</h3>
                <p className="text-muted-foreground">Head of Product</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
