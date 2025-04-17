
import React, { useState } from "react";
import { Link } from "react-router-dom";  // Add this import
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "General",
      questions: [
        {
          id: "1",
          question: "What is AI Video Creator?",
          answer: "AI Video Creator is a platform that uses artificial intelligence to automate video creation. It helps you generate scripts, convert text to speech, select or generate visuals, and assemble complete videos with minimal effort."
        },
        {
          id: "2",
          question: "Do I need technical skills to use the platform?",
          answer: "No, our platform is designed to be user-friendly for people of all skill levels. You simply input your topic and follow the step-by-step guide to create your video."
        },
        {
          id: "3",
          question: "How long does it take to create a video?",
          answer: "Depending on the length and complexity, a video can be created in as little as 5 minutes. The AI works quickly to generate scripts and assemble content, saving you hours of manual work."
        },
        {
          id: "4",
          question: "What types of videos can I create?",
          answer: "You can create a wide range of videos including educational content, marketing videos, product demos, explainers, social media content, presentations, and more."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          id: "5",
          question: "What video formats and resolutions are supported?",
          answer: "We support standard video formats including MP4, MOV, and WebM. Resolution options range from 720p to 4K, depending on your subscription plan."
        },
        {
          id: "6",
          question: "Can I edit the videos after they're generated?",
          answer: "Yes, you can edit any part of the video generation process including the script, audio, visuals, and assembly. Once the final video is rendered, you can download it and make additional edits in your preferred video editing software."
        },
        {
          id: "7",
          question: "Is there a limit on video length?",
          answer: "Video length limits depend on your subscription plan. The Basic plan allows videos up to 3 minutes, Pro plan up to 10 minutes, and Business plan up to 30 minutes."
        },
        {
          id: "8",
          question: "What languages are supported?",
          answer: "Our platform currently supports English, Spanish, French, German, Italian, Portuguese, Chinese, and Japanese for script generation and voice narration."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          id: "9",
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period."
        },
        {
          id: "10",
          question: "Do you offer refunds?",
          answer: "We offer a 7-day money-back guarantee for new subscriptions. If you're not satisfied with our service, contact our support team within 7 days of your purchase for a full refund."
        },
        {
          id: "11",
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes, you can change your plan at any time. When you upgrade, the new features become available immediately and we prorate the cost. When you downgrade, the changes take effect at the start of your next billing cycle."
        },
        {
          id: "12",
          question: "Do you offer team accounts?",
          answer: "Yes, our Business plan includes team collaboration features. You can add team members, assign roles, and work together on video projects."
        }
      ]
    },
    {
      category: "Content & Licensing",
      questions: [
        {
          id: "13",
          question: "Who owns the videos I create?",
          answer: "You retain full ownership of all videos created using our platform. You're free to use them for personal or commercial purposes according to our Terms of Service."
        },
        {
          id: "14",
          question: "Can I use the videos commercially?",
          answer: "Yes, all videos created on our platform can be used for commercial purposes. This includes marketing, advertising, and sales content for your business."
        },
        {
          id: "15",
          question: "What about copyright for images and music?",
          answer: "Our platform includes a library of licensed stock images, videos, and music that are cleared for commercial use. If you upload your own assets, you are responsible for ensuring you have the proper rights to use them."
        },
        {
          id: "16",
          question: "Is there a watermark on the videos?",
          answer: "Free trials and the Basic plan include a small watermark. The Pro and Business plans allow you to remove watermarks and add your own branding."
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
             faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our platform
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredFaqs.length > 0 ? (
          <>
            {filteredFaqs.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
            <Button 
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        )}

        <div className="max-w-2xl mx-auto text-center mt-16 bg-card border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="mailto:support@aivideoai.com">Email Us</a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Faq;
