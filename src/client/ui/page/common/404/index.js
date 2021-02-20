import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
} from './styled';

const Page404 = () => (
  <React.Fragment>
    <Helmet>
      <meta content="404" />
      <title>
        404 - Error page
      </title>
    </Helmet>
    <Wrapper>
    
      Ooops! Такой страницы нету...
    </Wrapper>
  </React.Fragment>
);

export default memo(Page404);
