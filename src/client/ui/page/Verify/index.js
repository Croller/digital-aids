import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Loader } from 'client/ui/components/_block/Loader';
import { showMessage } from 'client/ui/components/_ui/Message';
import { useTranslation } from 'react-i18next';
import { update } from 'client/store/user';

const { href } = window.location;

export const Verify = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(s => s);
  const [t] = useTranslation();
  const [initUrl, setInitUrl] = useState(null);

  useEffect(() => {
    let url = null;
    if (href.indexOf('/verify?account=') > -1) {
      const token = href.split('?account=')[1];
      if (token && typeof token === 'string') {
        url = href;
        rootDispatch(update({ token, data: null }));
      }
    }
    setInitUrl(url);
    history.push('/verify');
  }, []);

  useEffect(() => {
    if (initUrl && initUrl.indexOf('/verify?account=') > -1) {
      showMessage({ type: 'success', content: t(`common.account.status.${status}`) });
    }
  }, [user.status]);

  return (<Loader />);
};

export default Verify;
