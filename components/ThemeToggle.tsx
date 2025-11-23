'use client';

import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  // 只在客户端挂载时设置 mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务器端和客户端首次渲染时都使用 'light'，确保 hydration 一致
  // 客户端挂载后，theme 已经是正确的值（由 getInitialTheme 从 DOM 读取），直接使用
  const currentTheme = mounted ? theme : 'light';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors relative group flex items-center justify-center"
      aria-label={currentTheme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
      title={currentTheme === 'light' ? '切换到暗色主题' : '切换到亮色主题'}
      suppressHydrationWarning
    >
      {/* 使用固定尺寸的占位容器，确保布局稳定 */}
      <span className="inline-flex items-center justify-center w-5 h-5 relative">
        {/* Moon 图标（亮色主题时显示） */}
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out">
          <Moon size={20} className={currentTheme === 'light' ? 'opacity-100' : 'opacity-0'} />
        </span>
        {/* Sun 图标（暗色主题时显示） */}
        <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out">
          <Sun size={20} className={currentTheme === 'dark' ? 'opacity-100' : 'opacity-0'} />
        </span>
      </span>
    </button>
  );
}

