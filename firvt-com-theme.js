// React Theme — extracted from https://firvt.com/
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '10': string;
    '12': string;
    '13': string;
    '14': string;
    '15': string;
    '16': string;
    '18': string;
    '20': string;
    '24': string;
    '30': string;
    '48': string;
 *   };
 *   space: {
    '2': string;
    '3': string;
    '5': string;
    '6': string;
    '7': string;
    '8': string;
    '9': string;
    '10': string;
    '12': string;
    '13': string;
    '14': string;
    '15': string;
    '20': string;
    '24': string;
    '30': string;
    '40': string;
 *   };
 *   radii: {
    sm: string;
    md: string;
    full: string;
 *   };
 *   shadows: {
    md: string;
    lg: string;
    xl: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#11716c",
    "secondary": "#0f1d3c",
    "background": "#ffffff",
    "foreground": "#000000",
    "neutral50": "#000000",
    "neutral100": "#333333",
    "neutral200": "#ffffff",
    "neutral300": "#d1d1d1",
    "neutral400": "#111111",
    "neutral500": "#e7e7e7",
    "neutral600": "#e0e0e0",
    "neutral700": "#f4f5f6",
    "neutral800": "#757575"
  },
  "fonts": {
    "body": "'Montserrat', sans-serif"
  },
  "fontSizes": {
    "10": "10px",
    "12": "12px",
    "13": "13px",
    "14": "14px",
    "15": "15px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "24": "24px",
    "30": "30px",
    "48": "48px"
  },
  "space": {
    "2": "2px",
    "3": "3px",
    "5": "5px",
    "6": "6px",
    "7": "7px",
    "8": "8px",
    "9": "9px",
    "10": "10px",
    "12": "12px",
    "13": "13px",
    "14": "14px",
    "15": "15px",
    "20": "20px",
    "24": "24px",
    "30": "30px",
    "40": "40px"
  },
  "radii": {
    "sm": "4px",
    "md": "10px",
    "full": "999px"
  },
  "shadows": {
    "md": "rgba(0, 0, 0, 0.15) 0px 0px 16px -5px",
    "lg": "rgba(0, 0, 0, 0.25) 0px 5px 15px 0px",
    "xl": "rgba(0, 0, 0, 0.12) -18px 0px 48px 0px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#11716c",
      "light": "hsl(177, 74%, 40%)",
      "dark": "hsl(177, 74%, 10%)"
    },
    "secondary": {
      "main": "#0f1d3c",
      "light": "hsl(221, 60%, 30%)",
      "dark": "hsl(221, 60%, 10%)"
    },
    "background": {
      "default": "#ffffff",
      "paper": "#ebebed"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "'Montserrat', sans-serif",
    "h1": {
      "fontSize": "48px",
      "fontWeight": "600",
      "lineHeight": "52.8px"
    },
    "h2": {
      "fontSize": "24px",
      "fontWeight": "500",
      "lineHeight": "33.6px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "500",
      "lineHeight": "32px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 7
  },
  "shadows": [
    "rgba(0, 0, 0, 0.15) 0px 0px 16px -5px",
    "rgba(0, 0, 0, 0.25) 0px 5px 15px 0px",
    "rgba(0, 0, 0, 0.12) -18px 0px 48px 0px"
  ]
};

export default theme;
