const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.API_KEY_MAILGUN,
  domain: process.env.HOST,
});

// const info = {
//   from: 'Information <info@digital-aids.com>',
//   to: '79104643015@yandex.ru',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!',
// };

// mg.messages().send(info, (error, body) => {
//   console.log(error, body);
// });

const error = {
  code: 0,
  name: '',
  text: '',
};

const getMail = (type) => {
  if (['registration', 'restore'].includes(type)) {
    return process.env.HOST_MAIL_LOGIN_SUPPORT;
  }
  return process.env.HOST_MAIL_LOGIN_INFO;
};

module.exports = {
  send: async (req, res) => {
    const { data } = req.body;
    const {
      from = `"Digital Aids" <${getMail(data.type)}>`,
      to = null,
      subject = null,
      body = null,
      files = null,
      html = false, // true for html emails
    } = data;

    const mailOptions = {
      from,
      to,
      subject,
      ...(html ? { html: body } : { text: body }),
      ...(files && {
        attachments: files.map(file => ({
          ...file,
          content: Buffer.from(file.base64.split('base64,')[1], 'base64'),
        })),
      }),
    };
    try {
      const result = await mg.messages().send(mailOptions);
      console.log('mail send:', mailOptions, result);
      res.json(result);
    } catch (err) {
      error.name = 'Mail error';
      error.code = 'sendError';
      error.text = JSON.stringify(err.message);
      res.status(201);
      res.json({ error });
    }
  },
};
