import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tbfColor: {
          darkpurple: '#6D00C2',
          lighterpurple: 'rgba(109,0,194,0.3)',
          lighterpurple2: 'rgba(109,0,194,0.3)',
          lightpurple: 'rgba(109,0,194,0.5)',
          lightgrey: '#f9f9f9',
          middlegrey: 'rgba(0,0,0,0.1)',
          middlegrey2: 'rgba(0,0,0,0.4)',
          middlegrey3: 'rgba(0,0,0,0.2)',
          middlegrey4: 'rgba(0,0,0,0.15)',
          darkgrey: '#aeaeae',
          darkergrey: '#5c5c5c',
        }
      },
      dropShadow: {
        contractedFolder: '0 0 2px rgba(0,0,0,0.25)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
