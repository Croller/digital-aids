import * as Constants from '../constants';

export default function reducer(global = Constants.GLOBAL, action) {
  switch (action.type) {
    case Constants.GLOBAL_USER_SET:
      return {
        ...global,
        user: { ...action.obj },
        host: getOrigin(),
        loading: false,
      };
    case Constants.GLOBAL_USER_DELETE:
      return {
        ...global,
        user: null,
        loading: false,
      };
    case Constants.GLOBAL_SUPPORT_DATA_SET:
      return {
        ...global,
        supportData: { ...global.supportData, ...action.obj },
        loading: false,
      };
    case Constants.GLOBAL_ERROR_SET:
      return {
        ...global,
        error: { ...action.obj },
        loading: false,
      };
    case Constants.GLOBAL_LOADING_SET:
      return {
        ...global,
        loading: action.obj,
        error: null,
      };
    default:
      return global;
  }
}

const getOrigin = () => {
  const url = document.createElement('a');
  url.href = window.location.href;
  if (url.href.indexOf(8083) > -1) {
    return process.env.REACT_APP_HOST;
  }
  return url.origin;
};
