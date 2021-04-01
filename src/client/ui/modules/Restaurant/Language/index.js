import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import translate, { languages } from 'client/i18n';
import { setUser } from 'client/utils/localStorageEdit';

import {
  Wrapper,
  List,
  ButtonStyled,
} from './styled';

const Language = () => {
  const history = useHistory();

  const handleClick = (lng) => {
    translate.changeLanguage(lng);
    setUser({ lng });
    
    if (history.action !== 'POP') {
      history.goBack();
      return null;
    }
    history.push('categories');
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <List>
        {Object.keys(languages).map(lng => (
          <ButtonStyled
            key={`_language_${lng}`}
            onClick={() => handleClick(lng)}
          >
            {languages[lng].name}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Language;
