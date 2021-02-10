require('dotenv').config();
const mailgun = require('mailgun-js')(
  {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
);

const tempFrom = {
  support: {
    title: 'Support - CRM World',
    email: 'support@crm-world.com',
  },
  technical: {
    title: 'Tech - CRM World',
    email: 'tech@crm-world.com',
  },
  restore: {
    title: 'Restore Password - CRM World',
    email: 'support@crm-world.com',
  },
};

module.exports = {
  Send: (from, to, subject, text) => {
    const data = {
      from: `${tempFrom[from].title} <${tempFrom[from].email}>`,
      to,
      subject,
      text,
    };

    mailgun.messages().send(data, (error, body) => {
      console.log(body);
    });
  },
};
