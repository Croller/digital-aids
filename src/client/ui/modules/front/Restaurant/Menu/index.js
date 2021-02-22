import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { QuestionCircleSvg, AlertCircleSvg } from 'client/assets/images';
import {
  Wrapper,
  List,
  ButtonStyled,
} from './styled';

const Menu = () => {
  const history = useHistory();
  const [t] = useTranslation();

  const MENU = [
    {
      path: 'information',
      name: t('common.reservation'),
    },
    {
      path: 'language',
      name: t('common.language'),
    },
    {
      path: 'opinion',
      name: (
        <>
          <QuestionCircleSvg />
          {t('common.opinion')}
        </>
      ),
    },
    {
      path: 'reglament',
      name: (
        <>
          <AlertCircleSvg />
          {t('common.reglament')}
        </>
      ),
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
        {(MENU).map(({ path, name }) => (
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
