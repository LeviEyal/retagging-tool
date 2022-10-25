module.exports = {
	extends: [
		"turbo",
		"prettier",
		"eslint:all",
		"plugin:@typescript-eslint/all",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:react/all",
		"plugin:jsx-a11y/recommended",
		"airbnb",
		"airbnb-typescript",
		"airbnb/hooks",
		"plugin:react/jsx-runtime",
		"prettier",
	],
	rules: {
		"@next/next/no-html-link-for-pages": "off",
		"react/jsx-key": "off",
	},
};
