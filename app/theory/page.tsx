"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Code, Terminal } from "lucide-react";

export default function Theory() {
  return (
    <div className="flex flex-col min-h-screen max-w-3xl mx-auto w-full p-6 pb-20">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 hover:bg-border-color rounded-full transition-colors">
          <ArrowLeft className="w-8 h-8 text-foreground" />
        </Link>
        <h1 className="text-3xl font-extrabold ml-4 flex items-center gap-3">
          <BookOpen className="text-primary" /> Theory & POSIX
        </h1>
      </header>

      <div className="space-y-8">
        
        {/* Definition Section */}
        <section className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">What is a Semaphore?</h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            A semaphore is fundamentally an <strong>integer variable</strong> that is used to synchronize processes and solve critical section problems. It is accessed only through two standard atomic operations: <code>wait()</code> and <code>signal()</code>.
          </p>
        </section>

        {/* Operations Section */}
        <section className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-4">The Atomic Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-error/10 border-2 border-error/20 p-4 rounded-2xl">
              <h3 className="font-bold text-error text-xl mb-2">Wait (P)</h3>
              <p className="text-foreground/80">
                Decrements the semaphore value. If the resulting value becomes negative, the process executing <code>wait()</code> is blocked.
              </p>
            </div>
            <div className="bg-primary/10 border-2 border-primary/20 p-4 rounded-2xl">
              <h3 className="font-bold text-primary text-xl mb-2">Signal (V)</h3>
              <p className="text-foreground/80">
                Increments the semaphore value. If the value is less than or equal to zero, a blocked process is removed from the queue and awakened.
              </p>
            </div>
          </div>
        </section>

        {/* POSIX Section */}
        <section className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-purple-500 mb-4 flex items-center gap-2">
            <Code /> POSIX Implementations (Practical)
          </h2>
          <p className="text-lg text-foreground/80 mb-4">
            In C/C++ (Linux/Unix), semaphores are included via <code>&lt;semaphore.h&gt;</code> and use the <code>sem_t</code> type.
          </p>
          
          <div className="space-y-4">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-gray-400 mb-1">// Initialization</p>
              <p><span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">sem_init</span>(<span className="text-[#4ec9b0]">sem_t</span> *sem, <span className="text-[#569cd6]">int</span> pshared, <span className="text-[#569cd6]">unsigned int</span> value);</p>
            </div>

            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-gray-400 mb-1">// Wait operation (P)</p>
              <p><span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">sem_wait</span>(<span className="text-[#4ec9b0]">sem_t</span> *sem);</p>
            </div>

            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-gray-400 mb-1">// Signal operation (V)</p>
              <p><span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">sem_post</span>(<span className="text-[#4ec9b0]">sem_t</span> *sem);</p>
            </div>

            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
              <p className="text-gray-400 mb-1">// Get value & Destroy</p>
              <p><span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">sem_getvalue</span>(<span className="text-[#4ec9b0]">sem_t</span> *sem, <span className="text-[#569cd6]">int</span> *sval);</p>
              <p><span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">sem_destroy</span>(<span className="text-[#4ec9b0]">sem_t</span> *sem);</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
