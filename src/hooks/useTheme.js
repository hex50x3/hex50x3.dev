"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const saved = localStorage.getItem("theme");
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

const toggleTheme = () => {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  setTheme(prev => (prev === "dark" ? "light" : "dark"));
  setTimeout(() => {
    root.classList.remove("theme-switching");
  }, 200); 
};

  return { theme, toggleTheme, mounted };
}