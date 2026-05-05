"use client";

import { useState } from "react";
import { levels, Level } from "@/lib/levels";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Confetti from "@/components/Confetti";

export default function Game() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'game_over' | 'completed'>('playing');

  const level = levels[currentLevelIndex];
  const totalLevels = levels.length;
  const progress = (currentLevelIndex / totalLevels) * 100;

  const handleSelect = (option: string) => {
    if (isChecked) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    
    const correct = selectedOption === level.correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);

    if (!correct) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => setGameState('game_over'), 1500);
        }
        return newLives;
      });
    }
  };

  const handleNext = () => {
    if (currentLevelIndex + 1 < totalLevels) {
      setCurrentLevelIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
      setIsCorrect(false);
    } else {
      setGameState('completed');
    }
  };

  const resetGame = () => {
    setCurrentLevelIndex(0);
    setLives(3);
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
    setGameState('playing');
  };

  if (gameState === 'game_over') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6">
        <Heart className="w-24 h-24 text-border-color animate-pulse" />
        <h1 className="text-4xl font-extrabold text-foreground">Out of lives!</h1>
        <p className="text-xl text-foreground/70">Don't worry, Semaphores can be tricky. Try again!</p>
        <button 
          onClick={resetGame}
          className="w-full max-w-sm py-4 px-8 bg-secondary hover:bg-secondary/90 text-white text-xl font-bold rounded-2xl button-3d button-3d-secondary"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  if (gameState === 'completed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-6 relative">
        <Confetti trigger={true} />
        <div className="bg-primary/20 p-8 rounded-full mb-4">
          <Check className="w-24 h-24 text-primary" strokeWidth={3} />
        </div>
        <h1 className="text-4xl font-extrabold text-primary">Lesson Complete!</h1>
        <p className="text-xl text-foreground/70 max-w-md">
          You've mastered the basics of Wait, Signal, and Mutex in OS2!
        </p>
        <Link 
          href="/"
          className="w-full max-w-sm py-4 px-8 bg-primary hover:bg-primary-hover text-white text-xl font-bold rounded-2xl button-3d button-3d-primary mt-8 inline-block"
        >
          CONTINUE
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto w-full relative pb-40">
      {/* Header: Progress & Lives */}
      <header className="flex items-center justify-between p-6 gap-4">
        <Link href="/">
          <X className="w-8 h-8 text-foreground/50 hover:text-foreground cursor-pointer" />
        </Link>
        <div className="flex-1 h-4 bg-border-color rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="flex items-center gap-2 font-bold text-error">
          <Heart className="w-8 h-8 fill-error text-error" />
          <span className="text-xl">{lives}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevelIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-foreground mt-4">
              {level.question}
            </h2>

            <div className="flex flex-col gap-4">
              {level.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const isCorrectOption = option === level.correctAnswer;
                
                let optionClasses = "border-2 p-4 rounded-2xl text-lg font-medium transition-all duration-200 cursor-pointer text-left ";
                
                if (isChecked) {
                  if (isSelected && isCorrect) {
                    optionClasses += "border-primary bg-primary/10 text-primary";
                  } else if (isSelected && !isCorrect) {
                    optionClasses += "border-error bg-error/10 text-error animate-shake";
                  } else if (isCorrectOption && !isCorrect) {
                    optionClasses += "border-primary bg-primary/10 text-primary";
                  } else {
                    optionClasses += "border-border-color text-foreground/50 opacity-50";
                  }
                } else {
                  if (isSelected) {
                    optionClasses += "border-secondary bg-secondary/10 text-secondary button-3d button-3d-secondary";
                  } else {
                    optionClasses += "border-border-color hover:bg-border-color/30 text-foreground button-3d";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    disabled={isChecked}
                    className={optionClasses}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 p-6 border-t-2 ${
        !isChecked ? 'bg-background border-transparent' : 
        isCorrect ? 'bg-primary/10 border-primary' : 'bg-error/10 border-error'
      }`}>
        <div className="max-w-2xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex-1">
            {isChecked && (
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 text-2xl font-extrabold ${isCorrect ? 'text-primary' : 'text-error'}`}>
                  {isCorrect ? (
                    <><Check className="w-8 h-8" strokeWidth={3} /> Excellent!</>
                  ) : (
                    <><X className="w-8 h-8" strokeWidth={3} /> Not quite</>
                  )}
                </div>
                {!isCorrect && (
                  <p className="text-error/80 mt-2 font-medium">Correct answer: {level.correctAnswer}</p>
                )}
                <p className={`mt-2 ${isCorrect ? 'text-primary/80' : 'text-error/80'} text-sm`}>
                  {level.explanation}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={isChecked ? handleNext : handleCheck}
            disabled={!selectedOption && !isChecked}
            className={`w-full md:w-auto min-w-[150px] py-4 px-8 text-xl font-bold rounded-2xl button-3d transition-all ${
              !selectedOption && !isChecked ? 'bg-border-color text-foreground/50 cursor-not-allowed shadow-none' :
              isChecked && !isCorrect ? 'bg-error text-white button-3d-error' :
              'bg-primary text-white button-3d-primary'
            }`}
          >
            {isChecked ? 'CONTINUE' : 'CHECK'}
          </button>
        </div>
      </div>
    </div>
  );
}
