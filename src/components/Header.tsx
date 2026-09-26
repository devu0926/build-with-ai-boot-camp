import React, { useState } from 'react';
import { ASSETS } from '../data/assets';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
  titleOverride?: string;
  showBack?: boolean;
  onBack?: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenProfile,
  titleOverride,
  showBack = false,
  onBack,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getSubtext = () => {
    switch (currentTab) {
      case 'home':
        return 'Home';
      case 'dashboard':
        return 'Dashboard';
      case 'create':
        return 'Create';
      case 'reader':
        return 'Story Reader';
      case 'my-stories':
        return 'My Stories';
      case 'reminders':
        return 'Reminders';
      case 'generating':
        return 'Synthesizing';
      default:
        return 'Study Platform';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(79,57,246,0.06)] border-b border-surface-container-high/40">
      <div className="max-w-2xl mx-auto h-16 px-margin-mobile flex items-center justify-between gap-space-sm">
        {/* Left branding or back button */}
        <div className="flex items-center gap-space-sm min-w-0">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:text-primary hover:bg-surface-container transition-all active:scale-90 shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90 shrink-0"
          >
            <img
              alt="StoryLearn AI Brand Logo"
              className="h-8 w-auto object-contain shrink-0"
              src={ASSETS.logo}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-headline-md text-headline-md tracking-tight text-on-surface leading-none truncate max-w-[130px] sm:max-w-[170px]">
                {titleOverride || 'StoryLearn AI'}
              </span>
              <div className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high shrink-0">
                <span className="material-symbols-outlined text-[13px] text-secondary leading-none">auto_awesome</span>
                <span className="font-label-sm text-label-sm text-secondary leading-none uppercase tracking-wide">
                  AI Powered
                </span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[130px]">
              {getSubtext()}
            </span>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1 shrink-0 relative">
          {currentTab === 'reader' && onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              aria-label="Bookmark"
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                isBookmarked ? 'text-primary bg-primary-fixed/50' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Notifications</span>
                  <span className="text-xs text-primary font-medium">3 unread</span>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('reminders');
                    }}
                    className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors flex items-start gap-2"
                  >
                    <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">alarm</span>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-on-surface">Computer Networks Review</span>
                      <span className="text-on-surface-variant">Scheduled for tomorrow at 7:00 PM</span>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('reader');
                    }}
                    className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors flex items-start gap-2"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">auto_stories</span>
                    <div className="flex flex-col text-xs">
                      <span className="font-semibold text-on-surface">Chapter 2 ready!</span>
                      <span className="text-on-surface-variant">Detective Data Link is waiting</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenProfile}
            aria-label="Student Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full p-0.5 transition-transform active:scale-95 hover:ring-2 hover:ring-primary/30"
          >
            <img
              alt="Ananya Sharma Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
