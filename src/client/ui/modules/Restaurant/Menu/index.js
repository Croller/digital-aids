import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDictionaryItem } from 'client/utils/common';
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
  const { user: { info: { language } }, restaurant: { dictionary: { languages } } } = useSelector(s => s);

  const menu = [
    {
      path: 'reglament',
      name: (
        <>
          <AlertCircleSvg />
          <Text>{t('restaurant.common.reglament')}</Text>
        </>
      ),
    },
    {
      path: 'opinion',
      name: (
        <>
          <QuestionCircleSvg />
          <Text>{t('restaurant.common.opinion')}</Text>
        </>
      ),
    },
    {
      path: 'language',
      name: (
        <>
          <GlobalSvg />
          <Text>{getDictionaryItem(language, 'id', languages, 'name')}</Text>
        </>
      ),
    },
    {
      path: 'assistant',
      name: t('restaurant.common.assistant'),
    },
    {
      path: 'information',
      name: t('restaurant.common.reservation'),
    },
    {
      path: 'foodtips',
      name: t('restaurant.common.foodtips'),
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
