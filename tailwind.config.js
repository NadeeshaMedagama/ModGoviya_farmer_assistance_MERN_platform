/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                'farm-green': '#4CAF50',
                'soil-brown': '#8D6E63',
                'harvest-yellow': '#FFC107',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                heading: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
