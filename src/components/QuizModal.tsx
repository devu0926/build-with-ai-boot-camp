import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { StoryChapter } from '../data/mockData';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: StoryChapter;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, chapter }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const questions = chapter.quizQuestions || [];
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      if (score >= 1) {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-md rounded-3xl p-6 shadow-2xl border border-surface-container-high flex flex-col gap-4 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">quiz</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Knowledge Check</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[220px]">
                {chapter.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div className="flex flex-col gap-4">
            {/* Progress Counter */}
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="font-semibold text-primary">Score: {score}</span>
            </div>

            {/* Question Text */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60">
              <p className="font-headline-md text-lg text-on-surface font-semibold leading-snug">
                {currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'bg-surface-container-lowest border-surface-container-high hover:border-primary/40 text-on-surface';

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary font-bold';
                  } else if (idx === selectedAnswer) {
                    btnStyle = 'bg-error-container text-on-error-container border-error';
                  } else {
                    btnStyle = 'bg-surface-container-lowest opacity-50 border-surface-container-high';
                  }
                } else if (selectedAnswer === idx) {
                  btnStyle = 'bg-primary-container text-on-primary border-primary font-bold shadow-sm';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`p-3.5 rounded-xl border text-left font-label-md text-label-md flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && idx === currentQ.correctIndex && (
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    )}
                    {isAnswerSubmitted && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after submit */}
            {isAnswerSubmitted && (
              <div className="p-3 rounded-xl bg-surface-container-high text-xs text-on-surface flex flex-col gap-1 border border-primary/20">
                <span className="font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span> Concept Explanation:
                </span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Action button */}
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
                className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary-container disabled:opacity-50 transition-all cursor-pointer"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-primary transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-md">
              <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                military_tech
              </span>
            </div>

            <div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Quiz Completed!</h4>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                You scored <strong className="text-primary font-bold">{score}</strong> out of{' '}
                <strong>{questions.length}</strong>!
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex items-center justify-around">
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant">Retention Boost</span>
                <span className="font-headline-md text-headline-md text-tertiary font-bold">+18%</span>
              </div>
              <div className="w-px h-8 bg-surface-container-high"></div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant">XP Earned</span>
                <span className="font-headline-md text-headline-md text-secondary font-bold">+{score * 20} XP</span>
              </div>
            </div>

            <div className="flex gap-2 w-full pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 py-3 rounded-full bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high cursor-pointer font-semibold"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary-container cursor-pointer font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
