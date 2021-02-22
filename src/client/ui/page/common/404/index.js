import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
  IconTextBtnStyled,
  Logo,
  Code,
  Text,
} from './styled';

export const Page404 = memo(({ onClick }) => {
  const [t] = useTranslation();
  return (
    <React.Fragment>
      <Helmet>
        <meta content="404" />
        <title>
          404 - Error page
        </title>
      </Helmet>
      <Wrapper>
        <Logo />
        <IconTextBtnStyled
          onClick={onClick}
          btn="menu"
          text={(
            <>
              <Code>404</Code>
              <Text>
                {t('page404.text')}
              </Text>
            </>
          )}
        />
      </Wrapper>
    </React.Fragment>
  );
});

