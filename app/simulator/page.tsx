"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, Play, RefreshCw, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Simulator() {
  const [semaphoreValue, setSemaphoreValue] = useState(1);
  const [activeProcesses, setActiveProcesses] = useState<number[]>([]);
  const [blockedProcesses, setBlockedProcesses] = useState<number[]>([]);
  const [completedProcesses, setCompletedProcesses] = useState<number[]>([]);
  const [processCounter, setProcessCounter] = useState(1);

  const handleWait = () => {
    const pid = processCounter;
    setProcessCounter((p) => p + 1);
    
    setSemaphoreValue((prev) => prev - 1);
    
    if (semaphoreValue - 1 < 0) {
      setBlockedProcesses((prev) => [...prev, pid]);
    } else {
      setActiveProcesses((prev) => [...prev, pid]);
    }
  };

  const handleSignal = () => {
    // A process is leaving the critical section
    if (activeProcesses.length > 0) {
      const [leavingPid, ...remainingActive] = activeProcesses;
      setActiveProcesses(remainingActive);
      setCompletedProcesses((prev) => [...prev, leavingPid]);
    }

    setSemaphoreValue((prev) => prev + 1);

    // If there's a blocked process, wake it up
    if (blockedProcesses.length > 0) {
      const [wokenPid, ...remainingBlocked] = blockedProcesses;
      setBlockedProcesses(remainingBlocked);
      setActiveProcesses((prev) => [...prev, wokenPid]);
    }
  };

  const handleReset = () => {
    setSemaphoreValue(1);
    setActiveProcesses([]);
    setBlockedProcesses([]);
    setCompletedProcesses([]);
    setProcessCounter(1);
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
              onClick={handleWait}
              className="w-full py-4 px-6 bg-error hover:bg-red-600 text-white text-xl font-bold rounded-2xl button-3d button-3d-error flex justify-center items-center gap-2"
            >
              <Play className="w-6 h-6" /> TRIGGER Wait()
            </button>
            <p className="text-sm text-foreground/60 text-center px-4">
              Decrements S. Spawns a process. If S &lt; 0, it blocks.
            </p>

            <button 
              onClick={handleSignal}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white text-xl font-bold rounded-2xl button-3d button-3d-primary flex justify-center items-center gap-2 mt-4"
            >
              <LogOut className="w-6 h-6" /> TRIGGER Signal()
            </button>
            <p className="text-sm text-foreground/60 text-center px-4">
              Increments S. Active process completes. If S &lt;= 0, unblocks a process.
            </p>
          </div>
        </div>

        {/* Queues */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-80 overflow-y-auto">
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
                    className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md"
                  >
                    P{pid}
                  </motion.div>
                ))}
                {activeProcesses.length === 0 && (
                  <p className="text-foreground/40 w-full text-center mt-8 italic">Empty</p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 flex flex-col h-80 overflow-y-auto">
            <h3 className="font-bold text-error mb-4 border-b-2 border-border-color pb-2">
              Blocked Queue
            </h3>
            <div className="flex-1 flex flex-wrap content-start gap-3">
              <AnimatePresence>
                {blockedProcesses.map(pid => (
                  <motion.div
                    key={pid}
                    layout
                    initial={{ scale: 0, opacity: 0, x: 50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0, opacity: 0, x: -50 }}
                    className="w-16 h-16 bg-error text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md opacity-80"
                  >
                    P{pid}
                  </motion.div>
                ))}
                {blockedProcesses.length === 0 && (
                  <p className="text-foreground/40 w-full text-center mt-8 italic">Empty</p>
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
