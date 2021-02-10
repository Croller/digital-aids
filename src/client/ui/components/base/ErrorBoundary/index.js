import React from 'react';
import styled from 'styled-components';
import { highlightErrorLog } from 'client/utils/errorHandler';

const Text = styled.h1`
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    highlightErrorLog({ err: { message: error }, component: 'unknown' });
    return { hasError: true };
  }

  componentDidCatch(error) {
    highlightErrorLog({ err: { message: error }, component: 'unknown' });
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <Text>Что-то пошло не так...</Text>;
    }
    return children;
  }
}

