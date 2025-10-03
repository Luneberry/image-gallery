import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setIsDark(initialTheme === 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 animate-fadeIn">
            Image Gallery
          </h1>

          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-card hover:bg-card-hover transition-all duration-200 hover:scale-110 border border-foreground/10"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} className="text-foreground" />
            ) : (
              <Moon size={20} className="text-foreground" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
