
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for beginners and personal projects",
      price: "$9.99",
      period: "per month",
      features: [
        "5 videos per month",
        "720p video resolution",
        "Basic AI script generation",
        "3 AI voices",
        "Standard visual library",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "Ideal for content creators and small businesses",
      price: "$29.99",
      period: "per month",
      features: [
        "30 videos per month",
        "1080p video resolution",
        "Advanced AI script generation",
        "15+ AI voices",
        "Premium visual library",
        "Priority email support",
        "Remove watermark",
        "Custom branding"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Business",
      description: "For teams and large-scale video production",
      price: "$99.99",
      period: "per month",
      features: [
        "Unlimited videos",
        "4K video resolution",
        "Expert AI script generation",
        "30+ AI voices & custom voice cloning",
        "Unlimited access to all visuals",
        "Priority 24/7 support",
        "Remove watermark",
        "Custom branding",
        "API access",
        "Team collaboration tools"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your video creation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> {plan.period}</span>
                </div>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.buttonVariant} className="w-full">
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Do you offer a free trial?</h3>
                <p className="text-muted-foreground">We offer a 7-day free trial on our Basic and Pro plans so you can experience the full capabilities before committing.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and offer invoice payment options for Business plan customers.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll still have access to your plan features until the end of your current billing period.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Pricing;
