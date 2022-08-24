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
  // throw JSON.stringify(variables);
  const variableMap = variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const mail = {
    sender: {
      from: senderEmail,
      name: senderName,
    },
    recipient: {
      to: toEmail,
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
