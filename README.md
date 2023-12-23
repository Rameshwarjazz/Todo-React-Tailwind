#FOR STYLE
-I used Tailwind CSS which is an open source CSS framework.

To install You have the following step.

Step1-You have to Install Tailwind CSS .
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

#Step-2 Add the paths to all of your template files in your tailwind.config.js file.  

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

#Step3 Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

@tailwind base;
@tailwind components;
@tailwind utilities;
