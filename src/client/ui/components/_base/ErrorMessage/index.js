import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Message } from 'client/ui/components/_ui/Message';

export const ErrorMessage = () => {
  const [t] = useTranslation();
  const {
    user,
    restaurant,
    company,
    backOffice,
  } = useSelector(store => store);

  const getError = () => {
    const error = user.error || restaurant.error || company.error || backOffice.error;
    if (error && error.code) {
      return t(`common.errorCode.${error.code}`);
    }
    return null;
  };

  return (<Message content={getError()} />);
};
