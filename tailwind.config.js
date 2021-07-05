const colors = require("tailwindcss/colors");

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            ...colors,
            xteamaccent: "#FF5964",
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
