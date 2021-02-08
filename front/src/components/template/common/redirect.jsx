import React from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Usage: <Redirect to={"/path/to/go"} back={"/path/to/return"} />
 * in called component:
 * const back = props.location.state ? props.location.state.back : '/'
 */

export default props => (
  <Redirect to={{
    pathname: props.to,
    state: { back: props.back },
  }}
  />
);

