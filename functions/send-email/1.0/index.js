import templayed from './templayed';

const sendEmail = async ({
  host,
  port,
  username,
  password,
  secure,
  senderEmail,
  senderName,
  toEmail,
  toName,
  subject,
  body,
  record,
  variables,
}) => {
  const smtpCredentials = {
    host,
    port,
    username,
    password,
    secure,
  };

  const parsedBody = body;

  const variableMap = variables.reduce((previousValue, currentValue) => {
    const newValue = {
      ...previousValue,
      [currentValue.key]: currentValue.value,
    };

    return newValue;
  }, {});

  const mail = {
    sender: {
      from: senderName ? `"${senderName}" ${senderEmail}` : senderEmail,
      name: senderName,
    },
    recipient: {
      to: toName ? `"${toName}" ${toEmail}` : toEmail,
    },
    subject,
    body: templayed(parsedBody)(variableMap),
  };

  const sentMail = await smtp(smtpCredentials, mail);

  return {
    result: sentMail,
  };
};

export default sendEmail;
