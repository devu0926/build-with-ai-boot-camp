import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../data/assets';
import { INITIAL_CHAPTER_OSI, StoryChapter } from '../data/mockData';

interface StoryReaderScreenProps {
  chapter?: StoryChapter;
  onNavigate: (tab: string) => void;
  onOpenQuiz: (chapter: StoryChapter) => void;
  onScheduleReminder: (subject: string, storyTitle: string) => void;
}

export const StoryReaderScreen: React.FC<StoryReaderScreenProps> = ({
  chapter = INITIAL_CHAPTER_OSI,
  onNavigate,
  onOpenQuiz,
  onScheduleReminder
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(21); // percent
  const [currentTimeText, setCurrentTimeText] = useState('01:42');
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [isMastered, setIsMastered] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [notes, setNotes] = useState('Layer 2 uses MAC addresses. Crucial for exam question 3!');
  const [shareToast, setShareToast] = useState(false);

  // Simulated audio playback progress ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          const next = prev + 1;
          const totalSeconds = Math.floor((next / 100) * 495); // 8:15 = 495s
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          setCurrentTimeText(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleMasteryClick = () => {
    if (!isMastered) {
      setIsMastered(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback gracefully
      }
    } else {
      setIsMastered(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleDownload = () => {
    const content = `StoryLearn AI: ${chapter.title}\nChapter: ${chapter.subtitle}\n\nSummary:\n${chapter.sections.map(s => s.title + '\n' + s.paragraphs.join('\n')).join('\n\n')}\n\nExam Memory Cards:\n${chapter.memoryBoostCards.map(c => `[${c.badge}] ${c.title}: ${c.content}`).join('\n\n')}`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${chapter.title.replace(/\s+/g, '_')}_Revision_Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-sm pb-28 gap-space-md">
      {/* Chapter Overview Header Card */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary-fixed opacity-40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between flex-wrap gap-space-xs">
            <span className="inline-flex items-center gap-1 bg-surface-container-high text-primary px-2.5 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-[14px]">hub</span>
              {chapter.subject}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[16px] text-primary-container">menu_book</span>
              Chapter {chapter.chapterNumber} of {chapter.totalChapters}
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold tracking-tight">
            {chapter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <div className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-error">description</span>
              <span className="truncate max-w-[140px]">{chapter.sourceDoc}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-error">smart_display</span>
              <span className="truncate max-w-[130px]">{chapter.sourceVideo}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded-xl">
              <span className="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
              <span>Generated Today</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded-xl">
              <span className="material-symbols-outlined text-[16px] text-primary">target</span>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded-xl">
              <span className="material-symbols-outlined text-[16px] text-secondary-container">schedule</span>
              <span>{chapter.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-low p-2 rounded-xl">
              <span className="material-symbols-outlined text-[16px] text-primary-container">auto_awesome</span>
              <span>{chapter.keyConceptsCount} Key Concepts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Audio Narration Bar */}
      <div className="sticky top-16 z-30 -mx-margin-mobile px-margin-mobile py-2 bg-surface/90 backdrop-blur-md">
        <div className="bg-surface-container-lowest rounded-full p-1.5 shadow-md border border-surface-container-high/80 flex items-center justify-between gap-1">
          {/* Audio Playback Controls */}
          <div className="flex items-center gap-2 pl-2 flex-1 min-w-0 mr-1">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              aria-label={isPlayingAudio ? 'Pause story narration' : 'Play story narration'}
              className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer hover:bg-primary"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span className="truncate text-on-surface font-semibold flex items-center gap-1">
                  Narrator: Aria
                  {isPlayingAudio && (
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
                  )}
                </span>
                <span>{currentTimeText} / 08:15</span>
              </div>
              <div
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPercent = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
                  setAudioProgress(newPercent);
                }}
                className="w-full bg-surface-container-high h-1.5 rounded-full mt-1 overflow-hidden cursor-pointer"
              >
                <div
                  className="bg-primary-container h-full rounded-full transition-all"
                  style={{ width: `${audioProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Micro Action Buttons */}
          <div className="flex items-center gap-0.5 shrink-0 pr-1">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Save story bookmark"
              className={`w-9 h-9 rounded-full bg-surface-container flex items-center justify-center transition-colors active:scale-90 cursor-pointer ${
                isBookmarked ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
              title="Save Story"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {isBookmarked ? 'bookmark_added' : 'bookmark_add'}
              </span>
            </button>

            <button
              onClick={handleDownload}
              aria-label="Download as PDF"
              className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors active:scale-90 cursor-pointer"
              title="Download Notes"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>

            <button
              onClick={handleShare}
              aria-label="Share story link"
              className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors active:scale-90 cursor-pointer"
              title="Share Story"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>

            <button
              onClick={() => setShowNoteModal(true)}
              aria-label="Add personal notes"
              className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors active:scale-90 cursor-pointer"
              title="Add Note"
            >
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </button>

            <button
              onClick={() => onScheduleReminder(chapter.subject, chapter.title)}
              aria-label="Set exam reminder"
              className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center hover:text-primary transition-colors active:scale-90 cursor-pointer"
              title="Set Study Reminder"
            >
              <span className="material-symbols-outlined text-[18px]">alarm</span>
            </button>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {shareToast && (
          <div className="mx-auto mt-2 max-w-xs bg-inverse-surface text-inverse-on-surface text-xs font-semibold py-1.5 px-3 rounded-full text-center shadow-lg animate-in fade-in slide-in-from-top-2">
            Story link copied to clipboard!
          </div>
        )}
      </div>

      {/* Main Chapter Articles */}
      <article className="flex flex-col gap-space-lg">
        {/* Section 1 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-label-md text-label-md font-bold">
              1
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              The Seven Kingdoms & The Border Checkpoint
            </h2>
          </div>

          <div className="relative w-full h-48 rounded-xl overflow-hidden my-1 bg-surface-container-high">
            <img
              className="w-full h-full object-cover"
              alt="Vibrant modern digital storybook illustration of Network City border checkpoint"
              src={ASSETS.storyReaderSection1}
            />
            <div className="absolute bottom-2 left-2 bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-full text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">palette</span>
              AI Concept Canvas
            </div>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            In the bustling metropolis of Network City, information cannot simply roam free. To travel from Queen Application’s castle down to the roaring copper wires of the underworld, every piece of data must pass through seven distinct realms.
          </p>

          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            Today, a confidential packet labeled{' '}
            <button
              onClick={() =>
                setSelectedTerm(
                  'Payload: The actual user data carried within a network packet or frame, encapsulated with headers and trailers.'
                )
              }
              className="bg-surface-container-high text-primary font-semibold px-2 py-0.5 rounded-full inline-block cursor-pointer hover:bg-primary-fixed transition-colors"
            >
              "Hello World"
            </button>{' '}
            arrives at the border of Realm Two. Here sits Detective Data Link, wearing her magnifying spectacles and holding a heavy wax seal stamp.
          </p>

          {selectedTerm && (
            <div className="p-3 rounded-xl bg-primary-fixed/40 border border-primary/20 text-xs text-on-surface flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">info</span>
                <span>{selectedTerm}</span>
              </div>
              <button
                onClick={() => setSelectedTerm(null)}
                className="text-on-surface-variant hover:text-primary"
              >
                ✕
              </button>
            </div>
          )}
        </section>

        {/* Curriculum Sync Box */}
        <div className="relative rounded-2xl p-space-md bg-surface-container-high shadow-md overflow-hidden border border-primary/20">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary opacity-10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="material-symbols-outlined text-[22px]">lightbulb</span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Curriculum Sync
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {chapter.curriculumSync.layer}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface leading-snug">
                {chapter.curriculumSync.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed pt-1">
                {chapter.curriculumSync.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <section className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-label-md text-label-md font-bold">
              2
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Detective Data Link & Captain Physical
            </h2>
          </div>

          <div className="relative w-full h-48 rounded-xl overflow-hidden my-1 bg-surface-container-high">
            <img
              className="w-full h-full object-cover"
              alt="Storybook art of Detective Data Link and Captain Physical"
              src={ASSETS.storyReaderSection2}
            />
            <div className="absolute bottom-2 left-2 bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-full text-inverse-on-surface font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">palette</span>
              AI Concept Canvas
            </div>
          </div>

          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            Detective Data Link shouted across the trench to Captain Physical, who stood guard over the glowing fiber-optic rivers.
          </p>

          <blockquote className="bg-surface-container-low p-space-sm rounded-xl border-l-4 border-primary text-on-surface font-body-lg text-body-lg italic">
            “Captain, ensure no voltage drop on the wire! The copper road must stay intact!”
          </blockquote>
        </section>

        {/* Memory Boost Cards Section */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">psychology</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Memory Boost Cards
              </h3>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full border border-surface-container-highest/60 font-medium">
              Interactive Study Deck
            </span>
          </div>

          <div className="grid grid-cols-1 gap-space-sm">
            {chapter.memoryBoostCards.map(card => (
              <div
                key={card.id}
                className={`${card.colorClass} rounded-2xl p-space-md shadow-sm relative overflow-hidden transition-all duration-200 hover:shadow-md border border-black/5`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0" role="img" aria-label={card.title}>
                    {card.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className={`font-label-sm text-label-sm uppercase tracking-wider font-bold ${card.badgeColorClass}`}>
                      {card.badge}
                    </span>
                    <h4 className="font-label-lg text-label-lg font-semibold">{card.title}</h4>
                    <p className="font-body-md text-body-md pt-1 leading-relaxed whitespace-pre-line opacity-95">
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Completion & Next Navigation */}
      <div className="mt-space-md pt-space-md bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container-high/60 flex flex-col gap-space-md">
        {/* Mastery CTA */}
        <button
          onClick={handleMasteryClick}
          aria-label="Mark this chapter as mastered"
          className={`w-full py-3.5 px-space-md rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
            isMastered
              ? 'bg-tertiary-container text-on-tertiary-container'
              : 'bg-tertiary text-on-tertiary hover:bg-tertiary-container'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isMastered ? 'verified' : 'check_circle'}
          </span>
          <span>{isMastered ? 'Mastered! +50 XP Earned' : 'Mark Chapter as Mastered ✓'}</span>
        </button>

        {/* Test Knowledge Button */}
        <button
          onClick={() => onOpenQuiz(chapter)}
          className="w-full py-3 px-space-md rounded-full bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-sm hover:bg-secondary-container hover:text-on-secondary-container active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          <span>Test Knowledge (3 Quick Questions)</span>
        </button>

        {/* Chapter Steps */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-2.5 px-3 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span className="truncate">Ch 1: Introduction</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 py-2.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform cursor-pointer font-semibold"
          >
            <span className="truncate">Ch 3: The Guild</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-surface-container-high flex flex-col gap-3 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <span className="font-headline-md text-headline-md text-on-surface">Study Notes</span>
              <button
                onClick={() => setShowNoteModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">Personal thoughts for Chapter 2:</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={() => setShowNoteModal(false)}
              className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
