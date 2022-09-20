test('sha512 1.0', async () => {
  const output = await $app['sha512 1.0']({
    input: 'Im going to be hashed!',
  });
  assert(output, {
    output:
      '6756c6f02fad9b854266cf2b9a8b3ecbe59e4ce4098de30dfb31b7a25672f92c95b379e7cd44392b7d917cbe88ad3a05d8575882bab59af483de08ccfcc88776',
  });
});
