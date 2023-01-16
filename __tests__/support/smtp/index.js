const smtp = (smtpCredentials, mail) => {
  if (!smtpCredentials.host) {
    throw new Error('HOSTNAME MISSING');
  }

  if (!mail.recipient.to) {
    throw new Error('MAIL HAS NO RECIPIENT');
  }

  return {
    accepted: [mail.recipient.to],
    envelope: {
      from: mail.sender.from,
      to: [mail.recipient.to],
    },
    envelopeTime: 10,
    messageId: '<123456-7890-1234-567890-1234567890@example.com>',
    messageSize: 700,
    messageTime: 60,
    rejected: [],
    response: '250 Queued as 123456789012345678901234567890',
  };
};

export default smtp;
