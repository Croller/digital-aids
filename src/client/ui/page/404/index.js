import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import {
  Wrapper,
  HintsBlockStyled,
  Code,
  Text,
} from './styled';

const Page404 = memo(({ onClick }) => {
  const [t] = useTranslation();

  return (
    <React.Fragment>
      <Helmet>
        <meta content="404" />
        <title>
          {t('common.page404.helmet')}
        </title>
      </Helmet>
      <Wrapper>
        <HintsBlockStyled
          onClick={onClick}
          btn={t('restaurant.common.menu')}
          text={(
            <>
              <Code>404</Code>
              <Text>
                {t('common.page404.text')}
              </Text>
            </>
          )}
        />
      </Wrapper>
    </React.Fragment>
  );
});

export default Page404;
