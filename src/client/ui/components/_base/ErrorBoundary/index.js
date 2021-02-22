import React from 'react';
import { highlightErrorLog } from 'client/utils/errorHandler';
import { IconTextBtn } from 'client/ui/components/_base/Block/IconTextBtn';
import {
  IconTextBtnStyled,
  Text,
} from './styled';

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
      return IconTextBtn ? (
        <IconTextBtnStyled
          onClick={this.onClick}
          btnText="menu"
          text={(
            <>
              Opps! It seems that
              <br />
              somithing was wrong.
              <br />
              But we are here to help you!
              <br />
              Please, just press
              <br />
              the botton and try again.
            </>
          )}
        />
      ) : (
        <Text>
          Opps! It seems that somithing was wrong.
        </Text>
      );
    }
    return children;
  }
}

