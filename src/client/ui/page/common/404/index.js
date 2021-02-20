import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { IconTextBtn } from 'client/ui/components/base/Block/IconTextBtn';
import {
  Wrapper,
  Logo,
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
      <Logo />
      <IconTextBtn
        onClick={() => {}}
        btnText="menu"
        text={(
          <>
            The page cannot be found.
            <br />
            Please, start on menu page
            <br />
            to try again. 
          </>
        )}
      />
    </Wrapper>
  </React.Fragment>
);

export default memo(Page404);
