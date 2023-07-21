const name = 'Batman';
const characters = [
  { name: 'Batman', team: 'Heroes' },
  { name: 'Hulk', team: 'Heroes' },
  { name: 'Iron Man', team: 'Heroes' },
  { name: 'Joker', team: 'Villains' },
  { name: 'Lex Luthor', team: 'Villains' },
  { name: 'Mandarin', team: 'Villains' },
  { name: 'Sandman', team: 'Villains' },
  { name: 'Spider-Man', team: 'Heroes' },
  { name: 'Superman', team: 'Heroes' },
  { name: 'Venom', team: 'Villains' },
];

test('liquid 1.0', async () => {
  const { as } = await $app['liquid 1.0']({
    template: 'Hello, {{name}}!',
    context: [{ key: 'name', value: name }],
  });

  assert(as, 'Hello, Batman!');
});
