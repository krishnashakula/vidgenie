
import React from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import VideoCreationHeader from "@/components/video/VideoCreationHeader";
import TopicStep from "@/components/video/TopicStep";
import ScriptStep from "@/components/video/ScriptStep";
import AudioStep from "@/components/video/AudioStep";
import VisualsStep from "@/components/video/VisualsStep";
import AssemblyStep from "@/components/video/AssemblyStep";
import RenderingStep from "@/components/video/RenderingStep";
import Header from "@/components/layout/Header";

const Index = () => {
  const { currentStep, setCurrentStep, progress } = useVideoCreation();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "topic":
        return <TopicStep />;
      case "script":
        return <ScriptStep />;
      case "audio":
        return <AudioStep />;
      case "visuals":
        return <VisualsStep />;
      case "assembly":
        return <AssemblyStep />;
      case "rendering":
        return <RenderingStep />;
      default:
        return <TopicStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <VideoCreationHeader 
            currentStep={currentStep}
            setStep={setCurrentStep}
            progress={progress}
          />
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default Index;
