import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import i18n from 'client/i18n';

import {
  Wrapper,
  List,
  ButtonStyled,
} from './styled';

const mock = [
  {
    lng: 'en',
    name: 'English',
  },
  {
    lng: 'dt',
    name: 'Deutsch',
  },
  {
    lng: 'es',
    name: 'Español',
  },
  {
    lng: 'nr',
    name: 'Norsk',
  },
  {
    lng: 'ru',
    name: 'Русский',
  },
];

const Language = () => {
  const history = useHistory();
  const languages = null;

  const handleClick = (lng) => {
    i18n.changeLanguage(lng);
    history.push('categories');
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <List>
        {(languages || mock).map(({ lng, name }) => (
          <ButtonStyled
            key={lng}
            onClick={() => handleClick(lng)}
          >
            {name}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Language;
