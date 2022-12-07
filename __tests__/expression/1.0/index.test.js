import expression from '../../../functions/expression/1.0';

describe('Expression', () => {
  test('It handles a expression with input variables', async () => {
    const name = 'testName';
    const outputType = 'text';
    const result = await expression({
      expression: '"{{name}}"',
      variables: [{ key: 'name', value: name }],
      outputType,
    });
    expect(result).toEqual({ [outputType]: name });
  });
});
