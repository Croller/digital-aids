export const getToken = () => {
  const { user } = Constants.GLOBAL;
  const { password } = Constants.GLOBAL;
  const data = {
    user,
    password,
  };

  return (dispatch) => {
    fetch.post('/api/Login', data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setToken(res.data.token));
        } else {
          dispatch(setLoadStatus(res));
        }
      })
      .catch((error) => {
        dispatch(setLoadStatus(error));
      });
  };
};

export const getDictconary = (token, method) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return (dispatch) => {
    fetch.get(`/api/${method}`, config)
      .then((res) => {
      });
  };
};
