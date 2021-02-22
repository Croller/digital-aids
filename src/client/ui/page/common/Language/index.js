import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const Language = ({ categories }) => {
  const history = useHistory();
  const path = '/restaurant/las-cuevas/categories';
  
  const handleClick = (lng) => {
    // change state lng
    history.push(path);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <List>
        {(categories || mock).map(({ lng, name }) => (
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
