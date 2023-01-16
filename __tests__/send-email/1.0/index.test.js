import sendEmail from '../../../functions/send-email/1.0';

describe('Send Email', () => {
  test('It sends an e-mail with based on the settings', async () => {
    const { result } = await sendEmail({
      host: 'smtpserver.example.com',
      port: 587,
      toEmail: 'test@example.com',
      senderEmail: 'from@example.com',
      variables: [],
      body: '<p>Example Email</p>',
    });
    expect(result.response).toBe(
      '250 Queued as 123456789012345678901234567890',
    );
  });
});
