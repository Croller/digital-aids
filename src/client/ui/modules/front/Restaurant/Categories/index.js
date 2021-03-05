import React, { useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Confirm18Modal } from 'client/ui/components/_block/Modal/Confirm18';
import {
  Wrapper,
  Title,
  List,
  ButtonStyled,
} from './styled';

const Categories = () => {
  const history = useHistory();
  const { categories } = useSelector(store => store.restaurant);
  const [t] = useTranslation();
  const [confirmAge, hideModal] = useModal(() => (
    <Confirm18Modal
      onCancel={hideModal}
      onOk={() => {
        const category = categories.find(f => f.check_age);
        if (category) {
          history.push(`categories/${category.key}`);
        }
      }}
    />
  ));

  const handleRoute = (key) => {
    history.push(`categories/${key}`);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return categories && (
    <>
      <Wrapper>
        <Title>
          {t('common.menu')}
        </Title>
        <List>
          {(categories).map(category => (
            <ButtonStyled
              key={category.key}
              onClick={() => (category.check_age ? confirmAge({ test: 'etet' }) : handleRoute(category.key))}
            >
              {category.name}
            </ButtonStyled>
          ))}
        </List>
      </Wrapper>
    </>
  );
};

export default Categories;
