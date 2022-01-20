// ------------------------------------------------------------------------------------------------------------------------
// constants

export const dateTimeFormat = {
  date: 'DD.MM.YYYY',
  dateTime: 'DD.MM.YYYY HH:mm:ss.S',
  time: 'HH:mm',
  database: 'YYYY-MM-DDTHH:mm:ss.SSS',
};

// ------------------------------------------------------------------------------------------------------------------------
// logical func

export const getUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return `https://${process.env.HOST}`;
};

// ------------------------------------------------------------------------------------------------------------------------
// dom func
