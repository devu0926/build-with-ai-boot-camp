import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { INITIAL_STORIES, StorySummary } from '../data/mockData';

interface MyStoriesScreenProps {
  onNavigate: (tab: string) => void;
  onOpenStory: (storyId: string) => void;
  onOpenQuiz: (storyId: string) => void;
}

export const MyStoriesScreen: React.FC<MyStoriesScreenProps> = ({
  onNavigate,
  onOpenStory,
  onOpenQuiz
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [stories, setStories] = useState<StorySummary[]>(INITIAL_STORIES);

  const filters = [
    { label: 'All', count: 8 },
    { label: 'Recent', count: null },
    { label: 'Favorites', count: 3, icon: 'star' },
    { label: 'Computer Networks', count: 2 },
    { label: 'Operating Systems', count: 3 },
    { label: 'Physics', count: 2 },
    { label: 'Completed', count: 5 }
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStories(prev =>
      prev.map(s => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.currentChapterTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'All') return true;
    if (activeFilter === 'Favorites') return story.isFavorite;
    if (activeFilter === 'Completed') return story.progressPercent === 100;
    if (activeFilter === 'Computer Networks') return story.subject === 'Computer Networks';
    if (activeFilter === 'Operating Systems') return story.subject === 'Operating Systems';
    if (activeFilter === 'Physics') return story.subject.includes('Physics');
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-sm pb-28 gap-space-lg">
      {/* Header Info */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
              My Learning Stories
            </h1>
            <span
              className="material-symbols-outlined text-secondary text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
          </div>
          <button
            onClick={() => setStories([...stories].reverse())}
            aria-label="Sort options"
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary active:scale-95 transition-transform cursor-pointer"
            title="Sort stories"
          >
            <span className="material-symbols-outlined text-[20px]">swap_vert</span>
          </button>
        </div>

        <div className="flex items-center gap-space-xs text-on-surface-variant">
          <span className="font-body-md text-body-md">8 active stories</span>
          <span className="text-xs">·</span>
          <span className="flex items-center gap-1 font-label-md text-label-md text-secondary">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            34 concepts mastered
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full flex items-center">
        <span className="material-symbols-outlined absolute left-4 text-outline text-[22px] pointer-events-none">
          search
        </span>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-11 bg-surface-container-lowest border border-surface-container-high/60 rounded-full font-body-md text-body-md text-on-surface placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          placeholder="Search your stories, chapters, or concepts..."
          type="text"
        />
        <button
          onClick={() => setSearchQuery('')}
          aria-label="Clear or voice dictation"
          className="absolute right-3 w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            {searchQuery ? 'close' : 'mic'}
          </span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="-mx-margin-mobile px-margin-mobile flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filters.map(f => {
          const isActive = activeFilter === f.label;
          return (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={`shrink-0 px-4 h-9 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/60'
              }`}
            >
              {f.icon && (
                <span
                  className="material-symbols-outlined text-secondary text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {f.icon}
                </span>
              )}
              <span>
                {f.label}
                {f.count !== null ? ` (${f.count})` : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Story Cards List */}
      <div className="flex flex-col gap-space-md">
        {/* Story 1: Network City (In Progress) */}
        {filteredStories.find(s => s.id === 'story-osi') && (
          <div className="flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-md overflow-hidden relative border border-surface-container-high/60 group">
            <div className="h-32 w-full relative overflow-hidden bg-primary-container">
              <img
                className="w-full h-full object-cover"
                alt="Digital fairytale illustration of a glowing purple neon medieval castle"
                src={ASSETS.myStoriesHero}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-black/20"></div>

              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                  In Progress (65%)
                </span>
              </div>

              <button
                onClick={e => toggleFavorite('story-osi', e)}
                aria-label="Favorite story"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-secondary active:scale-90 transition-transform shadow-sm cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={
                    stories.find(s => s.id === 'story-osi')?.isFavorite
                      ? { fontVariationSettings: "'FILL' 1" }
                      : {}
                  }
                >
                  star
                </span>
              </button>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-on-primary">
                <span className="font-label-md text-label-md px-2 py-0.5 rounded-full bg-primary/40 backdrop-blur-sm font-semibold">
                  Computer Networks
                </span>
                <span className="font-label-sm text-label-sm text-on-primary/90 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 8 mins left
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-space-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <h2 className="font-headline-md text-headline-md text-on-surface truncate">
                    The Seven Kingdoms of Network City
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-1 mt-0.5">
                    Ch 2: Detective Data Link & The Frame Checkpoint
                  </p>
                </div>
              </div>

              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>

              <div className="flex items-center justify-between pt-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-outline">
                    calendar_today
                  </span>{' '}
                  Created Yesterday
                </span>
                <span className="text-secondary flex items-center gap-1 font-label-md text-label-md font-bold">
                  <span className="material-symbols-outlined text-[16px]">psychology</span> 5 key
                  terms
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onOpenStory('story-osi')}
                  className="flex-1 h-12 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-primary-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Continue Reading</span>
                </button>
                <button
                  onClick={() => onOpenStory('story-osi')}
                  aria-label="Audio narration"
                  className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Story 2: Traffic Cop of Memory Lane (Mastered 100%) */}
        {filteredStories.find(s => s.id === 'story-os') && (
          <div className="flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 p-4 gap-space-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary text-[26px]">traffic</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide font-bold">
                    Operating Systems
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-0.5 font-bold">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    100%
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface truncate mt-0.5">
                  The Traffic Cop of Memory Lane
                </h3>
              </div>
            </div>

            <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col gap-1">
              <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-1">
                <strong className="text-on-surface font-label-md">Ch 4:</strong> Semaphores & The
                Critical Section Bridge
              </p>
              <div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">timer</span> 14 mins read
                </span>
                <span>·</span>
                <span>3 days ago</span>
                <span>·</span>
                <span className="text-secondary font-label-md text-label-md font-bold">
                  Score: 95%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenStory('story-os')}
                className="h-10 rounded-full bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors active:scale-95 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                <span>Review Story</span>
              </button>
              <button
                onClick={() => onOpenQuiz('story-os')}
                className="h-10 rounded-full bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-secondary-container hover:text-on-secondary-container cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                <span>Test Knowledge</span>
              </button>
            </div>
          </div>
        )}

        {/* Story 3: Quantum Kittens */}
        {filteredStories.find(s => s.id === 'story-quantum') && (
          <div className="flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 p-4 gap-space-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-[26px]">
                  all_inclusive
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide font-bold">
                    Quantum Physics
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                    In Progress (30%)
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface truncate mt-0.5">
                  The Tale of Two Entangled Kittens
                </h3>
              </div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-1">
              Ch 1: Superposition and Spooky Action at a Distance
            </p>

            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '30%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> 10 mins left
                </span>
                <span>·</span>
                <span>Last week</span>
              </div>
              <button
                onClick={() => onOpenStory('story-quantum')}
                className="h-9 px-5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1 active:scale-95 transition-transform shadow-sm cursor-pointer hover:bg-primary font-semibold"
              >
                <span>Resume</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* Story 4: Sacred ACID Vaults */}
        {filteredStories.find(s => s.id === 'story-db') && (
          <div
            onClick={() => onOpenStory('story-db')}
            className="flex flex-col w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high/60 p-4 gap-space-sm cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary text-[26px]">
                  lock_reset
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wide font-bold">
                    Database Systems
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm flex items-center gap-0.5 font-bold">
                    <span
                      className="material-symbols-outlined text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    Mastered
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface truncate mt-0.5">
                  The Sacred ACID Vaults of Relational Town
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between text-outline font-label-sm text-label-sm pt-1">
              <span className="truncate max-w-[200px]">Transactions, Rollbacks & Locking</span>
              <div className="flex items-center gap-2 shrink-0">
                <span>12 mins</span>
                <span>·</span>
                <span>2 weeks ago</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expand Your Universe CTA */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-container-low text-center gap-3 relative overflow-hidden border border-surface-container-high/60">
        <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-1">
          <span className="material-symbols-outlined text-[28px]">add_notes</span>
        </div>
        <div className="flex flex-col gap-1 max-w-xs">
          <h4 className="font-headline-md text-headline-md text-on-surface">Expand Your Universe</h4>
          <p className="font-body-md text-body-md text-on-surface-variant text-sm">
            Convert any complex syllabus, textbook chapter, or lecture notes into an interactive story adventure.
          </p>
        </div>
        <button
          onClick={() => onNavigate('create')}
          className="mt-2 h-11 px-6 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 shadow-md active:scale-95 transition-all hover:bg-primary-container cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[20px]">upload_file</span>
          <span>Upload Material</span>
        </button>
      </div>
    </div>
  );
};
