"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, Play, RefreshCw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Simulator() {
  const [semaphoreValue, setSemaphoreValue] = useState(1);
  const [readyProcesses, setReadyProcesses] = useState<number[]>([]);
  const [activeProcesses, setActiveProcesses] = useState<number[]>([]);
  const [blockedProcesses, setBlockedProcesses] = useState<number[]>([]);
  const [completedProcesses, setCompletedProcesses] = useState<number[]>([]);
  const [processCounter, setProcessCounter] = useState(1);
  const [isAnimatingSignal, setIsAnimatingSignal] = useState(false);

  const handleSpawn = () => {
    const pid = processCounter;
    setProcessCounter((p) => p + 1);
    setReadyProcesses((prev) => [...prev, pid]);
  };

  const handleWait = () => {
    if (readyProcesses.length === 0) return;

    const [pid, ...remainingReady] = readyProcesses;
    setReadyProcesses(remainingReady);
    
    const newSemaphoreValue = semaphoreValue - 1;
    setSemaphoreValue(newSemaphoreValue);
    
    if (newSemaphoreValue < 0) {
      setBlockedProcesses((prev) => [...prev, pid]);
    } else {
      setActiveProcesses((prev) => [...prev, pid]);
    }
  };

  const handleSignal = () => {
    // Start animation
    setIsAnimatingSignal(true);
    
    // A process is leaving the critical section
    if (activeProcesses.length > 0) {
      const [leavingPid, ...remainingActive] = activeProcesses;
      setActiveProcesses(remainingActive);
      setCompletedProcesses((prev) => [...prev, leavingPid]);
    }

    const newSemaphoreValue = semaphoreValue + 1;
    setSemaphoreValue(newSemaphoreValue);

    // If there's a blocked process, wake it up (delayed to match animation if we want, but logic happens now)
    if (blockedProcesses.length > 0) {
      const [wokenPid, ...remainingBlocked] = blockedProcesses;
      // We'll use a timeout or animation completion callback to actually move the process
      setTimeout(() => {
        setBlockedProcesses(remainingBlocked);
        setActiveProcesses((prev) => [...prev, wokenPid]);
        setIsAnimatingSignal(false);
      }, 600); // Match animation duration
    } else {
      setTimeout(() => setIsAnimatingSignal(false), 600);
    }
  };

  const handleReset = () => {
    setSemaphoreValue(1);
    setReadyProcesses([]);
    setActiveProcesses([]);
    setBlockedProcesses([]);
    setCompletedProcesses([]);
    setProcessCounter(1);
    setIsAnimatingSignal(false);
  };

  return (
    <div className="flex flex-col min-h-screen max-w-5xl mx-auto w-full p-6 pb-20">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-border-color rounded-full transition-colors">
            <ArrowLeft className="w-8 h-8 text-foreground" />
          </Link>
          <h1 className="text-3xl font-extrabold flex items-center gap-3 text-secondary">
            <Activity /> Interactive Simulator
          </h1>
        </div>
        <button 
          onClick={handleReset}
          className="p-3 bg-border-color hover:bg-border-color/80 rounded-full transition-colors"
          title="Reset Simulator"
        >
          <RefreshCw className="w-6 h-6 text-foreground" />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls and Semaphore State */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="bg-card-bg border-4 border-border-color rounded-3xl p-8 text-center flex flex-col items-center justify-center shadow-sm">
            <h2 className="text-xl font-bold text-foreground/60 uppercase tracking-wider mb-2">Semaphore S</h2>
            <motion.div 
              key={semaphoreValue}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-7xl font-black ${semaphoreValue < 0 ? 'text-error' : semaphoreValue === 0 ? 'text-orange-500' : 'text-primary'}`}
            >
              {semaphoreValue}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSpawn}
              className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white text-xl font-bold rounded-2xl button-3d button-3d-success flex justify-center items-center gap-2"
            >
              <Play className="w-6 h-6 rotate-90" /> SPAWN Process
            </button>
            <p className="text-xs text-foreground/50 text-center px-4 -mt-2">
              Creates a new process P{processCounter} in the Ready Queue
            </p>

            <button 
              onClick={handleWait}
              disabled={readyProcesses.length === 0}
              className={`w-full py-4 px-6 bg-error hover:bg-red-600 text-white text-xl font-bold rounded-2xl button-3d button-3d-error flex justify-center items-center gap-2 mt-2 ${readyProcesses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Activity className="w-6 h-6" /> TRIGGER Wait(S)
            </button>
            <p className="text-xs text-foreground/50 text-center px-4 -mt-2">
              Decrement S. If S &lt; 0 → block the calling process
            </p>

            <button 
              onClick={handleSignal}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white text-xl font-bold rounded-2xl button-3d button-3d-primary flex justify-center items-center gap-2 mt-2"
            >
              <LogOut className="w-6 h-6" /> TRIGGER Signal(S)
            </button>
            <p className="text-xs text-foreground/50 text-center px-4 -mt-2">
              Increment S. If S ≤ 0 → unblock a waiting process
            </p>
          </div>
        </div>

        {/* Queues */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-64 overflow-y-auto relative">
            <h3 className="font-bold text-emerald-500 mb-4 border-b-2 border-border-color pb-2">
              Ready Queue
            </h3>
            <div className="flex-1 flex flex-wrap content-start gap-3">
              <AnimatePresence>
                {readyProcesses.map(pid => (
                  <motion.div
                    key={pid}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0, x: 20 }}
                    className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
                  >
                    P{pid}
                  </motion.div>
                ))}
                {readyProcesses.length === 0 && (
                  <p className="text-foreground/40 w-full text-center mt-8 italic text-sm">Empty</p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-64 overflow-y-auto">
            <h3 className="font-bold text-primary mb-4 border-b-2 border-border-color pb-2">
              Active / Critical Section
            </h3>
            <div className="flex-1 flex flex-wrap content-start gap-3">
              <AnimatePresence>
                {activeProcesses.map(pid => (
                  <motion.div
                    key={pid}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
                  >
                    P{pid}
                  </motion.div>
                ))}
                {activeProcesses.length === 0 && (
                  <p className="text-foreground/40 w-full text-center mt-8 italic text-sm">Empty</p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-64 overflow-y-auto relative">
            <h3 className="font-bold text-error mb-4 border-b-2 border-border-color pb-2">
              Blocked Queue
            </h3>
            <div className="flex-1 flex flex-wrap content-start gap-3">
              <AnimatePresence>
                {blockedProcesses.map((pid, idx) => (
                  <motion.div
                    key={pid}
                    layout
                    initial={{ scale: 0, opacity: 0, x: 50 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: idx === 0 && isAnimatingSignal ? "#ffffff" : "var(--error)"
                    }}
                    transition={{ duration: 0.3 }}
                    exit={{ scale: 0, opacity: 0, x: -50 }}
                    className={`w-12 h-12 bg-error text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md opacity-80 ${idx === 0 && isAnimatingSignal ? 'animate-smash' : ''}`}
                  >
                    P{pid}
                  </motion.div>
                ))}
                {blockedProcesses.length === 0 && (
                  <p className="text-foreground/40 w-full text-center mt-8 italic text-sm">Empty</p>
                )}
              </AnimatePresence>

              {/* Signal Pulse Animation Overlay */}
              <AnimatePresence>
                {isAnimatingSignal && blockedProcesses.length > 0 && (
                  <motion.div
                    initial={{ x: -100, opacity: 0, scale: 0.5 }}
                    animate={{ 
                      x: 0, 
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1.2, 1.5, 2],
                      rotate: [0, 90, 180, 270]
                    }}
                    transition={{ duration: 0.6, ease: "easeIn" }}
                    className="absolute top-1/2 left-0 w-12 h-12 bg-primary rounded-full z-10 flex items-center justify-center shadow-xl border-4 border-white"
                  >
                    <Activity className="text-white w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:col-span-2 bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-40 overflow-y-auto">
            <h3 className="font-bold text-foreground/50 mb-4 border-b-2 border-border-color pb-2">
              Completed
            </h3>
            <div className="flex-1 flex flex-wrap content-start gap-3">
              <AnimatePresence>
                {completedProcesses.map(pid => (
                  <motion.div
                    key={pid}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 bg-border-color text-foreground/60 rounded-xl flex items-center justify-center font-bold text-lg"
                  >
                    P{pid}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
