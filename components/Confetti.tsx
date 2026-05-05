"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Confetti({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
          })
        );
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [trigger]);

  return null;
}
