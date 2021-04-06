import React from 'react';
import { highlightErrorLog } from 'client/utils/errorHandler';
import { IconTextBtn } from 'client/ui/components/_block/HintsBlock';
import {
  Container,
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
    const { t, children, onClick } = this.props;

    if (hasError) {
      return IconTextBtn ? (
        <Container>
          <IconTextBtnStyled
            btn="menu"
            text={t && t('common.pageError.text')}
            onClick={onClick}
          />
        </Container>
        
      ) : (
        <Text>
          Opps! It seems that somithing was wrong.
        </Text>
      );
    }
    return children;
  }
}

