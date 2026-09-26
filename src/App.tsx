import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ProfileModal } from './components/ProfileModal';
import { QuizModal } from './components/QuizModal';
import { HomeScreen } from './screens/HomeScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { CreateScreen } from './screens/CreateScreen';
import { GeneratingScreen } from './screens/GeneratingScreen';
import { StoryReaderScreen } from './screens/StoryReaderScreen';
import { MyStoriesScreen } from './screens/MyStoriesScreen';
import { RemindersScreen } from './screens/RemindersScreen';
import { INITIAL_CHAPTER_OSI, INITIAL_STORIES, StoryChapter } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [historyStack, setHistoryStack] = useState<string[]>(['home']);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [quizChapter, setQuizChapter] = useState<StoryChapter | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(true);
  const [generatingTitle, setGeneratingTitle] = useState<string>('The Seven Kingdoms of Network City');

  const navigateTo = (tab: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHistoryStack(prev => [...prev, tab]);
    setCurrentTab(tab);
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop(); // remove current
      const prevTab = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setCurrentTab(prevTab);
    } else {
      setCurrentTab('home');
    }
  };

  const handleOpenStory = (storyId?: string) => {
    console.log('Opening story:', storyId);
    navigateTo('reader');
  };

  const handleStartGeneration = (options: {
    sourceType: 'pdf' | 'youtube' | 'notes';
    title: string;
    style: string;
    depth: string;
    length: string;
    language: string;
    goals: string[];
    notesContent?: string;
  }) => {
    setGeneratingTitle(options.title || 'The Seven Kingdoms of Network City');
    navigateTo('generating');
  };

  const handleGenerationComplete = () => {
    navigateTo('reader');
  };

  const handleOpenQuiz = (item: StoryChapter | string) => {
    if (typeof item === 'string') {
      const found = INITIAL_STORIES.find(s => s.id === item);
      setQuizChapter(found?.chapters[0] || INITIAL_CHAPTER_OSI);
    } else {
      setQuizChapter(item);
    }
  };

  const handleScheduleReminder = (subject: string, storyTitle: string) => {
    console.log('Scheduling reminder for:', subject, storyTitle);
    navigateTo('reminders');
  };

  const showBackButton = currentTab === 'reader' || currentTab === 'generating';
  const showBottomNav = currentTab !== 'generating';

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative selection:bg-primary-container selection:text-on-primary">
      {/* Persistent Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenProfile={() => setIsProfileOpen(true)}
        showBack={showBackButton}
        onBack={handleBack}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
        titleOverride={currentTab === 'reader' ? 'Story Reader' : undefined}
      />

      {/* Screen Render Switch */}
      <main className="flex-1 w-full pt-16 flex flex-col">
        {currentTab === 'home' && (
          <HomeScreen onNavigate={navigateTo} onOpenStory={handleOpenStory} />
        )}

        {currentTab === 'dashboard' && (
          <DashboardScreen
            onNavigate={navigateTo}
            onOpenStory={handleOpenStory}
            onOpenRevision={() => navigateTo('reminders')}
          />
        )}

        {currentTab === 'create' && (
          <CreateScreen onStartGeneration={handleStartGeneration} />
        )}

        {currentTab === 'generating' && (
          <GeneratingScreen
            storyTitle={generatingTitle}
            onComplete={handleGenerationComplete}
          />
        )}

        {currentTab === 'reader' && (
          <StoryReaderScreen
            chapter={INITIAL_CHAPTER_OSI}
            onNavigate={navigateTo}
            onOpenQuiz={handleOpenQuiz}
            onScheduleReminder={handleScheduleReminder}
          />
        )}

        {currentTab === 'my-stories' && (
          <MyStoriesScreen
            onNavigate={navigateTo}
            onOpenStory={handleOpenStory}
            onOpenQuiz={handleOpenQuiz}
          />
        )}

        {currentTab === 'reminders' && (
          <RemindersScreen
            onRevise={(subject, title) => {
              console.log('Revising:', subject, title);
              handleOpenStory();
            }}
          />
        )}
      </main>

      {/* Persistent Floating Bottom Nav */}
      {showBottomNav && (
        <BottomNav currentTab={currentTab} onNavigate={navigateTo} />
      )}

      {/* Profile & Settings Slide-over / Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Knowledge Check Quiz Modal */}
      {quizChapter && (
        <QuizModal
          isOpen={!!quizChapter}
          chapter={quizChapter}
          onClose={() => setQuizChapter(null)}
        />
      )}
    </div>
  );
}
