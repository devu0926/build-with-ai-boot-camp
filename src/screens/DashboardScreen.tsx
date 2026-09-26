import React from 'react';
import { ASSETS } from '../data/assets';
import { POPULAR_COMMUNITY_STORIES, STUDENT_PROFILE } from '../data/mockData';

interface DashboardScreenProps {
  onNavigate: (tab: string) => void;
  onOpenStory: (storyId?: string) => void;
  onOpenRevision?: (subject: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenStory,
  onOpenRevision
}) => {
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-sm pb-28 gap-space-lg">
      {/* Welcome & Learner State Section */}
      <section className="flex flex-col gap-space-xs mt-space-sm">
        <div className="flex items-center justify-between">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
            Welcome back, {STUDENT_PROFILE.name.split(' ')[0]}! 👋
          </h1>
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-secondary border border-secondary/20">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-label-sm text-label-sm font-bold">{STUDENT_PROFILE.streakDays} Days</span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant">
          What do you want to learn today?
        </p>

        {/* Streak & Mastery Micro-pill status */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1.5 rounded-full shrink-0 border border-surface-container-highest/60">
            <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
            <span className="font-label-sm text-label-sm text-on-surface">
              {STUDENT_PROFILE.conceptsMastered} Concepts Mastered
            </span>
          </div>
          <div
            onClick={() => onNavigate('reminders')}
            className="flex items-center gap-1.5 bg-secondary-fixed px-3 py-1.5 rounded-full shrink-0 text-on-secondary-fixed cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">event_upcoming</span>
            <span className="font-label-sm text-label-sm font-bold">Next Exam in 3 Days</span>
          </div>
        </div>
      </section>

      {/* Quick Action Ambient Card: Turn New Material into Story */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container via-primary to-inverse-surface p-space-md text-on-primary shadow-xl">
        {/* Decorative Ambient Glow Circles */}
        <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-tertiary-fixed/20 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-sm">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-secondary-fixed text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-wider font-bold">
              AI Story Weaver
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="font-headline-md text-headline-md text-on-primary leading-tight">
              Turn New Material into a Story
            </h2>
            <p className="font-body-md text-body-md text-on-primary-container text-opacity-90">
              Paste dense notes, upload PDFs, or drop a lecture link to start an interactive adventure.
            </p>
          </div>
          <div className="pt-2 flex">
            <button
              onClick={() => onNavigate('create')}
              className="flex items-center justify-center gap-2 bg-on-primary text-primary px-5 py-3 rounded-full font-label-lg text-label-lg shadow-md hover:bg-surface-bright transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Create New Story</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2x2 Touchable Navigation Grid */}
      <section className="grid grid-cols-2 gap-gutter-mobile">
        {/* 1. Create New Story */}
        <div
          onClick={() => onNavigate('create')}
          className="flex flex-col justify-between p-space-md bg-surface-container rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
            <span className="material-symbols-outlined text-[22px]">auto_fix_high</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg text-on-surface truncate">Create Story</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">PDF or YouTube</span>
          </div>
        </div>

        {/* 2. My Stories (8) */}
        <div
          onClick={() => onNavigate('my-stories')}
          className="flex flex-col justify-between p-space-md bg-surface-container-low rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer relative overflow-hidden border border-surface-container-high/60"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                menu_book
              </span>
            </div>
            <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-label-sm text-label-sm">
              2 active
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg text-on-surface truncate">My Stories (8)</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">Library shelf</span>
          </div>
        </div>

        {/* 3. Reminders (3) */}
        <div
          onClick={() => onNavigate('reminders')}
          className="flex flex-col justify-between p-space-md bg-surface-container-low rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-tertiary-container/15 flex items-center justify-center text-tertiary mb-3">
            <span className="material-symbols-outlined text-[22px]">notifications_active</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg text-on-surface truncate">Reminders (3)</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">OSI Model · 7:00 PM</span>
          </div>
        </div>

        {/* 4. Saved Lectures (4) */}
        <div
          onClick={() => onNavigate('create')}
          className="flex flex-col justify-between p-space-md bg-surface-container rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer border border-surface-container-high/60"
        >
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error mb-3">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_circle
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg text-on-surface truncate">Lectures (4)</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">CS144 & MIT 6.02</span>
          </div>
        </div>
      </section>

      {/* Continue Reading (Recent Learning Activity) */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-md text-headline-md text-on-surface">Continue Reading</h3>
          <button
            onClick={() => onNavigate('my-stories')}
            className="font-label-md text-label-md text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md border border-surface-container-high/60 flex flex-col gap-space-md">
          {/* Media/Illustration Cover Block */}
          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-surface-container flex items-end p-space-sm">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="Digital fairytale illustration of a glowing network city with futuristic castle towers"
              src={ASSETS.continueReadingCover}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="bg-surface-container-highest/90 text-on-surface backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px] text-primary">fort</span>
                Chapter 2 of 7
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold">
                Computer Networks
              </span>
            </div>
          </div>

          {/* Story Metadata */}
          <div className="flex flex-col gap-1">
            <h4 className="font-headline-md text-headline-md text-on-surface">
              The Seven Kingdoms of Network City
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Lord Ethernet races across bridges to deliver the encrypted scroll before time runs out.
            </p>
          </div>

          {/* Progress Track */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>Overall Mastery Progress</span>
              <span className="text-primary font-bold">65%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Micro Badges */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              <span>12 mins left</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-tertiary-container">key</span>
              <span>4 Concept Keys unlocked</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => onOpenStory('story-osi')}
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3.5 px-4 rounded-full font-label-lg text-label-lg shadow-sm hover:bg-primary active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Continue Chapter 2: Detective Data Link</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Spaced Repetition Exam Revision Alert */}
      <section className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="material-symbols-outlined text-secondary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            timer
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Exam Revisions</h3>
        </div>

        <div className="bg-surface-container rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">alarm</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface">
                  Operating Systems: Semaphores & Mutexes
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant text-sm">
                  Scheduled for Tomorrow, 8:00 AM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="bg-surface-container-high px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary font-semibold">
              Spaced Repetition Step 3
            </span>
            <button
              onClick={() => {
                if (onOpenRevision) {
                  onOpenRevision('Operating Systems');
                } else {
                  onNavigate('reminders');
                }
              }}
              className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-sm text-label-sm shadow-sm hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
            >
              Review Now
            </button>
          </div>
        </div>
      </section>

      {/* Explore Popular Community Stories */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">explore</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Popular Stories</h3>
          </div>
          <button
            onClick={() => onNavigate('my-stories')}
            className="font-label-md text-label-md text-primary hover:underline"
          >
            Explore More
          </button>
        </div>

        <div className="flex flex-col gap-space-sm">
          {POPULAR_COMMUNITY_STORIES.map(story => (
            <div
              key={story.id}
              className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-sm border border-surface-container-high/60 flex items-center justify-between gap-space-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-container relative">
                  <img
                    className="w-full h-full object-cover"
                    alt={story.title}
                    src={story.coverImage}
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface truncate">
                    {story.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                    {story.topic}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px] text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      {story.rating}
                    </span>
                    <span className="font-label-sm text-label-sm text-outline">
                      ({story.reads})
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenStory('story-quantum')}
                className="shrink-0 bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary px-3.5 py-1.5 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer font-semibold"
              >
                Read Story
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
