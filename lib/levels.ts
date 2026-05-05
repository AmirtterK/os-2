export type QuestionType = 'multiple_choice' | 'true_false';

export interface Level {
  id: number;
  question: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const levels: Level[] = [
  {
    id: 1,
    question: "What is a Semaphore in an Operating System?",
    type: "multiple_choice",
    options: [
      "A hardware component that stores memory",
      "An integer variable used for synchronization",
      "A terminal command to kill a process",
      "A type of mutual exclusion lock"
    ],
    correctAnswer: "An integer variable used for synchronization",
    explanation: "A semaphore is an integer variable used to solve critical section problems and synchronize processes."
  },
  {
    id: 2,
    question: "What does the wait(S) or P operation do?",
    type: "multiple_choice",
    options: [
      "Increments the semaphore and unblocks a process",
      "Deletes the semaphore",
      "Decrements the semaphore and blocks the process if the value is < 0",
      "Resets the semaphore to 1"
    ],
    correctAnswer: "Decrements the semaphore and blocks the process if the value is < 0",
    explanation: "wait(S) decrements the semaphore. If the result is negative, the calling process is blocked."
  },
  {
    id: 3,
    question: "What does the signal(S) or V operation do?",
    type: "multiple_choice",
    options: [
      "Decrements the semaphore and blocks",
      "Increments the semaphore and unblocks a waiting process if value <= 0",
      "Creates a new semaphore",
      "Restarts the operating system"
    ],
    correctAnswer: "Increments the semaphore and unblocks a waiting process if value <= 0",
    explanation: "signal(S) increments the semaphore. If the value is 0 or negative, it means a process is waiting and will be unblocked."
  },
  {
    id: 4,
    question: "To achieve Mutual Exclusion (Mutex), what should the initial value of the semaphore be?",
    type: "multiple_choice",
    options: [
      "0",
      "1",
      "-1",
      "100"
    ],
    correctAnswer: "1",
    explanation: "A mutex is initialized to 1 so that the first process can enter the critical section without blocking."
  },
  {
    id: 5,
    question: "The wait() and signal() operations must be atomic (indivisible).",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswer: "True",
    explanation: "If they were not atomic, two processes could modify the semaphore simultaneously, leading to race conditions."
  },
  {
    id: 6,
    question: "In the Producer-Consumer problem, what happens if a consumer calls wait() on an empty buffer semaphore?",
    type: "multiple_choice",
    options: [
      "It reads garbage data",
      "It crashes the system",
      "It gets blocked until the producer signals that an item is available",
      "It becomes a producer"
    ],
    correctAnswer: "It gets blocked until the producer signals that an item is available",
    explanation: "The consumer must wait(delay) and will block if there are 0 items. The producer will signal() after adding an item."
  },
  {
    id: 7,
    question: "To ensure instruction S1 executes BEFORE instruction S2, which synchronization mechanism is correct?",
    type: "multiple_choice",
    options: [
      "Process 1: wait(S); S1; | Process 2: S2; signal(S);",
      "Process 1: S1; signal(S); | Process 2: wait(S); S2;",
      "Process 1: signal(S); S1; | Process 2: wait(S); S2;",
      "Process 1: S1; wait(S); | Process 2: signal(S); S2;"
    ],
    correctAnswer: "Process 1: S1; signal(S); | Process 2: wait(S); S2;",
    explanation: "Process 2 must wait for the signal from Process 1. The semaphore is initialized to 0."
  },
  {
    id: 8,
    question: "The Train Track problem where trains can go A->B or B->A, but never opposite directions at the same time, resembles which classic problem?",
    type: "multiple_choice",
    options: [
      "Producer-Consumer",
      "Readers-Writers",
      "Sleeping Barber",
      "Dining Philosophers"
    ],
    correctAnswer: "Readers-Writers",
    explanation: "Trains in the SAME direction can share the track (like Readers sharing a file), but trains in OPPOSITE directions require strict exclusion (like Writers)."
  },
  {
    id: 9,
    question: "In the Sleeping Barber problem, what does the 'barber' semaphore do?",
    type: "multiple_choice",
    options: [
      "Limits the total number of customers allowed in the shop",
      "Tracks the number of empty chairs",
      "Indicates if the barber is busy/asleep (0) or ready to cut hair (1)",
      "Counts the money the barber makes"
    ],
    correctAnswer: "Indicates if the barber is busy/asleep (0) or ready to cut hair (1)",
    explanation: "The barber semaphore synchronizes the barber waking up or going to sleep based on customer presence."
  },
  {
    id: 10,
    question: "Two candidates share a calculator, a pen, and a course book. To prevent deadlocks, how many mutual exclusion semaphores do they need?",
    type: "multiple_choice",
    options: [
      "1 semaphore for all three items",
      "2 semaphores",
      "3 semaphores (one for each shared resource)",
      "0 semaphores"
    ],
    correctAnswer: "3 semaphores (one for each shared resource)",
    explanation: "Since they request items independently and at different times, each distinct resource needs its own mutex semaphore."
  },
  {
    id: 11,
    question: "(Test 1 – Subject A) How does a mutual exclusion semaphore guarantee that only one process accesses a critical section at a time?",
    type: "multiple_choice",
    options: [
      "By constantly checking a boolean flag in a while loop",
      "By initializing to 1, letting the first process pass wait() (S=0), and blocking subsequent processes until signal()",
      "By assigning unique IDs to every process and sorting them",
      "By terminating any process that tries to enter without permission"
    ],
    correctAnswer: "By initializing to 1, letting the first process pass wait() (S=0), and blocking subsequent processes until signal()",
    explanation: "The semaphore (initialized to 1) allows exactly one process to pass. Others are queued in a blocked state without busy waiting."
  },
  {
    id: 12,
    question: "(Test 1 – Subject A) P1, P2, P3 share variables n and m with semaphores S1=1, S2=1. P1 does wait(S1);wait(S2);...signal(S2);signal(S1). Why is this flawed?",
    type: "multiple_choice",
    options: [
      "Variables n and m are not initialized correctly",
      "Progression is not verified — a process can be blocked while the Critical Section is free",
      "It causes an immediate segmentation fault",
      "The semaphores S1 and S2 are initialized to 0 instead of 1"
    ],
    correctAnswer: "Progression is not verified — a process can be blocked while the Critical Section is free",
    explanation: "P1 holds S1 and waits for S2, but P2 holds S2, and P3 needs S1. A process can stay blocked even when the CS is free — 'Progression' condition fails."
  },
  {
    id: 13,
    question: "(Test 1 – Subject A) P1: n=n/3, m=m*2 | P2: m=m+3 | P3: n=n+5. Starting from n=6, m=6, what execution order gives n=7, m=18?",
    type: "multiple_choice",
    options: [
      "P1 → P2 → P3",
      "P3 → P1 → P2",
      "P2 → P1 → P3",
      "P2 → P3 → P1"
    ],
    correctAnswer: "P2 → P1 → P3",
    explanation: "P2 first: m=6+3=9. P1 next: n=6/3=2, m=9*2=18. P3 last: n=2+5=7. Result: n=7, m=18. ✓"
  },
  {
    id: 14,
    question: "(Test 1 – Subject B) Why are semaphore-based solutions preferred over busy waiting (attente active)?",
    type: "multiple_choice",
    options: [
      "Semaphores use less memory",
      "Busy waiting wastes CPU cycles, whereas semaphores block the process and free the CPU",
      "Busy waiting cannot achieve mutual exclusion",
      "Semaphores are faster to type"
    ],
    correctAnswer: "Busy waiting wastes CPU cycles, whereas semaphores block the process and free the CPU",
    explanation: "Busy waiting (while loops) consumes 100% of the CPU slice, whereas wait() puts the process to sleep, freeing the CPU for useful work."
  },
  {
    id: 15,
    question: "(Test 1 – Subject B) To guarantee T1 is never executed at the same time as T2 (Mutual Exclusion), what is the correct setup?",
    type: "multiple_choice",
    options: [
      "Semaphore S=1; P1: wait(S); T1; signal(S); | P2: wait(S); T2; signal(S);",
      "Semaphore S=0; P1: wait(S); T1; signal(S); | P2: wait(S); T2; signal(S);",
      "Semaphore S=2; P1: wait(S); T1; | P2: wait(S); T2;",
      "No semaphores are needed"
    ],
    correctAnswer: "Semaphore S=1; P1: wait(S); T1; signal(S); | P2: wait(S); T2; signal(S);",
    explanation: "A single Mutex initialized to 1 ensures only one of them can enter the critical section at a time."
  },
  {
    id: 16,
    question: "(Test 1 – Subject B) Use two semaphores to synchronize T1 and T2 such that execution order is strictly T2 T1 T2 T1 T2...",
    type: "multiple_choice",
    options: [
      "S1=1, S2=1; P1: wait(S1); T1; signal(S2); | P2: wait(S2); T2; signal(S1);",
      "S1=0, S2=1; P1: wait(S1); T1; signal(S2); | P2: wait(S2); T2; signal(S1);",
      "S1=0, S2=0; P1: wait(S1); T1; signal(S2); | P2: wait(S2); T2; signal(S1);",
      "S1=1, S2=0; P1: wait(S1); T1; signal(S1); | P2: wait(S2); T2; signal(S2);"
    ],
    correctAnswer: "S1=0, S2=1; P1: wait(S1); T1; signal(S2); | P2: wait(S2); T2; signal(S1);",
    explanation: "S2=1 allows P2 (T2) to start first. It then signals S1, waking up P1 (T1). P1 executes and signals S2, repeating the cycle: T2→T1→T2→T1..."
  },
  {
    id: 17,
    question: "(Test 1 – Subject B G1) Given semaphores a=1, b=1, c=0 and P1: wait(a);signal(a);wait(b);signal(b);signal(c) / P2: wait(a);wait(b);wait(c);signal(a);wait(b). Do P1 and P2 deadlock?",
    type: "multiple_choice",
    options: [
      "No, they can always complete",
      "Yes, deadlock is possible with interleaving 1→2→6→7→8→3",
      "Only if a third process is added",
      "Only if all semaphores start at 0"
    ],
    correctAnswer: "Yes, deadlock is possible with interleaving 1→2→6→7→8→3",
    explanation: "If P1 executes steps 1-2 (a becomes 1 again), P2 takes a (a=0), then b (b=0), then waits on c (c=0, blocked). P1 then waits on b (b=-1, blocked). Both are blocked → deadlock."
  },
  {
    id: 18,
    question: "(Test 1 – G1) Semaphores a=0, b=1. P1: wait(a); A1; signal(b); | P2: wait(b); A2; signal(a); | P3: wait(a); A3; signal(b). Which execution sequence is possible?",
    type: "multiple_choice",
    options: [
      "A3 A2 A2 A1 ...",
      "A2 A3 A2 A1 ...",
      "A2 A3 A1 A2 ...",
      "A2 A1 A3 A1 ..."
    ],
    correctAnswer: "A2 A1 A2 A1 ...",
    explanation: "b=1 so P2 runs first (A2), signals a. Then P1 or P3 can go. With correct interleaving: A2→A1→A2→A1 repeats. Options 2 and 5 from the exam are valid."
  },
  {
    id: 19,
    question: "(Test 1 – G3) Suppose task A must execute before task B. When should a task execute a 'wait' to respect execution order?",
    type: "multiple_choice",
    options: [
      "Before the task that must execute first",
      "After the task that must execute first",
      "Before the task that must execute second",
      "After both tasks"
    ],
    correctAnswer: "Before the task that must execute second",
    explanation: "Task B must wait(S) before executing. Task A will signal(S) after executing. This ensures A finishes before B starts."
  },
  {
    id: 20,
    question: "(Test 1 – G3) When should a task execute a 'signal' to allow another task to begin?",
    type: "multiple_choice",
    options: [
      "Before the task that must execute first",
      "After the task that must execute first",
      "Before the task that must execute second",
      "Never — signal is automatic"
    ],
    correctAnswer: "After the task that must execute first",
    explanation: "After task A completes, it calls signal(S), which wakes up any process waiting on S (i.e., task B)."
  },
  {
    id: 21,
    question: "(Test 1 – G3) semaphore a=1, b=0, c=1. P1: a)wait(a) b)signal(b) c)wait(b) d)wait(c) e)signal(a). P2: a')wait(a) b')signal(a) c')wait(c) d')wait(b) e')signal(b) f')signal(c). Can these processes deadlock?",
    type: "true_false",
    options: [
      "True",
      "False"
    ],
    correctAnswer: "True",
    explanation: "With the interleaving a→b'→a→b→c→c'→d'→d, both can end up waiting on resources held by the other, causing a deadlock."
  },
  {
    id: 22,
    question: "(Test 1 – G3) Three processes P1, P2, P3 must execute in order A2→A1→A3→A2→A3→A2→A1→... with a=0, b=1. What goes in P2's code?",
    type: "multiple_choice",
    options: [
      "wait(a); A2; signal(b);",
      "wait(b); A2; signal(a);",
      "wait(a); A2; signal(a);",
      "wait(b); A2; signal(b);"
    ],
    correctAnswer: "wait(b); A2; signal(a);",
    explanation: "Since b=1, P2 goes first (A2). It then signals a so P1 (wait(a)) can execute A1. The cycle continues."
  },
  {
    id: 23,
    question: "(Test 1 – G5) To compute the sum of array T[10] using two parallel processes (P1 for even indices, P2 for odd), what semaphore protects 'sum'?",
    type: "multiple_choice",
    options: [
      "semaphore mutex = 0;",
      "semaphore mutex = 1;",
      "semaphore mutex = 10;",
      "No semaphore needed — each process uses different indices"
    ],
    correctAnswer: "semaphore mutex = 1;",
    explanation: "Both P1 and P2 modify the shared variable 'sum'. A mutex (initialized to 1) ensures they don't write to it simultaneously."
  },
  {
    id: 24,
    question: "(Test 1 – G5) In the parallel array sum, P1 does: wait(mutex); sum=sum+T[i]; signal(mutex); i=i+2. Why is i=i+2 OUTSIDE the critical section?",
    type: "multiple_choice",
    options: [
      "Because i is a shared variable that both processes read",
      "Because i is a local variable — only 'sum' needs protection",
      "Because incrementing i is an atomic operation",
      "It should actually be inside the critical section"
    ],
    correctAnswer: "Because i is a local variable — only 'sum' needs protection",
    explanation: "Each process has its own local loop counter (i for P1, j for P2). Only the shared variable 'sum' needs mutual exclusion."
  },
  {
    id: 25,
    question: "(Test 1 – Dec 18) To compute (a+b)*c - d/(e-f) with one process per operation, how many semaphores are needed?",
    type: "multiple_choice",
    options: [
      "2 semaphores",
      "3 semaphores",
      "4 semaphores",
      "5 semaphores"
    ],
    correctAnswer: "4 semaphores",
    explanation: "Operations have dependencies: (a+b) and (e-f) can run in parallel, but * needs (a+b), / needs d and (e-f), and - needs * and /. Four semaphores enforce these precedence constraints."
  },
  {
    id: 26,
    question: "(Test 1 – Dec 18) Swimming pool: N baskets, M cabins (M≤N), max N swimmers. A swimmer needs a basket to enter and a cabin to change. Which semaphores are used?",
    type: "multiple_choice",
    options: [
      "semaphore basket = N; semaphore cabin = M;",
      "semaphore basket = 1; semaphore cabin = 1;",
      "semaphore basket = M; semaphore cabin = N;",
      "semaphore basket = N; semaphore cabin = N;"
    ],
    correctAnswer: "semaphore basket = N; semaphore cabin = M;",
    explanation: "There are N baskets and M cabins. Each semaphore is initialized to the count of the resource it protects. A swimmer calls wait(basket) then wait(cabin) to change."
  },
  {
    id: 27,
    question: "What is the difference between a mutual exclusion semaphore and a general semaphore?",
    type: "multiple_choice",
    options: [
      "A mutex can only be 0 or 1; a general semaphore can be any non-negative integer",
      "A general semaphore can only be 0 or 1; a mutex can be any integer",
      "There is no difference",
      "A mutex is software-only; a general semaphore is hardware-only"
    ],
    correctAnswer: "A mutex can only be 0 or 1; a general semaphore can be any non-negative integer",
    explanation: "A mutex (binary semaphore) toggles between 0 and 1 for exclusive access. A general (counting) semaphore can have values ≥ 0 to manage multiple identical resources."
  },
  {
    id: 28,
    question: "What happens when a process executes wait(S) on a semaphore whose value is 0?",
    type: "multiple_choice",
    options: [
      "The process continues normally since 0 means available",
      "The semaphore value becomes -1 and the process is blocked",
      "The process is terminated",
      "An error is thrown"
    ],
    correctAnswer: "The semaphore value becomes -1 and the process is blocked",
    explanation: "wait(S) always decrements S. If S was 0, it becomes -1 (negative), so the process is placed in the semaphore's waiting queue and blocked."
  }
];
