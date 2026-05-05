"use client";

import Link from "next/link";
import { BookOpen, Gamepad2, Activity, Lightbulb, Laptop } from "lucide-react";
import { useState } from "react";

const modules = [
  {
    id: "theory",
    title: "Theory & POSIX",
    description: "Learn definitions, Mutex, and practical POSIX code.",
    icon: <BookOpen className="w-10 h-10 text-white" />,
    href: "/theory",
    color: "bg-primary",
    hoverColor: "hover:bg-primary-hover",
    shadow: "button-3d-primary"
  },
  {
    id: "simulator",
    title: "Interactive Simulator",
    description: "Watch processes get blocked and unblocked in real-time.",
    icon: <Activity className="w-10 h-10 text-white" />,
    href: "/simulator",
    color: "bg-secondary",
    hoverColor: "hover:bg-blue-600",
    shadow: "button-3d-secondary"
  },
  {
    id: "examples",
    title: "Famous Examples & Exams",
    description: "Classic problems + all Test 1 exam exercises with solutions.",
    icon: <Lightbulb className="w-10 h-10 text-white" />,
    href: "/examples",
    color: "bg-orange-500",
    hoverColor: "hover:bg-orange-600",
    shadow: "box-shadow-orange"
  },
  {
    id: "game",
    title: "Practice Quizzes",
    description: "28 questions covering theory + all exam subjects.",
    icon: <Gamepad2 className="w-10 h-10 text-white" />,
    href: "/game",
    color: "bg-purple-500",
    hoverColor: "hover:bg-purple-600",
    shadow: "box-shadow-purple"
  }
];

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-6 bg-background relative overflow-hidden transition-colors duration-300">
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center space-y-4 mb-12">
        <div 
          className="laptop-logo-wrapper cursor-pointer mb-2 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`laptop-logo-inner ${isHovered ? 'is-spinning' : ''}`}>
            <div className="bg-primary/20 p-6 rounded-full backdrop-blur-sm border-2 border-primary/30">
              <Laptop className="w-16 h-16 text-primary" />
            </div>
          </div>
          {/* Glow ring on hover */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isHovered ? 'shadow-[0_0_40px_rgba(88,204,2,0.4)]' : ''}`} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          OS2 Semaphore <span className="text-primary">Hub</span>
        </h1>
        <p className="text-lg text-foreground/70 max-w-xl">
          Everything you need to master Wait, Signal, Mutex, and classic synchronization problems.
        </p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {modules.map((mod) => (
          <Link 
            key={mod.id} 
            href={mod.href}
            className={`flex items-start gap-4 p-6 rounded-3xl button-3d transition-all ${mod.color} ${mod.hoverColor} group`}
            style={{ boxShadow: `0 6px 0 rgba(0,0,0,0.2)` }}
          >
            <div className="bg-white/20 p-4 rounded-2xl">
              {mod.icon}
            </div>
            <div className="text-left flex-1">
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:scale-105 transition-transform origin-left">
                {mod.title}
              </h2>
              <p className="text-white/80 font-medium">
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
