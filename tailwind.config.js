/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'portfolio-bg': '#050a14',
        'portfolio-card': '#0a0e1a',
        'portfolio-accent': '#3ec6ff',
        'portfolio-secondary': '#8b7bff',
        'portfolio-success': '#00ff88',
        'portfolio-warning': '#f59e0b',
        'portfolio-gray': '#8a99b3',
        'portfolio-light': '#ffffff',
        'night-bg': '#050a14',
        'electric-cyan': '#3ec6ff',
        'neon-purple': '#8b7bff',
        'muted-blue': '#8a99b3',
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        instrument: ['Instrument Sans', 'sans-serif'],
        ibm: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDM5SDRWMHoiLz48cGF0aCBkPSJNMzkgMEgzOXY0MHoiLz48L2c+PC9zdmc+')",
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -5px rgba(0, 240, 255, 0.3)',
        'cyan-glow-lg': '0 0 35px -5px rgba(0, 240, 255, 0.45)',
        'purple-glow': '0 0 20px -5px rgba(168, 85, 247, 0.3)',
      }
    },
  },
  plugins: [],
}
