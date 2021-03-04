import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  QuestionCircleSvg,
  AlertCircleSvg,
  GlobalSvg,
} from 'client/assets/images';
import {
  Wrapper,
  List,
  ButtonStyled,
  Text,
} from './styled';

const Menu = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const { lng } = useSelector(store => store.user);
  const menu = [
    {
      path: 'reglament',
      name: (
        <>
          <AlertCircleSvg />
          <Text>{t('common.reglament')}</Text>
        </>
      ),
    },
    {
      path: 'opinion',
      name: (
        <>
          <QuestionCircleSvg />
          <Text>{t('common.opinion')}</Text>
        </>
      ),
    },
    {
      path: 'language',
      name: (
        <>
          <GlobalSvg />
          <Text>{t(`common.laguages.${lng}`)}</Text>
        </>
      ),
    },
    {
      path: 'information',
      name: t('common.reservation'),
    },
    {
      path: 'foodtips',
      name: t('common.foodtips'),
    },
  ];

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <List>
        {(menu).map(({ path, name }) => (
          <ButtonStyled
            key={path}
            onClick={() => history.push(path)}
          >
            {name}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Menu;
