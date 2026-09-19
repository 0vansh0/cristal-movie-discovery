export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'imdb-yellow': '#F5C518',
        'rt-red': '#FA320A',
        'rt-green': '#00A859',
      },
    },
  },
  plugins: [],
};
