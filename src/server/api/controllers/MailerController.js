const mailer = require('../services/db');

const MailerController = () => {
  const send = (req, res) => mailer.send(req, res);

  return {
    send,
  };
};

export default MailerController;
