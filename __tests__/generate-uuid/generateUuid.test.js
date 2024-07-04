import generateUuid from '../../functions/generate-uuid/1.0';

describe('generateUuid', () => {
  test('generates a deserialized uuid', async () => {
    const response = await generateUuid();
    expect(response.result.length).toBe(36);
  });
  test('generates unique values', async () => {
    const loop = 100;
    const list = {};

    for (let i = 0; i < loop; i++) {
      const response = await generateUuid();
      list[response.result] = response.result;
    }
    expect(Object.keys(list).length).toBe(loop);
    Object.keys(list).forEach((key) => expect(key.length).toBe(36));
  });
});
