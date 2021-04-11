const db = require('../services/db');
const commonUtils = require('../utils/common');

const error = {
  code: 0,
  name: '',
  text: '',
};

let query = '';
let values = [];

export const updateRowAndUser = async (table, data, params) => {
  const { res, tokenData: { login, password, restaurants } } = params;
  try {
    const mapper = Object.keys(data).filter(f => f !== 'id').reduce((obj, key) => {
      if (key === 'images') {
        return {
          fields: [...obj.fields, key],
          values: [...obj.values, (data[key] ? data[key].map((image) => (image ? image.uuid : null)) : null)],
        };
      }
      return {
        fields: [...obj.fields, key],
        values: [...obj.values, data[key]],
      };
    }, { fields: [], values: [] });

    if (data.images) {
      await Promise.all(data.images.filter(f => f).map(async (image) => {
        const { base64, path } = image;
        const file = await commonUtils.writeFile(path, base64);
        return file;
      }));
    }
    let result;
    if (!data.id) {
      query = `INSERT INTO ${table} (${mapper.fields.join(', ')}) VALUES (${mapper.fields.map((key, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
      result = await db.queryValues(query, mapper.values);

      if (table === 'data_restaurants') {
        query = 'UPDATE data_users SET restaurants=$1 WHERE login=$2 AND password=$3';
        values = [[...(restaurants || []), result.rows[0].id], login, password];
        await db.queryValues(query, values);
      }
    } else {
      query = `UPDATE ${table} SET ${mapper.fields.map((filed, f) => `${filed}=$${f + 2}`).join(', ')} WHERE id=$1 RETURNING *`;
      result = await db.queryValues(query, [data.id, ...mapper.values]);
    }
    return result.rows[0];
  } catch (err) {
    error.name = 'Query error';
    error.code = 'queryError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};
