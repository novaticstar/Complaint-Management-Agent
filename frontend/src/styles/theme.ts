// Nova Design System Theme Configuration
export const novaTheme = {
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      500: '#6366f1', // Primary Indigo
      600: '#5856eb',
      700: '#4f46e5',
      800: '#4338ca',
      900: '#3730a3',
    },
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      500: '#14b8a6', // Teal accent
      600: '#0d9488',
      700: '#0f766e',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b', // Slate
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      amber: '#f59e0b',
      emerald: '#10b981',
      rose: '#f43f5e',
    }
  },
  iconSizes: {
    xs: 'w-3 h-3',        // 12px - very small inline icons
    sm: 'w-4 h-4',        // 16px - navigation, form labels, inline icons
    md: 'w-5 h-5',        // 20px - buttons, status indicators, cards
    lg: 'w-6 h-6',        // 24px - larger buttons, headers
    xl: 'w-8 h-8',        // 32px - hero sections, large cards
    '2xl': 'w-10 h-10',   // 40px - feature showcases
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  }
} as const;

export type NovaTheme = typeof novaTheme;
