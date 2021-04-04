import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

export const ErrorMessage = () => {
  const [t] = useTranslation();
  const {
    user,
    restaurant,
    company,
    backOffice,
  } = useSelector(store => store);

  useEffect(() => {
    const error = user.error || restaurant.error || company.error || backOffice.error;
    if (error) {
      message.error(t(`common.errorCode.${error.code}`));
    }
  }, [user.error, restaurant.error, company.error, backOffice.error]);

  return (<></>);
};
