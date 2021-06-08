import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import translate from 'client/i18n';
import { setUser } from 'client/utils/localStorageEdit';
import { update } from 'client/store/user';
import { getDictionaryItem } from 'client/utils/common';
import { init } from 'client/store/restaurant';
import {
  Wrapper,
  List,
  ButtonStyled,
} from './styled';

const Language = () => {
  const history = useHistory();
  const rootDispatch = useDispatch();
  const state = useSelector(s => s);
  const { user: { info }, restaurant: { info: { languages, key }, dictionary } } = state;

  const handleClick = (lng) => {
    translate.changeLanguage(lng);
    setUser({ lng });
    rootDispatch(update({ ...info, language: lng }));
    rootDispatch(init({ restaurant: key, language: lng }));
    
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
        {languages.map(lng => (
          <ButtonStyled
            key={`_language_${lng}`}
            onClick={() => handleClick(lng)}
          >
            {getDictionaryItem(lng, 'id', dictionary.languages, 'name')}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Language;
