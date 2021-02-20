import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
// import { ChefSvg } from 'client/assets/images';
import { IconTextBtn } from 'client/ui/components/base/Block/IconTextBtn';
import {
  Wrapper,
  Logo,
  Container,
  LogoTitle,
  Content,
  Text,
  Button,
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
      {/* <Container>
        <LogoTitle>
          <ChefSvg />
        </LogoTitle>
        <Content>
          <Text>
            The page cannot be found.
            <br />
            Please, start on menu page
            <br />
            to try again. 
          </Text>
          <Button>
            Menu
          </Button>
        </Content>
      </Container> */}
    </Wrapper>
  </React.Fragment>
);

export default memo(Page404);
