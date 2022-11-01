const gql = async (query) => {
  return [{ id: 1, name: 'Bruce Wayne' }];
};

const steps = async (n) => {
  await e.scope(
    n,
    {
      index: '04e1e3e62a0d46aebe0d542313deebfe',
      iterator: '0ab4e0441c814dffaa60d39ba7031412',
    },
    async () => {
      {
        const n = 'a',
          t = ' ',
          r = 'b',
          a = await f['concatString 1.0']({ left: n, right: r, separator: t });
        e.set(a, { result: '0d3ce4c927564001b69d0a3411dfb720' });
      }
      {
        const n = 'debug',
          t = [
            {
              key: 'result',
              value: await e.get('0d3ce4c927564001b69d0a3411dfb720'),
            },
          ];
        await w({ severity: n, variables: t });
      }
    }
  );
};
