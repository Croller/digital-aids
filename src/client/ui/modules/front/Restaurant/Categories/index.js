import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  Wrapper,
  Title,
  List,
  ButtonStyled,
} from './styled';

const mock = [
  {
    key: 'dailymenu',
    name: 'Daily Menu',
  },
  {
    key: 'cold-appetizes',
    name: 'Cold Appetizes',
  },
  {
    key: 'hot-appetizes',
    name: 'Hot Appetizes',
  },
  {
    key: 'pasta',
    name: 'Pasta',
  },
  {
    key: 'soups',
    name: 'Soups',
  },
  {
    key: 'desserts',
    name: 'Desserts',
  },
  {
    key: 'drinks-with-alcohol',
    name: 'Drinks with alcohol',
  },
  {
    key: 'drinks-no-alcohol',
    name: 'Drinks no alcohol',
  },
  {
    key: 'for-children',
    name: 'For children',
  },
];

const Categories = ({ categories }) => {
  const history = useHistory();
  const [t] = useTranslation();
  const path = '/restaurant/las-cuevas/categories';

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <Title>
        {t('common.menu')}
      </Title>
      <List>
        {(categories || mock).map(({ key, name }) => (
          <ButtonStyled
            key={key}
            onClick={() => history.push(`${path}/${key}`)}
          >
            {name}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Categories;
