import React, { useState, useEffect } from 'react';
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
  const [confirmAge, setConfirmAge] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [t] = useTranslation();

  const handleClick = (category) => {
    if (category.check_age) {
      setSelectedKey(category.key);
      handleToggleConfirm18Modal();
      return null;
    }
    handleRoute(category.key);
  };

  const handleToggleConfirm18Modal = () => {
    setConfirmAge(!confirmAge);
  };

  const handleAgreeConfirm18Modal = () => {
    handleRoute(selectedKey);
  };

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
              onClick={() => handleClick(category)}
            >
              {category.name}
            </ButtonStyled>
          ))}
        </List>
      </Wrapper>
      {confirmAge && (
        <Confirm18Modal
          onOk={handleAgreeConfirm18Modal}
          onCancel={handleToggleConfirm18Modal}
        />
      )}
    </>
  );
};

export default Categories;
