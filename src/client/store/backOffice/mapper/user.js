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
    email: email[0] || '',
    phone: phone[0] || '',
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
    email: [email, ...source.email.filter((f, i) => i !== 0)],
    phone: [phone, ...source.phone.filter((f, i) => i !== 0)],
    ...(password === '1111111111' ? {} : { password }),
  };
};
