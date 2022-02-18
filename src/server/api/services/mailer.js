const mailgun = require('mailgun-js');
const commonUtils = require('../utils/common');

const mg = mailgun({
  apiKey: process.env.API_KEY_MAILGUN,
  domain: process.env.HOST,
});

const getEmail = (type = null) => {
  if (type && ['registration', 'restore'].includes(type)) {
    return `support@${process.env.HOST}`;
  }
  return `info@${process.env.HOST}`;
};

const send = async (data) => {
  const {
    from = `"Digital Aids" <${getEmail(data.type)}>`,
    to = null,
    subject = null,
    files = null,
    html = false, // true for html emails
    body = null,
  } = data;

  const mailOptions = {
    from,
    to,
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
    return result;
  } catch (err) {
    commonUtils.setError('mailerSendError', 'Mailer send error', JSON.stringify(err.message));
    return null;
  }
};

module.exports = {
  send,
};
