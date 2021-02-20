import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

export const ScrollToTopComponent = (props) => {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [props.history.location.pathname]);

  return props.children;
};

export const ScrollToTop = React.memo(withRouter(ScrollToTopComponent));

