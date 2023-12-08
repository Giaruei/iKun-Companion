/**
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-06-26 20:00:30
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-06-26 23:47:25
 * @FilePath: \messenger-clone\tailwind.config.js
 * @Description:
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
	],
};
