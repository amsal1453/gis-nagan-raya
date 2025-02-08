import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                primary: 'var(--primary-color)', // Variabel untuk primary
                secondary: 'var(--secondary-color)', // Variabel untuk seco
                hover: 'var(--hover-color)', // Variabel untuk hover
                textP: 'var(--text-primary-color)', // Variabel untuk text-primary
                textS: 'var(--text-secondary-color)', // Variabel untuk text-secondary
            },
        },
    },

    plugins: [
        daisyui,
        forms
    ],
};
