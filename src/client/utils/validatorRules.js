export const rules = (t) => ({
  login: [
    () => ({
      validator(_, value) {
        if (!value) {
          return Promise.reject(new Error(t('common.form.validation.login.null')));
        }
        if (value && value.indexOf(' ') === -1) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('common.form.validation.login.error')));
      },
    }),
  ],
  password: [
    () => ({
      validator(_, value) {
        if (!value) {
          return Promise.reject(new Error(t('common.form.validation.password.null')));
        }
        if (value && value.indexOf(' ') === -1) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('common.form.validation.password.error')));
      },
    }),
  ],
});
