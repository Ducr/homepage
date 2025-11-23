import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

// 获取初始主题的函数，在组件外部定义，避免每次渲染都执行
function getInitialTheme(): Theme {
  // 在浏览器环境中
  if (typeof window !== 'undefined') {
    // 优先从 HTML 元素读取已设置的主题（由内联脚本设置）
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      return 'dark';
    }
    if (html.classList.contains('light')) {
      return 'light';
    }
    
    // 如果 HTML 上没有主题类，则从 localStorage 读取保存的主题
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // 最后检查系统偏好
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  }
  
  // SSR 时返回默认值
  return 'light';
}

export function useTheme() {
  // 使用函数初始化，确保在首次渲染时就读取正确的主题
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // 只在组件挂载时设置 mounted 标志，不修改 theme（theme 已经在初始化时正确设置了）
  useEffect(() => {
    setMounted(true);
  }, []);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      // 只有当用户没有手动设置主题时，才跟随系统
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // 现代浏览器的监听方式
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // 兼容旧版本浏览器
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, []);

  // 切换主题
  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  return {
    theme,
    toggleTheme,
    mounted
  };
}