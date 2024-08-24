import flowbite from 'flowbite/plugin'; // Import Flowbite plugin

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}', // Adjust the file types if needed
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Add Flowbite React components
  ],

  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Add Flowbite plugin
  ],
};
