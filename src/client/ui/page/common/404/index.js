import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
} from './styled';

const Page404 = () => (
  <Wrapper>
    <Helmet>
      <meta content="404" />
    </Helmet>
    Ooops! Такой страницы нету...
  </Wrapper>
);

export default memo(Page404);
