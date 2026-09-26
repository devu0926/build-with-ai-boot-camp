import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe pointer-events-none">
      <div className="pointer-events-auto max-w-md mx-auto mx-margin-mobile mb-4 rounded-full bg-surface/90 backdrop-blur-xl shadow-[0_12px_32px_-4px_rgba(79,57,246,0.15),0_4px_12px_rgba(30,27,75,0.04)] border border-surface-container-high/60 px-3">
        <div className="flex justify-between items-center h-16">
          {/* Home Tab */}
          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] transition-colors gap-0.5 ${
              currentTab === 'home'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={currentTab === 'home' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              home
            </span>
            <span className="font-label-sm text-label-sm">Home</span>
          </button>

          {/* Dashboard Tab */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] transition-colors gap-0.5 ${
              currentTab === 'dashboard'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={currentTab === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              dashboard
            </span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </button>

          {/* Center Elevated Floating Create Action */}
          <div className="relative -top-4 flex items-center justify-center">
            <button
              onClick={() => onNavigate('create')}
              aria-label="Create Story"
              className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0_0_24px_0_rgba(99,102,241,0.35),0_8px_20px_-4px_rgba(79,57,246,0.4)] transition-all active:scale-90 hover:scale-105 hover:shadow-[0_0_28px_0_rgba(99,102,241,0.5)]"
            >
              <span className="material-symbols-outlined text-[30px]">auto_fix_high</span>
            </button>
          </div>

          {/* My Stories Tab */}
          <button
            onClick={() => onNavigate('my-stories')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] transition-colors gap-0.5 ${
              currentTab === 'my-stories'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={currentTab === 'my-stories' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              menu_book
            </span>
            <span className="font-label-sm text-label-sm">My Stories</span>
          </button>

          {/* Reminders Tab */}
          <button
            onClick={() => onNavigate('reminders')}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] transition-colors gap-0.5 ${
              currentTab === 'reminders'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={currentTab === 'reminders' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              alarm
            </span>
            <span className="font-label-sm text-label-sm">Reminders</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
