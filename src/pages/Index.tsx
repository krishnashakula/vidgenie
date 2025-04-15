
import React from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import VideoCreationHeader from "@/components/video/VideoCreationHeader";
import TopicStep from "@/components/video/TopicStep";
import ScriptStep from "@/components/video/ScriptStep";
import AudioStep from "@/components/video/AudioStep";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <VideoCreationHeader 
          currentStep={currentStep}
          setStep={setCurrentStep}
          progress={progress}
        />
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default Index;
