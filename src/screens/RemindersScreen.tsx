import React, { useState } from 'react';
import { INITIAL_REMINDERS, ReminderItem } from '../data/mockData';

interface RemindersScreenProps {
  onRevise: (subject: string, storyTitle: string) => void;
}

export const RemindersScreen: React.FC<RemindersScreenProps> = ({ onRevise }) => {
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [selectedSubject, setSelectedSubject] = useState('Computer Networks');
  const [selectedChapter, setSelectedChapter] = useState('The Seven Kingdoms (OSI Model - Ch 2)');
  const [selectedCadence, setSelectedCadence] = useState('Spaced (Optimal)');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Push Notification']);
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  const cadences = ['Once', 'Spaced (Optimal)', 'Daily', 'Before Exam'];
  const channels = ['Push Notification', 'Email Summary', 'WhatsApp Ping'];

  const toggleChannel = (channel: string) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    setTimeout(() => {
      const newReminder: ReminderItem = {
        id: `rem-${Date.now()}`,
        subject: selectedSubject,
        storyTitle: selectedChapter.split('(')[0].trim(),
        chapterTitle: selectedChapter,
        priorityText: 'Active Reinforcement',
        priorityLevel: 'medium',
        dateTimeText: 'In 2 days · 07:00 PM',
        stepText: 'Step 1 (Spaced prompt)',
        intervalText: 'Interval +48h',
        memoryGoal: 'Recall core analogies and character roles.',
        thumbnail: INITIAL_REMINDERS[0].thumbnail,
        cadence: selectedCadence
      };

      setReminders([newReminder, ...reminders]);
      setIsAdding(false);
      setAddSuccess(true);
      setTimeout(() => setAddSuccess(false), 2500);
    }, 600);
  };

  const handleDismiss = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const handleSnooze = (id: string) => {
    setReminders(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              dateTimeText: 'Tomorrow · 08:00 PM',
              priorityText: 'Snoozed +1 Hr'
            }
          : r
      )
    );
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-xs pb-28 space-y-space-lg">
      {/* Header Banner */}
      <section className="flex flex-col space-y-1 pt-2">
        <div className="flex items-center gap-1.5 text-secondary">
          <span className="material-symbols-outlined text-[18px]">cloud_download</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
            Memory Retention AI
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Never Miss Your Revision
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Smart spaced-repetition reminders designed to beat the forgetting curve and lock story concepts into long-term memory.
        </p>
      </section>

      {/* Educational Insight Banner (Ebbinghaus Visual Card) */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container-high p-space-md shadow-sm border border-primary/20">
        <div className="relative z-10 flex flex-col space-y-space-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                The Ebbinghaus Forgetting Curve
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold border border-surface-container-highest/60">
              Scientifically Proven
            </span>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
            Revising a story <span className="text-primary font-semibold">24 hours</span> and{' '}
            <span className="text-primary font-semibold">7 days</span> after first reading skyrockets active retention from{' '}
            <span className="text-error font-semibold">21%</span> to{' '}
            <span className="text-tertiary font-semibold">88%</span>!
          </p>

          {/* Retention Sparkline SVG */}
          <div className="w-full pt-1 pb-1">
            <div className="flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant mb-1 font-semibold">
              <span>Day 0 (Story Read)</span>
              <span className="text-tertiary font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 88% Locked
              </span>
            </div>
            <div className="relative w-full h-10 bg-surface rounded-xl overflow-hidden p-1 flex items-end border border-surface-container-highest/60">
              <svg
                className="w-full h-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 320 28"
              >
                {/* Without Spaced Repetition (Drop) */}
                <path
                  d="M 0 4 Q 40 24 100 25 T 320 27"
                  opacity="0.6"
                  stroke="#BA1A1A"
                  strokeDasharray="3 3"
                  strokeWidth="2"
                ></path>
                {/* With Spaced Repetition (Reinforced) */}
                <path
                  d="M 0 4 Q 40 18 60 5 Q 120 18 160 3 Q 240 12 320 2"
                  stroke="#4F39F6"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
                <circle className="fill-primary-container" cx="60" cy="5" r="3.5"></circle>
                <circle className="fill-primary-container" cx="160" cy="3" r="3.5"></circle>
                <circle className="fill-secondary-container" cx="320" cy="2" r="3.5"></circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Add Reminder Form Card */}
      <section className="rounded-2xl bg-surface-container-lowest p-space-md shadow-md border border-surface-container-high/60 flex flex-col space-y-space-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">add_alarm</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Schedule New Story Revision
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Set smart cues for upcoming study goals
            </p>
          </div>
        </div>

        <form onSubmit={handleAddReminder} className="flex flex-col space-y-space-sm">
          {/* Subject Dropdown */}
          <div className="flex flex-col space-y-1">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Course Subject
            </label>
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
                className="w-full h-12 pl-3 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface-container-lowest border border-surface-container-high/60 focus:ring-2 focus:ring-primary/40 outline-none transition-colors cursor-pointer"
              >
                <option>Computer Networks</option>
                <option>Operating Systems</option>
                <option>Database Management Systems</option>
                <option>Data Structures & Algorithms</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Story / Chapter Dropdown */}
          <div className="flex flex-col space-y-1">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Story / Chapter
            </label>
            <div className="relative">
              <select
                value={selectedChapter}
                onChange={e => setSelectedChapter(e.target.value)}
                className="w-full h-12 pl-3 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:bg-surface-container-lowest border border-surface-container-high/60 focus:ring-2 focus:ring-primary/40 outline-none transition-colors cursor-pointer"
              >
                <option>The Seven Kingdoms (OSI Model - Ch 2)</option>
                <option>The Traffic Cop of Memory Lane (Semaphores)</option>
                <option>The Sacred ACID Vaults (Transactions)</option>
                <option>The Graph Traveler of Babel (Dijkstra)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[20px]">
                menu_book
              </span>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-gutter-mobile">
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Date
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">
                  calendar_today
                </span>
                <input
                  className="w-full h-12 pl-9 pr-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-surface-container-high/60 cursor-pointer outline-none"
                  readOnly
                  type="text"
                  value="Tomorrow, Oct 24"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Time
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-primary text-[18px]">
                  schedule
                </span>
                <input
                  className="w-full h-12 pl-9 pr-2 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md border border-surface-container-high/60 cursor-pointer outline-none"
                  readOnly
                  type="text"
                  value="07:00 PM"
                />
              </div>
            </div>
          </div>

          {/* Repeat Frequency Segmented Selector */}
          <div className="flex flex-col space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="font-label-md text-label-md text-on-surface font-semibold">
                Cadence Strategy
              </label>
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span> Recommended
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-surface-container-low border border-surface-container-high/60">
              {cadences.map(cadence => {
                const isSelected = selectedCadence === cadence;
                return (
                  <button
                    key={cadence}
                    type="button"
                    onClick={() => setSelectedCadence(cadence)}
                    className={`py-2 px-2 rounded-lg text-center font-label-sm text-label-sm transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                    <span>{cadence}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reminder Channel Toggle Chips */}
          <div className="flex flex-col space-y-1.5 pt-1">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Delivery Channel
            </label>
            <div className="flex flex-wrap gap-1.5">
              {channels.map(channel => {
                const isSelected = selectedChannels.includes(channel);
                const icon =
                  channel === 'Push Notification'
                    ? 'notifications_active'
                    : channel === 'Email Summary'
                    ? 'mail'
                    : 'chat';
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    className={`px-3 py-2 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-surface-container-highest text-primary font-bold border border-primary/20'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{icon}</span>
                    <span>{channel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAdding}
              className={`w-full h-12 rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(79,57,246,0.3)] transition-all active:scale-95 cursor-pointer ${
                addSuccess
                  ? 'bg-tertiary-container text-on-tertiary-container'
                  : 'bg-primary-container text-on-primary hover:bg-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isAdding ? 'animate-spin' : ''}`}>
                {addSuccess ? 'check_circle' : isAdding ? 'sync' : 'notification_add'}
              </span>
              <span>
                {addSuccess
                  ? 'Reminder Scheduled!'
                  : isAdding
                  ? 'Setting Reminder...'
                  : '+ Set Revision Reminder'}
              </span>
            </button>
          </div>
        </form>
      </section>

      {/* Active Reminders Section */}
      <section className="flex flex-col space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Revisions</h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-primary font-bold">
              {reminders.length}
            </span>
          </div>
          <button
            onClick={() => setReminders([...reminders].reverse())}
            className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span> Filter
          </button>
        </div>

        {/* Reminders List */}
        {reminders.map((reminder, idx) => (
          <article
            key={reminder.id}
            className="relative rounded-2xl bg-surface-container-lowest p-space-md shadow-md border border-surface-container-high/60 flex flex-col space-y-space-sm overflow-hidden"
          >
            {/* Top accent bar for high priority */}
            {reminder.priorityLevel === 'high' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-container via-primary-container to-secondary-container"></div>
            )}

            {/* Header: Badges & Time */}
            <div className="flex items-center justify-between pt-1">
              <div
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${
                  reminder.priorityLevel === 'high'
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-surface-container-high text-primary'
                }`}
              >
                {reminder.priorityLevel === 'high' && (
                  <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                )}
                <span>{reminder.priorityText}</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-secondary">event</span>
                <span>{reminder.dateTimeText}</span>
              </div>
            </div>

            {/* Visual & Title Snippet */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex-shrink-0 overflow-hidden relative shadow-inner border border-surface-container-high">
                <img
                  className="w-full h-full object-cover"
                  alt={reminder.storyTitle}
                  src={reminder.thumbnail}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-primary font-bold tracking-wide">
                  {reminder.subject}
                </span>
                <h3 className="font-label-lg text-label-lg text-on-surface leading-tight truncate">
                  {reminder.storyTitle}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {reminder.chapterTitle}
                </p>
              </div>
            </div>

            {/* Spaced Repetition Meta Box */}
            <div className="rounded-xl bg-surface-container p-2.5 flex flex-col space-y-1.5 border border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sync</span>
                  {reminder.stepText}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {reminder.intervalText}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-[13px] leading-snug">
                <span className="font-semibold text-on-surface">Memory Goal:</span>{' '}
                {reminder.memoryGoal}
              </p>
            </div>

            {/* Actions Pill Row */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onRevise(reminder.subject, reminder.storyTitle)}
                className="flex-1 h-10 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-primary-container cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Revise Now</span>
              </button>

              {idx === 0 ? (
                <>
                  <button
                    onClick={() => handleSnooze(reminder.id)}
                    className="h-10 px-3.5 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-surface-container cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                      snooze
                    </span>
                    <span>Snooze 1 Hr</span>
                  </button>
                  <button
                    onClick={() => handleDismiss(reminder.id)}
                    aria-label="Edit reminder"
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-error active:scale-90 transition-transform cursor-pointer"
                    title="Dismiss"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDismiss(reminder.id)}
                  className="h-10 px-4 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1 active:scale-95 transition-transform hover:text-error cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  <span>Dismiss</span>
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
