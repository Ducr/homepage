'use client';
import { createContext, useContext, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // 根据主题设置 HTML 的 class
    const root = document.documentElement;

    // 移除现有的主题类
    root.classList.remove('light', 'dark');
    // 添加当前主题类
    root.classList.add(theme);

    // 设置 data-theme 属性（可选）
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};