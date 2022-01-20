import React from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';

export const ErrorBoundary = ({ children }) => {
  const ErrorFallback = ({ error }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      {/* <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );

  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </Boundary>
  );
};
