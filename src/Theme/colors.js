
const darkOcean = {
    bodybackground: "#0d0d0d",
    cardsbackground: "#1a1a1a",
    primary: "#26d0ce",
    accent: "#1a2980",
    secondary: "#3D3D3D",
    text: "#ffffff",
    mutedText: "#B3B3B3",
    border: "#4d4d4d",
    error: "#ef4444",
    gradients: {
        ocean: ["#1a2980", "#26d0ce"],
        mintGlow: ["#00ffa3", "#00b3ff"],
        aquaPulse: ["#00F5A0", "#00D9F5"],
        deepTech: ["#0d0d1a", "#141427"],
        darkBody: ["#0d0d0d", "#111111", "#0b0b0b",],
        gradientError: ["#ef4444", "#dc2626"],
    },
};
const industrialSteel = {
    bodybackground: "#0f1115",        // Dark industrial background
    cardsbackground: "#1c1f26",       // Slightly lighter card panels
    primary: "#c0c7d1",               // Brushed aluminum silver
    accent: "#4da3ff",                // Electric blue (modern POS feel)
    secondary: "#2a2f3a",             // Steel gray
    text: "#f5f7fa",                  // Clean white text
    mutedText: "#9aa3ad",             // Muted industrial gray
    border: "#3a404d",                // Soft steel border
    success: "#22c55e",               // Green for payments
    warning: "#f59e0b",               // Stock low
    error: "#ef4444",                 // Errors

    gradients: {
        steelShine: ["#bdc3c7", "#2c3e50"],       // Metallic shine
        aluminumGlow: ["#d7d2cc", "#304352"],     // Aluminum reflection
        posBlue: ["#4da3ff", "#1e3c72"],           // POS action buttons
        darkIndustrial: ["#0f1115", "#1c1f26"],    // App background gradient
        successGradient: ["#22c55e", "#16a34a"],
        errorGradient: ["#ef4444", "#b91c1c"],
    },
};

const activeTheme = "industrialSteel";

const themes = { darkOcean, industrialSteel };
export const colors = themes[activeTheme];
