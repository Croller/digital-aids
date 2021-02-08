import { CircularProgress, Container } from '@material-ui/core';
import React from 'react';
import './spinner.scss';

export default props => (<Container className="spinner"><CircularProgress {...props} /></Container>);
