export const highlightErrorLog = ({ err, component = 'unknown' }) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `\n%cError:%c${err.message};\n%cSource:%c${component};\n%cCode:%c${err.stack};`,
      'color: brown; font-style: bold; background-color: khaki; padding-right: 5px;',
      'color: red; font-style: italic;',
      'color: brown; font-style: bold; background-color: khaki; padding-right: 5px;',
      'color: darkblue; font-style: italic;',
      'color: brown; font-style: bold; background-color: khaki; padding-right: 5px;',
      'color: tomato; font-style: italic;',
    );
  }
};
