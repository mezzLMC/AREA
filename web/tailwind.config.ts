import type { Config } from "tailwindcss";
import tailwindScrollBar from "tailwind-scrollbar";

const config: Config = {
    content: [
        "./(pages)/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
            },
            blur: {
                20: '20px', // Custom blur value
            },
            colors: {
                'radial-blue': '#3b82f6',
                'radial-purple': '#a855f7',
                'radial-no': 'transparent',
                'radial-backg': '#1C1C23',
            },
            animation: {
                'bounce-custom': 'descend-and-ascend 4s ease-in-out infinite',
                'bounce-decayed-custom': 'descend-and-ascend 8s ease-in-out infinite',
            },
            keyframes: {
                'descend-and-ascend': {
                    '0%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(10px)' },
                    '100%': { transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [
        tailwindScrollBar,
    ],
};

export default config;