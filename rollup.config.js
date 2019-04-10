import pkg from './package.json';

module.exports = [
  {
    input: 'src/main.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'wxrequest',
    },
  },
  {
		input: 'src/main.js',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
