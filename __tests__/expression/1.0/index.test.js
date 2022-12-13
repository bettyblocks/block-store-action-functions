import expression from '../../../functions/expression/1.0';

describe('Expression', () => {
  const name = 'John Doe';
  const age = '17';
  test('It handles a expression with input variables', async () => {
    const outputType = 'text';
    const result = await expression({
      expression: '"{{name}}"',
      variables: [{ key: 'name', value: name }],
      outputType,
    });
    expect(result).toEqual({ [outputType]: name });
  });

  test('It evaluate two string values', async () => {
    const outputType = 'text';
    const result = await expression({
      expression: "'{{first_name}}' + ' ' + '{{last_name}}'",
      variables: [
        { key: 'first_name', value: 'John' },
        { key: 'last_name', value: 'Doe' },
      ],
      outputType: 'text',
    });

    expect(result).toEqual({ [outputType]: 'John Doe' });
  });

  test('It evaluate a ternary expression', async () => {
    const outputType = 'checkbox';
    const result = await expression({
      expression: '{{age}} > 17 ? true : false',
      variables: [{ key: 'age', value: age }],
      outputType,
    });

    expect(result).toEqual({ [outputType]: false });
  });

  test('It evaluate counting two numbers', async () => {
    const outputType = 'number';
    const result = await expression({
      expression: '{{number1}} + {{number2}}',
      variables: [
        { key: 'number1', value: '1' },
        { key: 'number2', value: '1' },
      ],
      outputType: 'number',
    });

    expect(result).toEqual({ [outputType]: 2 });
  });
});
