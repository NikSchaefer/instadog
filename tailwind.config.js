/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/**/*.tsx",
		"./src/**/*.tsx",
		"./src/pages/**/*.tsx",
		"./src/components/**/*.tsx",
		"./content/**/*.json",
		"./content/**/*.mdx",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
