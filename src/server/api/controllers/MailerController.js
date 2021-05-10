const mailer = require('../services/mailer');

const MailerController = () => {
  const send = (req, res) => mailer.send(req, res);

  return {
    send,
  };
};

export default MailerController;
