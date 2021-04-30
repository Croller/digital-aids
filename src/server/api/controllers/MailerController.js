import nodemailer from 'nodemailer';

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'owa.mos.ru',
  port: 587,
  secure: false,
  auth: {
    user: 'HQ\\InfoAPR',
    pass: 'Xw4hh7JN',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const MailerController = () => {
  const send = (req, res) => {
    const {
      from,
      to,
      subject,
      message,
      files,
    } = req.body;
    const mailOptions = {
      from,
      to,
      subject,
      html: `<div>${message}</div>`,
      attachments: files.map(file => ({
        ...file,
        content: Buffer.from(file.base64.split('base64,')[1], 'base64'),
      })),
    };
    // const results = await transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(info);
      }
    });
  };

  const sendOneByOne = async (req, res) => {
    const {
      from,
      to,
      subject,
      message,
      files,
      reportTo,
    } = req.body;
    const mailOptions = {
      from,
      to,
      subject,
      html: `<div>${message}</div>`,
      attachments: files.map(file => ({
        ...file,
        content: Buffer.from(file.base64.split('base64,')[1], 'base64'),
      })),
    };

    let mails = [];
    if (Array.isArray(to.split(', '))) {
      mails = to.split(', ');
    } else {
      mails = [to];
    }

    await Promise.all(mails.map(async (email) => {
      await transporter.sendMail({
        ...mailOptions,
        to: email,
      });
    }));
    if (reportTo.length > 0) {
      transporter.sendMail({
        ...mailOptions,
        subject: 'Отчет о рассылке писем',
        to: reportTo,
        html: `<p>Рассылка завершена</p> <p>Следующим адресатам были разосланы письма</p> <ul>${to.split(', ').map(mail => (`<li>${mail}</li>`)).join('')}`,
      });
    }
    res.status(200);
  };

  return {
    send,
    sendOneByOne,
  };
};

export default MailerController;
