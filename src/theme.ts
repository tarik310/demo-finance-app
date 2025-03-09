export const tokens = {
  grey: {
    100: "#1f2937",
    200: "#374151",
    300: "#4b5563",
    400: "#6b7280",
    500: "#9ca3af",
    600: "#d1d5db",
    700: "#e5e7eb",
    800: "#f3f4f6",
    900: "#f9fafb",
  },
  primary: {
    // light blue
    100: "#bae6fd",
    200: "#7dd3fc",
    300: "#38bdf8",
    400: "#0ea5e9",
    500: "#0284c7",
    600: "#0369a1",
    700: "#075985",
    800: "#0c4a6e",
    900: "#082f49",
  },
  secondary: {
    // yellow
    100: "#fff7ed",
    200: "#ffedd5",
    300: "#fed7aa",
    400: "#fdba74",
    500: "#fb923c",
    600: "#f97316",
    700: "#ea580c",
    800: "#c2410c",
    900: "#9a3412",
  },
  tertiary: {
    // purple
    500: "#7c3aed",
  },
  background: {
    light: "#f3f4f6",
    main: "#f9fafb",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[100],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[100],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[500],
    },
  },
};
