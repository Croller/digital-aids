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

// const MailerController = () => {
//   const send = (req, res) => {
//     const {
//       from,
//       to,
//       subject,
//       message,
//       files,
//     } = req.body;
//     const mailOptions = {
//       from,
//       to,
//       subject,
//       html: `<div>${message}</div>`,
//       attachments: files.map(file => ({
//         ...file,
//         content: Buffer.from(file.base64.split('base64,')[1], 'base64'),
//       })),
//     };
//     // const results = await transporter.sendMail(mailOptions);
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         res.status(400).send(err);
//       } else {
//         res.status(200).json(info);
//       }
//     });
//   };

//   const sendOneByOne = async (req, res) => {
//     const {
//       from,
//       to,
//       subject,
//       message,
//       files,
//       reportTo,
//     } = req.body;
//     const mailOptions = {
//       from,
//       to,
//       subject,
//       html: `<div>${message}</div>`,
//       attachments: files.map(file => ({
//         ...file,
//         content: Buffer.from(file.base64.split('base64,')[1], 'base64'),
//       })),
//     };

//     let mails = [];
//     if (Array.isArray(to.split(', '))) {
//       mails = to.split(', ');
//     } else {
//       mails = [to];
//     }

//     await Promise.all(mails.map(async (email) => {
//       await transporter.sendMail({
//         ...mailOptions,
//         to: email,
//       });
//     }));
//     if (reportTo.length > 0) {
//       transporter.sendMail({
//         ...mailOptions,
//         subject: 'Отчет о рассылке писем',
//         to: reportTo,
//         html: `<p>Рассылка завершена</p> <p>Следующим адресатам были разосланы письма</p> <ul>${to.split(', ').map(mail => (`<li>${mail}</li>`)).join('')}`,
//       });
//     }
//     res.status(200);
//   };

//   return {
//     send,
//     sendOneByOne,
//   };
// };

// export default MailerController;
