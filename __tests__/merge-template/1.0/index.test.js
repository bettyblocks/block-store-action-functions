import mergeTemplate from '../../../functions/merge-template/1.0';

const variables = [
  { key: 'name', value: 'Peter' },
  { key: 'last_name', value: 'Beers' },
];

describe('Merge template with variables', () => {
  test('it will return HTML with parsed variables', async () => {
    const { result } = await mergeTemplate({
      templateText: '<p>Hello {{name}} {{last_name}}!</p>',
      variables,
    });

    expect(result).toBe('<p>Hello Peter Beers!</p>');
  });
});
