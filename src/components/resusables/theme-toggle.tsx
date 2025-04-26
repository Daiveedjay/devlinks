"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // if (animating) return;

    // setAnimating(true);

    // Get the position of the toggle button for the animation origin
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }

    // Set the theme after a slight delay to allow animation to start
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Reset animating state after animation completes
    // setTimeout(() => {
    //   setAnimating(false);
    // }, 500);
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="relative">
      {/* Background overlay - positioned BELOW content */}
      {/* <AnimatePresence initial={false}>
        {animating && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
              className="absolute bg-foreground rounded-full "
              initial={{
                width: !isDark ? "4000px" : "10px", // Flipped isDark check
                height: !isDark ? "4000px" : "10px", // Flipped isDark check
                x: !isDark ? position.x - 2000 : position.x - 5, // Flipped isDark check
                y: !isDark ? position.y - 2000 : position.y - 5, // Flipped isDark check
              }}
              animate={{
                width: !isDark ? "10px" : "4000px", // Flipped isDark check
                height: !isDark ? "10px" : "4000px", // Flipped isDark check
                x: !isDark ? position.x - 5 : position.x - 2000, // Flipped isDark check
                y: !isDark ? position.y - 5 : position.y - 2000, // Flipped isDark check
              }}
              transition={{
                type: "spring",
                stiffness: 30,
                damping: 20,
                duration: 0.3,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Toggle button - positioned ABOVE overlay */}
      <button
        ref={toggleRef}
        onClick={toggleTheme}
        className="relative cursor-pointer z-10 rounded-full bg-white p-2 shadow-md dark:bg-gray-800"
        aria-label="Toggle theme"
        // disabled={animating}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {isDark ? (
              <Moon className="h-5 w-5 text-yellow-300" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
}
