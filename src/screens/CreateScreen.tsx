import React, { useState } from 'react';
import { ASSETS } from '../data/assets';

interface CreateScreenProps {
  onStartGeneration: (options: {
    sourceType: 'pdf' | 'youtube' | 'notes';
    title: string;
    style: string;
    depth: string;
    length: string;
    language: string;
    goals: string[];
    notesContent?: string;
  }) => void;
}

export const CreateScreen: React.FC<CreateScreenProps> = ({ onStartGeneration }) => {
  const [sourceTab, setSourceTab] = useState<'pdf' | 'youtube' | 'notes'>('pdf');
  const [selectedStyle, setSelectedStyle] = useState<string>('Adventure / Fantasy');
  const [selectedDepth, setSelectedDepth] = useState<string>('Intermediate');
  const [selectedLength, setSelectedLength] = useState<string>('Medium');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English (US/UK)');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Understand concepts',
    'Prepare for exam'
  ]);

  // Source tab state
  const [pdfFileName, setPdfFileName] = useState<string>('Computer_Networks_Unit_3_OSI_Model.pdf');
  const [pdfFileSize, setPdfFileSize] = useState<string>('4.2 MB');
  const [isPdfUploaded, setIsPdfUploaded] = useState<boolean>(true);

  const [youtubeUrl, setYoutubeUrl] = useState<string>('https://youtube.com/watch?v=IPvY_HA99');
  const [isYoutubeInspected, setIsYoutubeInspected] = useState<boolean>(true);

  const [notesContent, setNotesContent] = useState<string>(
    `Unit 3: OSI Model & Protocol Stack
1. Physical Layer: Raw bit streams, hubs, coax cables, voltages.
2. Data Link: Frames, MAC address, switches, error detection CRC.
3. Network Layer: Packets, IP addressing, routers, packet routing heuristics...`
  );

  const genres = [
    { label: 'Adventure / Fantasy', icon: 'castle' },
    { label: 'Mystery & Detective', icon: 'search_insights' },
    { label: 'Sci-Fi Odyssey', icon: 'rocket_launch' },
    { label: 'Real-Life Scenario', icon: 'location_city' },
    { label: 'Fun & Humorous', icon: 'sentiment_very_satisfied' },
    { label: 'Campus Life', icon: 'school' }
  ];

  const languages = [
    'English (US/UK)',
    'Hindi (हिंदी)',
    'Gujarati (ગુજરાતી)',
    'Spanish (Español)',
    'French (Français)'
  ];

  const goalsList = [
    'Understand concepts',
    'Prepare for exam',
    'Quick revision',
    'Remember exact definitions'
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFileName(file.name);
      setPdfFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setIsPdfUploaded(true);
    }
  };

  const handleCleanNotes = () => {
    const lines = notesContent
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    setNotesContent(lines.join('\n'));
  };

  const handleSubmit = () => {
    let title = 'Computer Networks: OSI Model';
    if (sourceTab === 'pdf') {
      title = pdfFileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
    } else if (sourceTab === 'youtube') {
      title = 'OSI Model Lecture (Prof. Code)';
    } else {
      title = 'Class Notes: Protocol Stack';
    }

    onStartGeneration({
      sourceType: sourceTab,
      title,
      style: selectedStyle,
      depth: selectedDepth,
      length: selectedLength,
      language: selectedLanguage,
      goals: selectedGoals,
      notesContent
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-margin-mobile pt-space-sm pb-28">
      {/* Introductory Framing Header */}
      <div className="flex flex-col mt-space-sm mb-space-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high w-fit mb-space-xs shadow-sm border border-surface-container-highest/60">
          <span className="material-symbols-outlined text-[15px] text-secondary">magic_button</span>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
            Step 1 of 2: Materials & Vibe
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
          Give Me Something to Learn From
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Upload your study material or share your lecture. We’ll turn it into a magical story.
        </p>
      </div>

      {/* Interactive 3 Input Tabs */}
      <div className="flex items-center p-1 rounded-full bg-surface-container mb-space-md shadow-sm border border-surface-container-high/60">
        <button
          onClick={() => setSourceTab('pdf')}
          className={`flex-1 py-2 px-2 rounded-full font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            sourceTab === 'pdf'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">description</span>
          <span className="truncate">PDF File</span>
        </button>

        <button
          onClick={() => setSourceTab('youtube')}
          className={`flex-1 py-2 px-2 rounded-full font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            sourceTab === 'youtube'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">smart_display</span>
          <span className="truncate">YouTube</span>
        </button>

        <button
          onClick={() => setSourceTab('notes')}
          className={`flex-1 py-2 px-2 rounded-full font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            sourceTab === 'notes'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">edit_note</span>
          <span className="truncate">Paste Notes</span>
        </button>
      </div>

      {/* CONTENT OPTION 1: Upload PDF Area */}
      {sourceTab === 'pdf' && (
        <div className="flex flex-col gap-space-sm mb-space-lg">
          {/* Dotted Dropzone */}
          <label className="relative flex flex-col items-center justify-center p-space-lg rounded-2xl bg-surface-container-low shadow-sm text-center overflow-hidden border-2 border-dashed border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
            />
            {/* Ambient Sparkle Glow */}
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-primary-fixed blur-xl opacity-70 pointer-events-none"></div>
            <div className="relative w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center mb-space-sm shadow-sm text-primary">
              <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
              <span
                className="material-symbols-outlined text-[14px] text-secondary absolute -top-1 -right-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
            </div>
            <p className="font-label-lg text-label-lg text-on-surface">
              Drop your PDF here or <span className="text-primary font-bold underline">Browse Files</span>
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
              Supports textbook scans, lecture slides up to 45MB
            </p>
          </label>

          {/* Uploaded Preview Card */}
          {isPdfUploaded && (
            <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-high/60 flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="font-label-lg text-label-lg text-on-surface truncate">
                    {pdfFileName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {pdfFileSize}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <div className="flex items-center gap-0.5 text-tertiary">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-sm text-label-sm font-semibold">100% Uploaded</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPdfUploaded(false)}
                aria-label="Remove or re-upload file"
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* CONTENT OPTION 2: YouTube Lecture Quick Field */}
      {sourceTab === 'youtube' && (
        <div className="flex flex-col gap-space-sm mb-space-lg">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface-variant">
              Lecture Video URL
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                link
              </span>
              <input
                className="w-full h-12 pl-11 pr-24 rounded-xl bg-surface-container-lowest border border-surface-container-high/60 font-body-md text-body-md text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                type="url"
                value={youtubeUrl}
                onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
              <button
                onClick={() => setIsYoutubeInspected(true)}
                className="absolute right-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors cursor-pointer font-semibold"
              >
                Inspect
              </button>
            </div>
          </div>

          {/* Detected Video Snippet Card */}
          {isYoutubeInspected && (
            <div className="p-space-sm rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-high/60 flex items-center gap-space-sm">
              <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  alt="YouTube lecture thumbnail on OSI Model"
                  src={ASSETS.youtubeThumbnail}
                />
                <div className="absolute inset-0 bg-inverse-surface/30 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-surface/90 text-primary flex items-center justify-center shadow-sm">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col min-w-0 pr-1">
                <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                  OSI Model Explained in 20 Minutes (CS Lecture 4)
                </span>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Channel: Prof. Code</p>
                <div className="flex items-center gap-1 mt-0.5 text-tertiary">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold">
                    Transcript ready • 21:04 mins
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CONTENT OPTION 3: Notes Area Accordion / Tab */}
      {sourceTab === 'notes' && (
        <div className="flex flex-col gap-space-sm mb-space-lg">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-label-md text-on-surface-variant font-medium">
              Raw Lecture Notes
            </label>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">
              {notesContent.trim().split(/\s+/).length} words pasted
            </span>
          </div>
          <div className="relative">
            <textarea
              className="w-full p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 font-body-md text-body-md text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              rows={4}
              value={notesContent}
              onChange={e => setNotesContent(e.target.value)}
              placeholder="Paste notes, syllabus formulas, or study topics here..."
            />
            <button
              onClick={handleCleanNotes}
              className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-container-highest transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">cleaning_services</span>
              Clean up
            </button>
          </div>
        </div>
      )}

      {/* SECTION: Story Customization */}
      <div className="p-space-lg rounded-3xl bg-surface-container-low shadow-sm border border-surface-container-high/60 flex flex-col gap-space-lg mt-space-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Customize Your Story</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium border border-surface-container-highest/60">
            Personalized AI
          </span>
        </div>

        {/* 1. Story Style (Selectable Chips) */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface font-bold tracking-tight">
              1. Story World & Genre
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Select 1</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => {
              const isSelected = selectedStyle === genre.label;
              return (
                <button
                  key={genre.label}
                  onClick={() => setSelectedStyle(genre.label)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md shadow-sm transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high/60'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isSelected ? 'text-on-primary' : 'text-primary'
                    }`}
                    style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {genre.icon}
                  </span>
                  <span>{genre.label}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[15px] ml-0.5">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Difficulty Level (Segmented Switch) */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md text-on-surface font-bold tracking-tight">
            2. Academic Depth
          </span>
          <div className="flex items-center p-1 rounded-2xl bg-surface-container-highest shadow-inner">
            {['Beginner', 'Intermediate', 'Advanced'].map(depth => {
              const isActive = selectedDepth === depth;
              return (
                <button
                  key={depth}
                  onClick={() => setSelectedDepth(depth)}
                  className={`flex-1 py-2 rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {isActive && (
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  )}
                  <span>{depth}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Story Length (Pill Selector) */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-md text-label-md text-on-surface font-bold tracking-tight">
            3. Estimated Story Length
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 'Short', time: '~5 mins' },
              { type: 'Medium', time: '~12 mins' },
              { type: 'Detailed', time: '~25 mins' }
            ].map(lengthItem => {
              const isActive = selectedLength === lengthItem.type;
              return (
                <button
                  key={lengthItem.type}
                  onClick={() => setSelectedLength(lengthItem.type)}
                  className={`p-2.5 rounded-2xl font-label-md text-label-md flex flex-col items-center justify-center shadow-sm text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high/60'
                  }`}
                >
                  <div className="flex items-center gap-1 font-bold">
                    <span>{lengthItem.type}</span>
                    {isActive && (
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    )}
                  </div>
                  <span
                    className={`font-label-sm text-label-sm ${
                      isActive ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                    }`}
                  >
                    {lengthItem.time}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Language Selector */}
        <div className="flex flex-col gap-space-sm relative">
          <span className="font-label-md text-label-md text-on-surface font-bold tracking-tight">
            4. Narration Language
          </span>
          <div className="relative">
            <div
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="w-full h-12 px-space-md rounded-2xl bg-surface-container-lowest border border-surface-container-high/60 shadow-sm flex items-center justify-between cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">language</span>
                <span className="font-label-lg text-label-lg text-on-surface">
                  {selectedLanguage}
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                {isLangDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </div>

            {/* Language Dropdown */}
            {isLangDropdownOpen && (
              <div className="absolute top-14 left-0 right-0 z-30 rounded-2xl bg-surface-container-lowest shadow-xl border border-surface-container-high p-1.5 flex flex-col gap-1">
                {languages.map(lang => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left font-label-md text-label-md flex items-center justify-between cursor-pointer transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-surface-container text-primary font-bold'
                        : 'hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLanguage === lang && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. Learning Goals (Multi-select Tag Chips) */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex justify-between items-center">
            <span className="font-label-md text-label-md text-on-surface font-bold tracking-tight">
              5. Target Learning Goals
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Multi-select</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {goalsList.map(goal => {
              const isActive = selectedGoals.includes(goal);
              return (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md shadow-sm transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-surface-container-high/60'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[15px] ${
                      isActive ? 'text-on-primary' : 'text-on-surface-variant'
                    }`}
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {isActive ? 'check_circle' : 'add_circle'}
                  </span>
                  <span>{goal}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Large Action CTA Button */}
      <div className="flex flex-col items-center mt-space-lg gap-space-xs">
        <button
          onClick={handleSubmit}
          className="w-full h-14 rounded-full bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary font-headline-md text-headline-md flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(79,57,246,0.35)] transition-all active:scale-95 hover:shadow-[0_12px_28px_rgba(79,57,246,0.45)] cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            auto_stories
          </span>
          <span>Create My Learning Story</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
        <div className="flex items-center gap-1 text-on-surface-variant mt-1 text-center">
          <span
            className="material-symbols-outlined text-[14px] text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            timer
          </span>
          <span className="font-label-sm text-label-sm">
            Estimated processing: ~35 seconds • Academic accuracy guaranteed
          </span>
        </div>
      </div>
    </div>
  );
};
