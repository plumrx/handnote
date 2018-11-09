module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    'comma-dangle': [ 'error', 'always-multiline' ],
    "vue/max-attributes-per-line": [ 'error', { singleline: 3 } ]
  },
}
