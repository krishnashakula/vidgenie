
import React from "react";
import { useVideoCreation } from "@/context/VideoCreationContext";
import VideoCreationHeader from "./VideoCreationHeader";
import TopicStep from "./TopicStep";
import ScriptStep from "./ScriptStep";
import AudioStep from "./AudioStep";

const VideoCreationLayout: React.FC = () => {
  const { currentStep, setCurrentStep, progress } = useVideoCreation();

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case "topic":
        return <TopicStep />;
      case "script":
        return <ScriptStep />;
      case "audio":
        return <AudioStep />;
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <VideoCreationHeader
          currentStep={currentStep}
          setStep={setCurrentStep}
          progress={progress}
        />
        {renderStep()}
      </div>
    </div>
  );
};

export default VideoCreationLayout;
