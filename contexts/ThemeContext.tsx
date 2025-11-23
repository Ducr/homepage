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
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    // 只有在客户端挂载后才更新 DOM，避免在初始化时覆盖内联脚本设置的主题
    if (!mounted) return;
    
    // 根据主题设置 HTML 的 class
    const root = document.documentElement;
    
    // 检查当前 HTML 上的主题类
    const hasDark = root.classList.contains('dark');
    const hasLight = root.classList.contains('light');
    
    // 只有当 HTML 上的主题类与 state 不一致时才更新
    // 这样可以避免覆盖内联脚本设置的主题，同时确保主题切换时正确更新
    if ((theme === 'dark' && !hasDark) || (theme === 'light' && !hasLight)) {
      // 移除现有的主题类
      root.classList.remove('light', 'dark');
      // 添加当前主题类
      root.classList.add(theme);
      // 设置 data-theme 属性
      root.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

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