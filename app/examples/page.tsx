"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lightbulb, Train, Scissors, Utensils, FileText, ChevronDown, ChevronUp, GraduationCap, Eye } from "lucide-react";

const SolutionCard = ({ title, text }: { title: string, text: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold uppercase text-primary hover:text-primary-hover transition-colors"
      >
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {isOpen ? "Hide Solution" : "Show Solution"}
      </button>
      {isOpen && (
        <div className="bg-border-color/30 p-4 rounded-xl mt-3 animate-[fadeIn_0.2s_ease-in-out]">
          <h3 className="font-bold mb-2 text-sm uppercase text-foreground/60">{title}</h3>
          <div className="text-sm font-medium leading-relaxed">{text}</div>
        </div>
      )}
    </div>
  );
};

const ExamScannedViewer = ({ pages, label }: { pages: string[], label: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-4">
      <button onClick={() => setShow(!show)} className="flex items-center gap-2 text-sm font-bold uppercase text-secondary hover:text-secondary/80 transition-colors">
        <Eye className="w-4 h-4" />
        {show ? "Hide Original Scan" : "View Original Scan"}
      </button>
      {show && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-foreground/50 font-medium">{label}</p>
          {pages.map((src, i) => (
            <div key={i} className="border-2 border-border-color rounded-xl overflow-hidden">
              <Image src={src} alt={`Exam page ${i+1}`} width={800} height={1130} className="w-full h-auto" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const examExercises = [
  {
    id: "sujet-a-g4",
    date: "27/11/2024 (13h30)",
    variant: "Subject A – G4",
    icon: <GraduationCap className="w-12 h-12 text-rose-500" />,
    iconBg: "bg-rose-100 dark:bg-rose-900/30",
    courseQuestion: "How does a mutual exclusion semaphore guarantee that only one process accesses a critical section at a time?",
    exercise: "Three processes P1, P2, P3 share global variables n (float=6) and m (int=6). Semaphores S1=1, S2=1.\n\nP1: wait(S1); wait(S2); n=n/3; m=m*2; signal(S2); signal(S1);\nP2: wait(S2); m=m+3; signal(S2);\nP3: wait(S1); n=n+5; signal(S1);",
    questions: [
      "1. Show that this solution is incorrect, and indicate which of the 3 conditions for correct mutual exclusion is NOT satisfied.",
      "2. Propose a correct solution using semaphores to always get: n=7 and m=18."
    ],
    solution: (
      <div className="space-y-4">
        <div>
          <p className="font-bold text-error mb-1">Q1: Progression is NOT verified</p>
          <p>If P1 holds S1 and waits for S2, while P2 holds S2 — P3 wants S1 but cannot enter even though its critical section is free. A process is blocked for a CS that is available.</p>
        </div>
        <div>
          <p className="font-bold text-primary mb-1">Q2: Correct order is P2 → P1 → P3</p>
          <p className="mb-2">P2: m=6+3=9 → P1: n=6/3=2, m=9×2=18 → P3: n=2+5=7</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1">
            <p>semaphore S1=0, S2=0;</p>
            <p className="mt-2">P1: wait(S1); n=n/3; m=m*2; signal(S2);</p>
            <p>P2: m=m+3; signal(S1);</p>
            <p>P3: wait(S2); n=n+5;</p>
          </div>
        </div>
      </div>
    ),
    scanPages: ["/test1/page_1.png"]
  },
  {
    id: "sujet-b-g2",
    date: "27/11/2024 (9h30)",
    variant: "Subject B – G2",
    icon: <GraduationCap className="w-12 h-12 text-indigo-500" />,
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    courseQuestion: "Why are semaphore-based solutions often preferred over busy-waiting (active waiting) solutions in operating systems?",
    exercise: "Two concurrent processes P1 (task T1) and P2 (task T2) run in infinite while(1) loops.",
    questions: [
      "1. Use a semaphore to guarantee T1 is never executed simultaneously with T2.",
      "2. Use two semaphores so execution order is strictly alternating: T2 T1 T2 T1 T2..."
    ],
    solution: (
      <div className="space-y-4">
        <div>
          <p className="font-bold text-primary mb-1">Q1: Mutual Exclusion</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs">
            <p>semaphore S = 1;</p>
            <p className="mt-1">P1: while(1) {"{"} wait(S); T1; signal(S); {"}"}</p>
            <p>P2: while(1) {"{"} wait(S); T2; signal(S); {"}"}</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-primary mb-1">Q2: Strict alternation T2→T1→T2...</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs">
            <p>semaphore S1 = 0, S2 = 1;</p>
            <p className="mt-1">P1: while(1) {"{"} wait(S1); T1; signal(S2); {"}"}</p>
            <p>P2: while(1) {"{"} wait(S2); T2; signal(S1); {"}"}</p>
          </div>
          <p className="mt-2 text-xs text-foreground/60">S2=1 → P2 starts first (T2). Signals S1 → P1 runs (T1). Signals S2 → cycle repeats.</p>
        </div>
      </div>
    ),
    scanPages: ["/test1/page_2.png", "/test1/page_7.png"]
  },
  {
    id: "sujet-b-g1",
    date: "28/11/2024 (9h30)",
    variant: "Subject B – G1",
    icon: <GraduationCap className="w-12 h-12 text-cyan-500" />,
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    courseQuestion: "1. Difference between a mutual exclusion semaphore and a general semaphore?\n2. What happens if a process executes wait on a semaphore whose value is 0?",
    exercise: "Exercise 1: semaphore a=1, b=1, c=0. P1 and P2 with numbered operations.\nExercise 2: semaphore a=0, b=1. P1, P2, P3 with tasks A1, A2, A3.",
    questions: [
      "1. Do P1 and P2 generate a deadlock? Justify.",
      "2. Choose the possible execution display from: A3 A2 A2 A1…, A2 A3 A2 A1…, A2 A3 A1 A2…, A2 A1 A3 A1…, A2 A1 A2 A1…"
    ],
    solution: (
      <div className="space-y-4">
        <div>
          <p className="font-bold text-error mb-1">Ex1: YES — Deadlock possible</p>
          <p className="text-sm">Interleaving 1→2→6→7→8→3: P2 holds b, waits on c. P1 then waits on b. Both blocked → deadlock.</p>
        </div>
        <div>
          <p className="font-bold text-primary mb-1">Ex2: Answers 2 and 5 are correct</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs mb-2">
            <p>semaphore a=0, b=1;</p>
            <p>P1: wait(a); A1; signal(b);</p>
            <p>P2: wait(b); A2; signal(a);</p>
            <p>P3: wait(a); A3; signal(b);</p>
          </div>
          <p className="text-sm">b=1 so P2 runs first (A2). Then signals a → P1 or P3 can go. Sequences like A2→A3→A2→A1 (Option 2) or A2→A1→A2→A1 (Option 5) are valid.</p>
        </div>
      </div>
    ),
    scanPages: ["/test1/page_3.png"]
  },
  {
    id: "sujet-b-g3",
    date: "28/11/2024 (11h00)",
    variant: "Subject B – G3",
    icon: <GraduationCap className="w-12 h-12 text-amber-500" />,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    courseQuestion: "Suppose task A executes before task B.\n1. When must a task execute 'wait' to respect execution order?\n2. When must a task execute 'signal' to allow another task to begin?",
    exercise: "Ex1: semaphore a=1, b=0, c=1. P1 and P2 with labeled operations. Can they deadlock?\nEx2: semaphore a=0, b=1. P1, P2, P3 — complete code for execution order A2-A1-A3-A2-A3-A2-A1-...",
    questions: [
      "1. Can P1 and P2 risk generating a deadlock? Justify.",
      "2. Complete P1, P2, P3 code to respect: A2-A1-A3-A2-A3-A2-A1-..."
    ],
    solution: (
      <div className="space-y-4">
        <div>
          <p className="font-bold text-error mb-1">Ex1: YES — Deadlock risk exists</p>
          <p className="text-sm">With certain interleavings (a→b&apos;→a→b→c→c&apos;→d&apos;→d), both processes wait on each other&apos;s resources.</p>
        </div>
        <div>
          <p className="font-bold text-primary mb-1">Ex2: Synchronization solution</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs">
            <p>P1: wait(a); A1; signal(b);</p>
            <p>P2: wait(b); A2; signal(a);</p>
            <p>P3: wait(a); A3; signal(b);</p>
          </div>
        </div>
      </div>
    ),
    scanPages: ["/test1/page_4.png"]
  },
  {
    id: "sujet-a-g5",
    date: "28/11/2024 (8h00)",
    variant: "Subject A – G5",
    icon: <GraduationCap className="w-12 h-12 text-emerald-500" />,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    courseQuestion: "Suppose task A executes before task B.\n1. When must a task execute 'wait'?\n2. When must a task execute 'signal'?",
    exercise: "Array T[10] of integers. Compute the sum using a shared variable 'sum' and two parallel processes: P1 (even indices), P2 (odd indices).",
    questions: [
      "Give the algorithms for P1 and P2 using a semaphore to guarantee correctness."
    ],
    solution: (
      <div className="space-y-3">
        <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1">
          <p>semaphore mutex = 1;</p>
          <p className="mt-2">void P1() {"{"} // even indices</p>
          <p className="pl-4">int i = 0;</p>
          <p className="pl-4">while (i &lt;= 9) {"{"}</p>
          <p className="pl-8 text-error">wait(mutex);</p>
          <p className="pl-8">sum = sum + T[i];</p>
          <p className="pl-8 text-primary">signal(mutex);</p>
          <p className="pl-8">i = i + 2;</p>
          <p className="pl-4">{"}"}</p>
          <p>{"}"}</p>
          <p className="mt-2">void P2() {"{"} // odd indices</p>
          <p className="pl-4">int j = 1;</p>
          <p className="pl-4">while (j &lt;= 10) {"{"}</p>
          <p className="pl-8 text-error">wait(mutex);</p>
          <p className="pl-8">sum = sum + T[j];</p>
          <p className="pl-8 text-primary">signal(mutex);</p>
          <p className="pl-8">j = j + 2;</p>
          <p className="pl-4">{"}"}</p>
          <p>{"}"}</p>
        </div>
        <p className="text-xs text-foreground/60">Note: i and j are local variables — only the shared variable &apos;sum&apos; needs mutex protection.</p>
      </div>
    ),
    scanPages: ["/test1/page_6.png"]
  },
  {
    id: "dec-18",
    date: "18/12/2024",
    variant: "Test – Dec 18",
    icon: <GraduationCap className="w-12 h-12 text-violet-500" />,
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
    courseQuestion: null,
    exercise: "Ex1: Compute (a+b)*c − d/(e−f). Each operation is a separate process. Synchronize with semaphores.\n\nEx2: Swimming pool with N baskets and M cabins (M≤N). A swimmer needs a basket, then a cabin to change, swims, then a cabin again to change back, then releases basket.",
    questions: [
      "Ex1: Propose a pseudo-code solution using semaphores.",
      "Ex2: Write the Swimmer() algorithm using semaphores 'basket' and 'cabin'."
    ],
    solution: (
      <div className="space-y-4">
        <div>
          <p className="font-bold text-primary mb-1">Ex1: Arithmetic expression</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1">
            <p>semaphore s1=0, s2=0, s3=0, s4=0;</p>
            <p>P_add: r1=a+b; signal(s1);</p>
            <p>P_sub: r2=e-f; signal(s2);</p>
            <p>P_mul: wait(s1); r3=r1*c; signal(s3);</p>
            <p>P_div: wait(s2); r4=d/r2; signal(s4);</p>
            <p>P_fin: wait(s3); wait(s4); result=r3-r4;</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-primary mb-1">Ex2: Swimmer</p>
          <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1">
            <p>semaphore basket = N, cabin = M;</p>
            <p className="mt-1">void Swimmer() {"{"}</p>
            <p className="pl-4 text-error">wait(basket);</p>
            <p className="pl-4 text-error">wait(cabin);</p>
            <p className="pl-4">&lt;put_clothes_in_basket&gt;</p>
            <p className="pl-4 text-primary">signal(cabin);</p>
            <p className="pl-4">&lt;swim&gt;</p>
            <p className="pl-4 text-error">wait(cabin);</p>
            <p className="pl-4">&lt;get_dressed&gt;</p>
            <p className="pl-4 text-primary">signal(cabin);</p>
            <p className="pl-4 text-primary">signal(basket);</p>
            <p>{"}"}</p>
          </div>
        </div>
      </div>
    ),
    scanPages: ["/test1/page_5.png"]
  }
];

export default function Examples() {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto w-full p-6 pb-20 transition-colors duration-300">
      <header className="flex items-center mb-8">
        <Link href="/" className="p-2 hover:bg-border-color rounded-full transition-colors">
          <ArrowLeft className="w-8 h-8 text-foreground" />
        </Link>
        <h1 className="text-3xl font-extrabold ml-4 flex items-center gap-3">
          <Lightbulb className="text-orange-500" /> Famous Examples & Exams
        </h1>
      </header>

      <div className="space-y-6">
        
        {/* Classic Problems Section */}
        <h2 className="text-xl font-bold text-foreground/60 uppercase tracking-wider border-b-2 border-border-color pb-2">Classic Problems</h2>

        <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl shrink-0">
            <Train className="w-12 h-12 text-blue-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">The Train Track</h2>
            <p className="text-foreground/80">Two cities A and B are connected by a single rail track. Trains can go A→B or B→A, but never in opposite directions simultaneously. Trains in the same direction can share the track.</p>
            <SolutionCard 
              title="Readers-Writers Model" 
              text={
                <div className="space-y-2">
                  <p>Modeled as two groups of "readers" where each group blocks the other. <code>track</code> is the main mutex.</p>
                  <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
                    <p>semaphore track=1, mutexA=1, mutexB=1;</p>
                    <p>int countA=0, countB=0;</p>
                    <p className="mt-2 text-primary">// Train A → B</p>
                    <p>wait(mutexA);</p>
                    <p>countA++;</p>
                    <p>if (countA == 1) wait(track); // First train locks track</p>
                    <p>signal(mutexA);</p>
                    <p className="text-gray-400 font-italic">// ... crossing track ...</p>
                    <p>wait(mutexA);</p>
                    <p>countA--;</p>
                    <p>if (countA == 0) signal(track); // Last train frees track</p>
                    <p>signal(mutexA);</p>
                  </div>
                </div>
              } 
            />
          </div>
        </div>

        <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-2xl shrink-0">
            <Scissors className="w-12 h-12 text-pink-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">The Sleeping Barber</h2>
            <p className="text-foreground/80">1 barber, 1 chair, N waiting chairs. No customers → barber sleeps. Customer arrives → wakes barber or waits. No chairs → customer leaves.</p>
            <SolutionCard 
              title="Standard Semaphore Solution" 
              text={
                <div className="space-y-2">
                  <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
                    <p>semaphore customers=0, barber=0, mutex=1;</p>
                    <p>int waiting=0; // count of waiting customers</p>
                    <p className="mt-2 text-primary">// Barber Process</p>
                    <p>while(1) {"{"}</p>
                    <p className="pl-4">wait(customers); // sleep until customer arrives</p>
                    <p className="pl-4">wait(mutex); // protect 'waiting' count</p>
                    <p className="pl-4">waiting--; // decrement waiting count</p>
                    <p className="pl-4">signal(barber); // barber is now ready</p>
                    <p className="pl-4">signal(mutex);</p>
                    <p className="pl-4">cut_hair();</p>
                    <p>{"}"}</p>
                    <p className="mt-2 text-secondary">// Customer Process</p>
                    <p>wait(mutex);</p>
                    <p>if (waiting &lt; N) {"{"}</p>
                    <p className="pl-4">waiting++;</p>
                    <p className="pl-4">signal(customers); // wake barber</p>
                    <p className="pl-4">signal(mutex);</p>
                    <p className="pl-4">wait(barber); // wait for barber to be ready</p>
                    <p className="pl-4">get_haircut();</p>
                    <p>{"}"} else {"{"}</p>
                    <p className="pl-4">signal(mutex); // shop full, leave</p>
                    <p>{"}"}</p>
                  </div>
                </div>
              } 
            />
          </div>
        </div>

        <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl shrink-0">
            <Utensils className="w-12 h-12 text-green-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">Producer-Consumer</h2>
            <p className="text-foreground/80">A producer creates items into a bounded buffer of size N. A consumer takes items out. Prevents overflow and underflow.</p>
            <SolutionCard 
              title="Bounded Buffer Solution" 
              text={
                <div className="space-y-2">
                  <div className="bg-background p-3 rounded-lg font-mono text-xs space-y-1 overflow-x-auto">
                    <p>semaphore empty=N, full=0, mutex=1;</p>
                    <p className="mt-2 text-primary">// Producer</p>
                    <p>while(1) {"{"}</p>
                    <p className="pl-4">produce_item();</p>
                    <p className="pl-4">wait(empty); // wait for free slot</p>
                    <p className="pl-4">wait(mutex); // exclusive buffer access</p>
                    <p className="pl-4">insert_item();</p>
                    <p className="pl-4">signal(mutex);</p>
                    <p className="pl-4">signal(full); // notify available item</p>
                    <p>{"}"}</p>
                    <p className="mt-2 text-secondary">// Consumer</p>
                    <p>while(1) {"{"}</p>
                    <p className="pl-4">wait(full); // wait for item</p>
                    <p className="pl-4">wait(mutex);</p>
                    <p className="pl-4">remove_item();</p>
                    <p className="pl-4">signal(mutex);</p>
                    <p className="pl-4">signal(empty); // notify free slot</p>
                    <p className="pl-4">consume_item();</p>
                    <p>{"}"}</p>
                  </div>
                </div>
              } 
            />
          </div>
        </div>

        {/* Exam Exercises Section */}
        <h2 className="text-xl font-bold text-foreground/60 uppercase tracking-wider border-b-2 border-border-color pb-2 mt-12">
          📝 Test 1 Exam Exercises (Nov–Dec 2024)
        </h2>

        {examExercises.map((exam) => (
          <div key={exam.id} className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className={`${exam.iconBg} p-4 rounded-2xl shrink-0`}>
                {exam.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h2 className="text-2xl font-bold text-foreground">{exam.variant}</h2>
                  <span className="text-xs font-mono bg-border-color/50 px-2 py-1 rounded-lg text-foreground/60">{exam.date}</span>
                </div>

                {exam.courseQuestion && (
                  <div className="bg-secondary/10 border border-secondary/20 p-3 rounded-xl mb-4 mt-2">
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Theory Question</p>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{exam.courseQuestion}</p>
                  </div>
                )}

                <div className="bg-border-color/20 p-3 rounded-xl mb-3">
                  <p className="text-xs font-bold text-foreground/50 uppercase mb-1">Exercise</p>
                  <p className="text-sm text-foreground/80 whitespace-pre-line font-mono">{exam.exercise}</p>
                </div>

                <div className="space-y-1 mb-2">
                  {exam.questions.map((q, i) => (
                    <p key={i} className="text-sm text-foreground/80 font-medium">{q}</p>
                  ))}
                </div>

                <SolutionCard title="Solution Model" text={exam.solution} />
                <ExamScannedViewer pages={exam.scanPages} label={`Original scanned exam — ${exam.variant}`} />
              </div>
            </div>
          </div>
        ))}

        {/* Handwritten Solutions */}
        <h2 className="text-xl font-bold text-foreground/60 uppercase tracking-wider border-b-2 border-border-color pb-2 mt-12">
          ✍️ Handwritten Answer Sheets
        </h2>
        <div className="bg-card-bg border-2 border-border-color rounded-3xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-2xl shrink-0">
              <FileText className="w-12 h-12 text-orange-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Answer Keys (Scanned)</h2>
              <p className="text-foreground/80 mb-4">Handwritten solutions for Sujet A (G4) and Sujet B exercises.</p>
              <ExamScannedViewer pages={["/test1/page_7.png", "/test1/page_8.png"]} label="Handwritten solution pages" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
