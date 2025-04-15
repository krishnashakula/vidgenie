
import React from "react";
import { CreationStep } from "@/types/video";
import { cn } from "@/lib/utils";

interface VideoCreationHeaderProps {
  currentStep: CreationStep;
  setStep: (step: CreationStep) => void;
  progress: Record<CreationStep, boolean>;
}

const steps: { step: CreationStep; label: string; icon: string }[] = [
  { step: "topic", label: "Topic", icon: "✏️" },
  { step: "script", label: "Script", icon: "📝" },
  { step: "audio", label: "Audio", icon: "🔊" },
  { step: "visuals", label: "Visuals", icon: "🖼️" },
  { step: "assembly", label: "Assembly", icon: "🎬" },
  { step: "rendering", label: "Export", icon: "📤" },
];

const VideoCreationHeader: React.FC<VideoCreationHeaderProps> = ({
  currentStep,
  setStep,
  progress,
}) => {
  return (
    <div className="w-full mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Quick Video Scribe
      </h1>
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        {steps.map(({ step, label, icon }, index) => {
          const isActive = currentStep === step;
          const isComplete = progress[step];
          const isClickable = isComplete || Object.entries(progress)
            .some(([key, value], idx) => {
              const stepIndex = steps.findIndex(s => s.step === step);
              return value && steps.findIndex(s => s.step === key) >= stepIndex - 1;
            });

          return (
            <React.Fragment key={step}>
              {index > 0 && (
                <div
                  className={cn(
                    "h-1 flex-1 mx-1",
                    isComplete || currentStep === steps[index].step
                      ? "bg-primary"
                      : "bg-gray-200"
                  )}
                />
              )}
              <button
                onClick={() => isClickable && setStep(step)}
                disabled={!isClickable}
                className={cn(
                  "flex flex-col items-center justify-center transition-all",
                  isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-lg mb-2 transition-all",
                    isActive
                      ? "bg-primary text-white shadow-lg scale-110"
                      : isComplete
                      ? "bg-primary/10 text-primary border border-primary"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  {icon}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary" : "text-gray-500"
                  )}
                >
                  {label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default VideoCreationHeader;
