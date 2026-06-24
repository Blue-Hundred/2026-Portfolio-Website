import { Sun, Moon } from "lucide-react";

export function ThemeToggle({
  isDark,
  toggle,
}: {
  isDark: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
