import * as moment from 'moment';

export const dataToForm = (data) => {
  const { 
    surname,
    name,
    middlename,
    login,
    password = '1111111111',
    birthdate,
    email,
    phone,
    roles,
  } = data;

  return {
    surname,
    name,
    middlename,
    login,
    password,
    birthdate: moment(birthdate).isValid ? moment(birthdate).format('DD.MM.YYYY') : null,
    email,
    phone,
    roles,
  };
};

export const dataToApi = (data, source) => {
  const {
    surname,
    name,
    middlename,
    login,
    password,
    birthdate,
    email,
    phone,
  } = data;

  return {
    id: source.id,
    surname,
    name,
    middlename,
    login,
    birthdate: moment(birthdate).isValid ? moment(birthdate, 'DD.MM.YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS') : null,
    email,
    phone,
    ...(password === '1111111111' ? {} : { password }),
  };
};
