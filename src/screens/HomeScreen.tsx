import React from 'react';
import { ASSETS } from '../data/assets';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  onOpenStory: (storyId?: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenStory }) => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-sm pb-28">
      {/* Hero Section */}
      <section className="pt-space-md pb-space-lg flex flex-col items-center text-center relative overflow-hidden">
        {/* Pulsating Sparkle Badge */}
        <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high shadow-sm mb-space-md animate-pulse border border-surface-container-highest/60">
          <span
            className="material-symbols-outlined text-secondary text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_awesome
          </span>
          <span className="font-label-sm text-label-sm text-secondary tracking-wide">
            ✨ New Way To Study Academic Subjects
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface mb-space-sm max-w-[340px]">
          Turn Your Study Material Into a <span className="text-primary-container">Story.</span>
        </h1>

        {/* Subheading */}
        <p className="font-body-md text-body-md text-on-surface-variant max-w-[350px] mb-space-lg">
          Upload your notes, PDFs, or YouTube lectures and let AI transform difficult concepts into creative stories that are easier to understand and remember.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col w-full gap-space-sm max-w-[340px] mb-space-xl">
          <button
            onClick={() => onNavigate('create')}
            className="w-full h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0px_8px_24px_-4px_rgba(79,57,246,0.35)] transition-all active:scale-95 hover:shadow-[0px_12px_28px_-4px_rgba(79,57,246,0.45)] cursor-pointer"
          >
            <span>Create My Learning Story</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
          <button
            onClick={() => onOpenStory('story-osi')}
            className="w-full h-12 py-3 px-6 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[20px] text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_circle
            </span>
            <span>See How It Works</span>
          </button>
        </div>

        {/* Interactive Flow Transformation Card */}
        <div
          onClick={() => onOpenStory('story-osi')}
          className="w-full max-w-[370px] bg-surface-container-lowest rounded-2xl p-space-md shadow-[0px_12px_32px_-4px_rgba(79,57,246,0.10)] border border-surface-container-high/60 relative text-left cursor-pointer hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center justify-between pb-space-sm mb-space-sm bg-surface-container-low px-3 py-2 rounded-xl">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Live Transformation Pipeline
            </span>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
              Ready to Convert
            </span>
          </div>

          {/* Step Sequence Row */}
          <div className="space-y-space-sm">
            {/* Input Layer */}
            <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                </div>
                <div className="w-9 h-9 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">smart_display</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate">Lecture 04 & Slides</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">42 pages • 1hr 15m video</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">check_circle</span>
            </div>

            {/* Processing Indicator */}
            <div className="flex items-center justify-center gap-2 py-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                <span>AI Story Engine Synthesizing</span>
              </div>
            </div>

            {/* Generated Output Card */}
            <div className="bg-primary-container text-on-primary p-3 rounded-xl flex items-center gap-3 shadow-md hover:bg-primary transition-colors">
              <div className="w-10 h-10 rounded-lg bg-surface/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[24px] text-surface">auto_stories</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-md text-label-md text-on-primary truncate">
                  The Kingdom of Neural Synapses
                </span>
                <span className="font-label-sm text-label-sm text-on-primary-container">
                  4 Chapters • 8 Memory Anchors
                </span>
              </div>
              <span className="material-symbols-outlined text-on-primary text-[18px]">arrow_forward</span>
            </div>

            {/* Metric Callout */}
            <div className="flex items-center justify-between px-3 py-2 bg-secondary-fixed text-on-secondary-fixed rounded-xl">
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-secondary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                <span className="font-label-md text-label-md text-on-secondary-container">
                  98% Better Concept Recall
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">
                Exam Ready
              </span>
            </div>
          </div>
        </div>

        {/* Guarantee Quote Card */}
        <div className="mt-space-md w-full max-w-[370px] p-space-md rounded-2xl bg-surface-container-low text-on-surface text-center border border-surface-container-high/40">
          <p className="font-body-md text-body-md text-on-surface-variant italic">
            "No complicated studying. Just your material, your story, and a better way to learn."
          </p>
        </div>
      </section>

      {/* Visual Break / Illustrated Character Banner */}
      <section className="mb-space-xl">
        <div className="w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-[0px_4px_20px_-2px_rgba(79,57,246,0.08)] border border-surface-container-high/60 flex flex-col">
          <img
            className="w-full h-44 object-cover"
            alt="Charming digital storybook illustration with whimsical character guides walking on an open book bridge over clouds"
            src={ASSETS.storyCastBanner}
          />
          <div className="p-space-md flex items-center justify-between bg-surface-container-lowest">
            <div>
              <h4 className="font-headline-md text-headline-md text-on-surface">Meet Your Story Cast</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Complex formulas transform into heroes & plot twists.
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              aria-label="View story cast"
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0 hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">magic_button</span>
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="pb-space-xl flex flex-col">
        <div className="mb-space-md">
          <div className="inline-flex items-center gap-1 text-primary mb-1">
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">How It Works</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            From Dry Notes to Unforgettable Stories in 4 Steps
          </h2>
        </div>

        <div className="flex flex-col gap-space-sm">
          {/* Step 01 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex gap-space-sm items-start">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">Add Your Material</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Upload a PDF, paste a YouTube lecture link, or drop raw class notes.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex gap-space-sm items-start">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">AI Understands It</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Deeply extracts key concepts, formulas, definitions, and exam points without losing academic rigor.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex gap-space-sm items-start">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">Your Story Is Created</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Academic concepts morph into engaging characters and vivid narrative chapters designed for recall.
              </p>
            </div>
          </div>

          {/* Step 04 */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex gap-space-sm items-start">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-headline-md text-headline-md flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md text-on-surface">Learn & Remember</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Read chapter by chapter, inspect memory connection cards, listen to audio narration, and ace exams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="pb-space-xl flex flex-col">
        <div className="mb-space-md">
          <div className="inline-flex items-center gap-1 text-primary mb-1">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Features</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Built for Modern Students
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-space-sm">
          {/* Feature 1: PDF to Story */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">PDF to Story</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Turn heavy textbooks, multi-page slides, and syllabus notes into captivating narrative journeys.
            </p>
          </div>

          {/* Feature 2: YouTube to Story */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">smart_display</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">YouTube to Story</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Paste educational lecture links, auto-extract timestamps, and turn hours of lectures into 5-minute story chapters.
            </p>
          </div>

          {/* Feature 3: AI Concept Simplification */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">psychology_alt</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">AI Concept Simplification</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Strips academic jargon into crystal-clear analogies while keeping exact exam definitions intact.
            </p>
          </div>

          {/* Feature 4: Chapter-Based Stories */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">auto_stories</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Chapter-Based Stories</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Structured flow: e.g., Computer Networks → Ch 1: The Seven Kingdoms → Ch 2: Detective Data Link.
            </p>
          </div>

          {/* Feature 5: Smart Reminders */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">alarm_on</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Smart Reminders</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Automated spaced-repetition notifications ping memory anchors just before exam day.
            </p>
          </div>

          {/* Feature 6: Download, Audio & Share */}
          <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">headphones</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Download, Audio & Share</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Export formatted revision PDFs or listen to chapter audios on your daily commute.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / STUDENT TESTIMONIAL */}
      <section className="pb-space-xl">
        <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-[0px_4px_20px_-2px_rgba(79,57,246,0.06)] flex flex-col gap-3">
          <div className="flex items-center gap-1 text-secondary">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>
          <p className="font-body-lg text-body-lg text-on-surface italic">
            "Turned a 40-page dry networking paper into a superhero mystery. Scored an A+ on my midterm!"
          </p>
          <div className="flex items-center gap-3 pt-2">
            <img
              className="w-11 h-11 rounded-full object-cover"
              alt="Portrait of Sarah M., CS Sophomore"
              src={ASSETS.testimonialSarah}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface">Sarah M.</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                CS Sophomore, Stanford University
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION BANNER */}
      <section className="pb-space-lg">
        <div className="p-space-lg rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-[0px_12px_32px_-4px_rgba(79,57,246,0.25)] flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-surface/20 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-surface text-[26px]">school</span>
          </div>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary mb-2">
            Start transforming your study material today.
          </h3>
          <p className="font-body-md text-body-md text-on-primary-container mb-space-md max-w-[280px]">
            No credit card required. Free 3 stories on us.
          </p>
          <button
            onClick={() => onNavigate('create')}
            className="w-full max-w-[280px] h-13 py-3.5 px-6 rounded-full bg-surface text-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 hover:bg-white cursor-pointer"
          >
            <span>Get Started for Free</span>
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </button>
        </div>
      </section>
    </div>
  );
};
