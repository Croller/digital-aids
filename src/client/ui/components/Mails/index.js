import React from 'react';

export const Cell = ({ children }) => (
  <td>{children}</td>
);

export const Row = ({ children }) => (
  <tr>
    {React.Children.map(children, (el) => {
      if (el.type === Cell) return el;
      
      return <td>{el}</td>;
    })}
  </tr>
);

export const Grid = ({ children }) => {
  console.log(children);
  return (
    <table>
      <tbody>
        {React.Children.map(children, (el) => {
          if (!el) return;

          if (el.type === Row) return el;

          if (el.type === Cell) {
            return <tr>{el}</tr>;
          }

          return (
            <tr>
              <td>{el}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

