import React, { useState, useEffect } from 'react';

interface GeneratingScreenProps {
  onComplete: () => void;
  storyTitle?: string;
}

export const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  onComplete,
  storyTitle = 'The Seven Kingdoms of Network City'
}) => {
  const [progress, setProgress] = useState(74);
  const [activeInsight, setActiveInsight] = useState<1 | 2>(1);
  const [notifyToggle, setNotifyToggle] = useState(true);

  // Smoothly increment progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, []);

  // Cycle insights
  useEffect(() => {
    const insightTimer = setInterval(() => {
      setActiveInsight(prev => (prev === 1 ? 2 : 1));
    }, 5500);

    return () => clearInterval(insightTimer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-xs pb-16">
      {/* Status Chip Pill */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant shadow-sm border border-surface-container-highest/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span className="font-label-sm text-label-sm tracking-wide uppercase font-semibold">
            Turning difficult topics into simple ideas...
          </span>
        </div>
      </div>

      {/* Hero Visual: AI Orb & Orbiting Concept Nodes */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center mb-4">
        {/* Ambient Core Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-secondary-container/20 to-tertiary-fixed/20 rounded-full blur-2xl animate-pulse"></div>

        {/* Outer Soft Rings */}
        <div className="absolute w-64 h-64 rounded-full bg-surface-container-low shadow-sm border border-surface-container-high/40 animate-spin" style={{ animationDuration: '40s' }}></div>
        <div className="absolute w-52 h-52 rounded-full bg-surface-container shadow-inner border border-surface-container-highest/60"></div>

        {/* Central Glowing Sphere / AI Core */}
        <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-primary to-primary-container p-1 shadow-2xl flex items-center justify-center transform transition-transform duration-700 hover:scale-105">
          <div className="w-full h-full rounded-full bg-surface-container-lowest/15 backdrop-blur-sm flex flex-col items-center justify-center text-on-primary">
            <span
              className="material-symbols-outlined text-4xl animate-bounce"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase opacity-95 mt-1 font-bold">
              Story Engine
            </span>
          </div>

          {/* Core Sparkle accents */}
          <span
            className="material-symbols-outlined absolute -top-1 -right-1 text-secondary-container text-2xl animate-spin"
            style={{ animationDuration: '9s' }}
          >
            arrow_back_ios_new
          </span>
          <span className="material-symbols-outlined absolute -bottom-2 -left-1 text-tertiary-fixed text-xl animate-pulse">
            star
          </span>
        </div>

        {/* Orbiting Knowledge Bubbles */}
        <div className="absolute top-4 left-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-md transform -rotate-3 hover:rotate-0 transition-transform border border-surface-container-high/60">
          <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          <span className="font-label-sm text-label-sm font-semibold">Physical Layer</span>
        </div>

        <div className="absolute top-6 right-1 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-md transform rotate-6 hover:rotate-0 transition-transform border border-surface-container-high/60">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          <span className="font-label-sm text-label-sm font-semibold">Error Checking</span>
        </div>

        <div className="absolute bottom-6 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-md transform rotate-2 hover:rotate-0 transition-transform border border-surface-container-high/60">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="font-label-sm text-label-sm font-semibold">Packets</span>
        </div>

        <div className="absolute bottom-4 right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-md transform -rotate-6 hover:rotate-0 transition-transform border border-surface-container-high/60">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm font-semibold">Data Link</span>
        </div>
      </div>

      {/* Screen Headline */}
      <div className="text-center mb-5">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-1">
          Your Learning Story Is Being Created...
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs mx-auto">
          Transforming dense lecture notes into an interactive chapter book.
        </p>
      </div>

      {/* Live Progress Bar Module */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-container-high/60 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Synthesis Speed
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-md text-headline-md text-primary font-bold">
              {progress}%
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Completed
            </span>
          </div>
        </div>

        {/* Shimmer Bar Track */}
        <div className="relative w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer light-leak effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-lowest/40 to-transparent -translate-x-full animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Dynamic Visual Pipeline Checklist */}
      <div className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center justify-between px-1">
          <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
            Transformation Pipeline
          </span>
          <span className="font-label-sm text-label-sm text-primary font-semibold">
            {progress >= 100 ? 'All Steps Complete' : 'Step 4 of 6 Active'}
          </span>
        </div>

        {/* Step 1: Complete */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 mt-0.5 font-bold">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Reading Material
              </span>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                Done
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant truncate">
              {storyTitle}.pdf (28 pages parsed)
            </p>
          </div>
        </div>

        {/* Step 2: Complete */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 mt-0.5 font-bold">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Understanding Concepts
              </span>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                Done
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant truncate">
              Identified core subject paradigms & protocols
            </p>
          </div>
        </div>

        {/* Step 3: Complete */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 mt-0.5 font-bold">
            <span className="material-symbols-outlined text-[18px]">check</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Finding Important Points
              </span>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                Done
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant truncate">
              Flagged 14 exam definitions & error checking equations
            </p>
          </div>
        </div>

        {/* Step 4: In Progress or Done */}
        <div className="relative overflow-hidden flex items-start gap-3 p-3.5 rounded-2xl bg-primary/5 shadow-md border border-primary/20">
          <div
            className={`w-7 h-7 rounded-full ${
              progress >= 85 ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-primary-container text-on-primary'
            } flex items-center justify-center shrink-0 mt-0.5`}
          >
            <span className={`material-symbols-outlined text-[18px] ${progress < 85 ? 'animate-spin' : ''}`}>
              {progress >= 85 ? 'check' : 'settings'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-primary font-bold">
                Creating Characters & Story
              </span>
              <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                {progress >= 85 ? 'Ready' : 'Building'}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface mt-0.5">
              Casting 'Detective Data Link' & 'Captain Physical'...
            </p>
          </div>
        </div>

        {/* Step 5: Queued or active */}
        <div
          className={`flex items-start gap-3 p-3.5 rounded-2xl ${
            progress >= 90
              ? 'bg-surface-container-lowest border border-surface-container-high/60 shadow-sm'
              : 'bg-surface-container opacity-70'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">
              {progress >= 95 ? 'check' : 'hourglass_empty'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
              Connecting Academic Concepts
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant/80 truncate">
              Mapping MAC framing to city border checkpoints
            </p>
          </div>
        </div>

        {/* Step 6: Queued or active */}
        <div
          className={`flex items-start gap-3 p-3.5 rounded-2xl ${
            progress >= 98
              ? 'bg-surface-container-lowest border border-surface-container-high/60 shadow-sm'
              : 'bg-surface-container opacity-70'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">
              {progress >= 100 ? 'check' : 'hourglass_empty'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
              Generating Your Learning Story
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant/80 truncate">
              Compiling chapters and audio narration voiceover
            </p>
          </div>
        </div>
      </div>

      {/* Rotating Motivational Insight Cards */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-surface-container-lowest to-surface-container p-4 rounded-2xl shadow-sm border border-surface-container-high/60 overflow-hidden">
          <span className="material-symbols-outlined absolute -bottom-4 -right-3 text-7xl text-primary/5 select-none pointer-events-none">
            psychology
          </span>

          {activeInsight === 1 ? (
            <div className="transition-opacity duration-500">
              <div className="flex items-center gap-2 mb-1.5 text-secondary">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                  Cognitive Science Fact
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Students remember narrative-structured concepts{' '}
                <span className="font-semibold text-primary">6.5x longer</span> than raw bullet points during finals exams!
              </p>
            </div>
          ) : (
            <div className="transition-opacity duration-500">
              <div className="flex items-center gap-2 mb-1.5 text-tertiary">
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  smart_toy
                </span>
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                  AI Story Studio Whisper
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Matching Layer 2 (Data Link) to a checkpoint inspector who inspects CRC checksum seals on cargo trucks...
              </p>
            </div>
          )}

          {/* Card indicator dots */}
          <div className="flex items-center gap-1.5 mt-3">
            <button
              onClick={() => setActiveInsight(1)}
              aria-label="Slide 1"
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeInsight === 1 ? 'w-5 bg-primary' : 'w-1.5 bg-surface-container-highest'
              }`}
            ></button>
            <button
              onClick={() => setActiveInsight(2)}
              aria-label="Slide 2"
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeInsight === 2 ? 'w-5 bg-primary' : 'w-1.5 bg-surface-container-highest'
              }`}
            ></button>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Status Shelf */}
      <div className="flex flex-col gap-4 bg-surface-container-low p-4 rounded-2xl border border-surface-container-high/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Hang tight! We're weaving academic precision with memorable characters.
          </p>
        </div>

        {/* Toggle Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/60">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Notify me when ready
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Receive a push notification when chapter 1 unlocks
            </span>
          </div>
          <button
            onClick={() => setNotifyToggle(!notifyToggle)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${
              notifyToggle ? 'bg-primary' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                notifyToggle ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            ></span>
          </button>
        </div>

        {/* Fast Action / Continue to Reader */}
        <button
          onClick={onComplete}
          className="w-full py-3 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <span>Open Chapter 2 in Story Reader</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
