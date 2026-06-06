"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./Button";

export function ThemeToggle() {
  const { resolvedMode, toggleMode, mounted } = useTheme();

  // Avoid hydration mismatch: render a stable placeholder until mounted.
  if (!mounted) return <Button variant="ghost" size="icon" aria-hidden />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      aria-label="Toggle theme"
    >
      {resolvedMode === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
