"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial system preference or localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newDark = !prev;
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newDark;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-3 bg-card-bg border-2 border-border-color rounded-full text-foreground hover:bg-border-color/30 transition-colors shadow-sm absolute top-6 right-6 z-50 button-3d"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-6 h-6 text-orange-400" /> : <Moon className="w-6 h-6 text-blue-500" />}
    </button>
  );
}
