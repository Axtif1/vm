/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(177, 74%, 97%)',
            '100': 'hsl(177, 74%, 94%)',
            '200': 'hsl(177, 74%, 86%)',
            '300': 'hsl(177, 74%, 76%)',
            '400': 'hsl(177, 74%, 64%)',
            '500': 'hsl(177, 74%, 50%)',
            '600': 'hsl(177, 74%, 40%)',
            '700': 'hsl(177, 74%, 32%)',
            '800': 'hsl(177, 74%, 24%)',
            '900': 'hsl(177, 74%, 16%)',
            '950': 'hsl(177, 74%, 10%)',
            DEFAULT: '#11716c'
        },
        secondary: {
            '50': 'hsl(221, 60%, 97%)',
            '100': 'hsl(221, 60%, 94%)',
            '200': 'hsl(221, 60%, 86%)',
            '300': 'hsl(221, 60%, 76%)',
            '400': 'hsl(221, 60%, 64%)',
            '500': 'hsl(221, 60%, 50%)',
            '600': 'hsl(221, 60%, 40%)',
            '700': 'hsl(221, 60%, 32%)',
            '800': 'hsl(221, 60%, 24%)',
            '900': 'hsl(221, 60%, 16%)',
            '950': 'hsl(221, 60%, 10%)',
            DEFAULT: '#0f1d3c'
        },
        'neutral-50': '#000000',
        'neutral-100': '#333333',
        'neutral-200': '#ffffff',
        'neutral-300': '#d1d1d1',
        'neutral-400': '#111111',
        'neutral-500': '#e7e7e7',
        'neutral-600': '#e0e0e0',
        'neutral-700': '#f4f5f6',
        'neutral-800': '#757575',
        background: '#ffffff',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Montserrat',
            'sans-serif'
        ],
        font1: [
            'Poppins',
            'sans-serif'
        ]
    },
    fontSize: {
        '10': [
            '10px',
            {
                lineHeight: '10px'
            }
        ],
        '12': [
            '12px',
            {
                lineHeight: '13.2px'
            }
        ],
        '13': [
            '13px',
            {
                lineHeight: '52px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '14px'
            }
        ],
        '15': [
            '15px',
            {
                lineHeight: '17.7px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: 'normal'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '19.8px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '32px'
            }
        ],
        '24': [
            '24px',
            {
                lineHeight: '33.6px'
            }
        ],
        '30': [
            '30px',
            {
                lineHeight: '33px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '52.8px'
            }
        ]
    },
    spacing: {
        '0': '2px',
        '1': '3px',
        '2': '5px',
        '3': '6px',
        '4': '7px',
        '5': '8px',
        '6': '9px',
        '7': '10px',
        '8': '12px',
        '9': '13px',
        '10': '14px',
        '11': '15px',
        '12': '20px',
        '13': '24px',
        '14': '30px',
        '15': '40px'
    },
    borderRadius: {
        sm: '4px',
        md: '10px',
        full: '999px'
    },
    boxShadow: {
        xs: 'rgba(0, 0, 0, 0.15) 0px 0px 16px -5px',
        sm: 'rgba(0, 0, 0, 0.12) -18px 0px 48px 0px'
    },
    screens: {
        md: '769px',
        lg: '1025px'
    },
    transitionDuration: {
        '40': '0.04s',
        '50': '0.05s',
        '80': '0.08s',
        '100': '0.1s',
        '120': '0.12s',
        '150': '0.15s',
        '160': '0.16s',
        '200': '0.2s',
        '225': '0.225s',
        '250': '0.25s',
        '300': '0.3s',
        '500': '0.5s',
        '4000': '4s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
        linear: 'linear',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '100%'
    }
},
  },
};
