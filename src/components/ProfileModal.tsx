import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { STUDENT_PROFILE } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState(STUDENT_PROFILE);
  const [audioPreviewing, setAudioPreviewing] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key: keyof typeof STUDENT_PROFILE.notifications) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleVoicePreview = () => {
    setAudioPreviewing(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'Welcome to StoryLearn AI. In the kingdom of Network City, data travels with purpose.'
      );
      utterance.pitch = 1.1;
      utterance.rate = 0.95;
      utterance.onend = () => setAudioPreviewing(false);
      utterance.onerror = () => setAudioPreviewing(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAudioPreviewing(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-surface w-full max-w-xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 border border-surface-container-high">
        {/* Sticky Header */}
        <div className="h-16 px-margin-mobile flex items-center justify-between border-b border-surface-container-high bg-surface-container-lowest sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">account_circle</span>
            <span className="font-headline-md text-headline-md text-on-surface">Student Profile</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto px-margin-mobile py-space-md flex flex-col gap-space-lg pb-10">
          {/* Subtle Ambient Glow Element */}
          <div className="relative w-full">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary-fixed blur-3xl opacity-50 pointer-events-none rounded-full"></div>
          </div>

          {/* Student Profile Hero Card */}
          <div className="relative w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-md border border-surface-container-high/60 flex flex-col items-center text-center">
            {/* Top Sparkle Badge */}
            <div className="self-end inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm font-bold">
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">
                Pro Student
              </span>
            </div>

            {/* Avatar with Glowing Luminescence */}
            <div className="relative mt-space-xs mb-space-sm">
              <div className="absolute inset-0 rounded-full bg-primary-container blur-md opacity-35 scale-110"></div>
              <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary-container via-primary-fixed to-secondary-container shadow-sm">
                <img
                  alt="Ananya Sharma Profile"
                  className="w-full h-full object-cover rounded-full bg-surface-container-high"
                  src={ASSETS.avatar}
                />
              </div>
              <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[14px]">school</span>
              </div>
            </div>

            {/* Student Identifiers */}
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              {profile.name}
            </h2>
            <p className="font-label-md text-label-md text-primary mt-0.5 font-semibold">
              🎓 {profile.degree}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              {profile.college}
            </p>

            {/* Status Tag */}
            <div className="mt-space-sm inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface border border-surface-container-highest/60">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
              <span className="font-label-sm text-label-sm font-semibold">
                StoryLearn Pro Student (Active)
              </span>
            </div>

            {/* Stats Summary Ribbon */}
            <div className="grid grid-cols-3 gap-space-xs w-full mt-space-md pt-space-sm bg-surface-container-low rounded-xl p-space-sm text-center border border-surface-container-high/40">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  <span className="font-headline-md text-headline-md font-bold">
                    {profile.storiesCreated}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Stories Created
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-secondary">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    psychology
                  </span>
                  <span className="font-headline-md text-headline-md font-bold">
                    {profile.conceptsMastered}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Mastered
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-tertiary-container">
                  <span className="material-symbols-outlined text-[18px]">military_tech</span>
                  <span className="font-headline-md text-headline-md font-bold">
                    {profile.quizRetentionPercent}%
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Quiz Retention
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: Learning & Story Preferences */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">magic_button</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Learning & Story Preferences
              </h3>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md mt-space-xs">
              {/* Story Style Setting */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant">
                  <span>Default Story Style</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    Visual Narrative
                  </span>
                </div>
                <div className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high/40">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      castle
                    </span>
                    <span className="font-body-md text-body-md font-medium">
                      {profile.preferences.defaultStoryStyle}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Difficulty Level Selection */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Default Difficulty
                </span>
                <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container-low rounded-xl border border-surface-container-high/40">
                  {['Foundational', 'Intermediate', 'Advanced'].map(diff => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() =>
                        setProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, defaultDifficulty: diff }
                        }))
                      }
                      className={`py-2 rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                        profile.preferences.defaultDifficulty === diff
                          ? 'bg-primary-container text-on-primary shadow-sm font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Voice Selector */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Audio Narration Voice
                </span>
                <div className="w-full flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high/40">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      record_voice_over
                    </span>
                    <span className="font-body-md text-body-md font-medium">
                      {profile.preferences.narrationVoice}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleVoicePreview}
                    className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {audioPreviewing ? 'volume_up' : 'play_circle'}
                    </span>
                    <span className="font-label-sm text-label-sm font-bold">
                      {audioPreviewing ? 'Playing...' : 'Preview'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high/40">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    translate
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md font-medium">Story Language</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {profile.preferences.language}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Study Notifications */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Study Notifications
              </h3>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md mt-space-xs">
              {/* Toggle Item 1 */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col pr-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    Spaced Repetition Alerts
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    AI triggers story quizzes right before memory decay
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('spacedRepetition')}
                  className={`w-12 h-7 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    profile.notifications.spacedRepetition
                      ? 'bg-primary-container'
                      : 'bg-surface-container-highest'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                      profile.notifications.spacedRepetition ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>

              {/* Toggle Item 2 */}
              <div className="flex items-center justify-between border-t border-surface-container-high/40 pt-3">
                <div className="flex flex-col pr-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    Exam Countdown Reminders
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Auto-schedules syllabus micro-chapters
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('examCountdown')}
                  className={`w-12 h-7 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    profile.notifications.examCountdown
                      ? 'bg-primary-container'
                      : 'bg-surface-container-highest'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                      profile.notifications.examCountdown ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>

              {/* Toggle Item 3 */}
              <div className="flex items-center justify-between border-t border-surface-container-high/40 pt-3">
                <div className="flex flex-col pr-2">
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    Daily Streak Motivation
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Encouraging pings to keep learning flame alive
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle('dailyStreak')}
                  className={`w-12 h-7 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    profile.notifications.dailyStreak
                      ? 'bg-primary-container'
                      : 'bg-surface-container-highest'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                      profile.notifications.dailyStreak ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: Academic Info & Sync */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary-container">
                <span className="material-symbols-outlined text-[18px]">sync_saved_locally</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Academic Info & Sync
              </h3>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm mt-space-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    College / University
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    {profile.college}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  account_balance
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Degree & Semester
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-semibold">
                    {profile.currentSemester}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  badge
                </span>
              </div>

              {/* Integrations Pill */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-tertiary-container text-[22px]">
                    domain_verification
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-on-surface font-semibold">
                      Classroom & Canvas
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Assignments automatically fetched
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span className="font-label-sm text-label-sm">Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Account Security */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Account Security</h3>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm mt-space-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-surface-container-high/40">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Registered Campus Email
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-medium truncate max-w-[210px]">
                    {profile.campusEmail}
                  </span>
                </div>
                <span className="material-symbols-outlined text-tertiary-container text-[20px]">
                  verified
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high/40 cursor-pointer hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    password
                  </span>
                  <span className="font-body-md text-body-md">Change Password</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high/40 cursor-pointer hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    policy
                  </span>
                  <span className="font-body-md text-body-md">Privacy & Terms</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-space-md flex flex-col items-center gap-space-sm">
            <button
              onClick={onClose}
              className="w-full h-12 rounded-full bg-error-container text-on-error-container font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer font-bold"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span>Log Out</span>
            </button>

            <div className="flex flex-col items-center text-center mt-space-xs">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                StoryLearn AI v2.4.0 · Made for students
              </p>
              <div className="flex items-center gap-1 mt-1 text-primary">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                <span className="font-label-sm text-label-sm font-semibold">
                  Empowered by Generative Pedagogy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
