const nodemailer = require('nodemailer');

const error = {
  code: 0,
  name: '',
  text: '',
};

const transporter = nodemailer.createTransport({
  host: process.env.HOST_MAIL_SERVER,
  port: process.env.HOST_MAIL_SERVER_PORT_OUT,
  secure: true,
  auth: {
    user: process.env.HOST_MAIL_LOGIN_INFO,
    pass: process.env.HOST_MAIL_PASSWORD_INFO,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

// transporter.sendMail({
//   from: `"Node js" <${process.env.HOST_MAIL_LOGIN_INFO}>`,
//   to: '79104643015@yandex.ru',
//   subject: 'Message from Node js',
//   text: 'This message was sent from Node js server.',
//   html:
//     'true',
// });

module.exports = {
  verify: () => transporter.verify()
    .then(() => console.log('Mailer connected'))
    .catch((err) => console.log('Mailer connect error:', err.message)),

  send: async (req, res) => {
    const { data } = req.body;
    const {
      from = `"Digital Carte" <${process.env.HOST_MAIL_LOGIN_INFO}>`,
      to = null,
      subject = null,
      body = null,
      files = null,
      html = false, // true for html emails 
    } = data;

    const mailOptions = {
      from,
      to: to || process.env.HOST_MAIL_LOGIN_INFO,
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
      const result = await transporter.sendMail(mailOptions);
      console.log('mailer send:', mailOptions, result);
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
