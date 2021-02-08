import React from 'react';
import { Fade } from 'react-reveal';

const defaultProps = {
  distance: '30px',
  duration: 500,
  bottom: true,
  cascade: true,

};
const Faded = props => <Fade {...{ ...defaultProps, ...props }} />;

export default Faded;
