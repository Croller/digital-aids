import moment from 'moment';

// const latin = /[a-zA-ZÀ-ÿ]/;
const cyrilic = /[а-яА-ЯЁё]/;
const number = /[0-9]/;
const float = /[0-9.]/;

export const collectError = (errorFields = null) => {
  if (!errorFields) return null;
  const collected = errorFields.reduce((obj, { name, errors }) => ({
    ...obj,
    [name[0]]: errors[0],
  }), {});
  console.log('Form validation errors:', collected);
  return collected;
};

export const rules = (t) => ({
  text: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.text.null'));
        }
        if (value.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('common.form.validation.text.error')));
      },
    }),
  ],
  number: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.number.null'));
        }
        if (!parseInt(value, 0) || !number.test(value)) {
          return Promise.reject(new Error(t('common.form.validation.number.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  float: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.float.null'));
        }
        if (!parseFloat(value) || !float.test(value)) {
          return Promise.reject(new Error(t('common.form.validation.float.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  login: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.login.null'));
        }
        if (value.indexOf(' ') > -1 || cyrilic.test(value)) {
          return Promise.reject(new Error(t('common.form.validation.login.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  password: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.password.null'));
        }
        if (value.indexOf(' ') > -1 || cyrilic.test(value)) {
          return Promise.reject(new Error(t('common.form.validation.password.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  email: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.email.null'));
        }
        if (value.indexOf(' ') > -1 || value.indexOf('@') === -1 || value.indexOf('.') === -1 || cyrilic.test(value)) {
          return Promise.reject(new Error(t('common.form.validation.email.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  phone: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.phone.null'));
        }
        if (value.indexOf('_') > -1) {
          return Promise.reject(new Error(t('common.form.validation.phone.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  birthdate: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(t('common.form.validation.birthdate.null'));
        }
        if (value.indexOf('_') > -1 || !moment(value, 'DD.MM.YYYY').isValid()) {
          return Promise.reject(new Error(t('common.form.validation.birthdate.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  bool: [
    () => ({
      validator(_, value) {
        if (value === null) {
          return Promise.reject(new Error(t('common.form.validation.bool.error')));
        }
        return Promise.resolve();
      },
    }),
  ],
  select: [
    () => ({
      validator(_, value) {
        if (!value || (value && value.length === 0)) {
          return Promise.reject(new Error(t('common.form.validation.select.null')));
        }
        return Promise.resolve();
      },
    }),
  ],
});
