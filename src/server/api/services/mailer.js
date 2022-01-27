const mailgun = require('mailgun-js');
const commonUtils = require('../utils/common');

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

const send = async (req, res) => {
  const { data } = req.body;
  const {
    from = `"Digital Aids" <${commonUtils.getMail(data.type)}>`,
    email = null,
    subject = null,
    files = null,
    html = false, // true for html emails
    body = null,
  } = data;

  const mailOptions = {
    from,
    to: email,
    subject: `Digital Aids - ${subject}`,
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
    res.json(result);
  } catch (err) {
    error.name = 'Mailer send error';
    error.id = 'mailerSendError';
    error.text = JSON.stringify(err.message);
    res.status(201);
    res.json({ error });
  }
};

module.exports = {
  send,
};
