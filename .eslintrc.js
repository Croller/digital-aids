module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  settings: {
    'import/resolver': {
      'alias': [
        ['client', './src/client'],
        ['server', './src/server']
       ]
    }
  },
};
