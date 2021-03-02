import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { RestaurantLogoTempPng } from 'client/assets/images';
import {
  Wrapper,
  IconTextBtnStyled,
  Logo,
  Code,
  Text,
} from './styled';

const Page404 = memo(({ onClick }) => {
  const [t] = useTranslation();
  const { logo } = useSelector(store => store.restaurant);
  return (
    <React.Fragment>
      <Helmet>
        <meta content="404" />
        <title>
          {t('page404.helmet')}
        </title>
      </Helmet>
      <Wrapper>
        <Logo src={logo || RestaurantLogoTempPng} />
        <IconTextBtnStyled
          onClick={onClick}
          btn={t('common.menu')}
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

export default Page404;
