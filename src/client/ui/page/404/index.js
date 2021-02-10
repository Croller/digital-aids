import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
} from './styled';

const Page401Component = () => (
  <Wrapper>
    <Helmet>
      <meta name="prerender-status-code" content="401" />
      <link rel="canonical" href="https://www.triptrick.com/" />
    </Helmet>
    Ooops! Такой страницы нету...
  </Wrapper>
);

export default memo(Page401Component);
