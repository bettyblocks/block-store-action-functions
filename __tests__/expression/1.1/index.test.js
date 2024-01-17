import expression from '../../../functions/expression/1.1';

describe('Expression', () => {
  const name = 'John Doe';
  const age = '17';
  test('It handles a expression with input variables', async () => {
    const result = await expression({
      expression: '"{{name}}"',
      variables: [{ key: 'name', value: name }],
    });
    expect(result).toEqual({ result: name });
  });

  test('It evaluate two string values', async () => {
    const result = await expression({
      expression: "'{{first_name}}' + ' ' + '{{last_name}}'",
      variables: [
        { key: 'first_name', value: 'John' },
        { key: 'last_name', value: 'Doe' },
      ],
    });

    expect(result).toEqual({ result: 'John Doe' });
  });

  test('It evaluate a ternary expression', async () => {
    const result = await expression({
      expression: '{{age}} > 17 ? true : false',
      variables: [{ key: 'age', value: age }],
    });

    expect(result).toEqual({ result: false });
  });

  test('It evaluate counting two numbers', async () => {
    const result = await expression({
      expression: '{{number1}} + {{number2}}',
      variables: [
        { key: 'number1', value: '1' },
        { key: 'number2', value: '1' },
      ],
    });

    expect(result).toEqual({ result: 2 });
  });

  test('It respects pipelines', async () => {
    const result = await expression({
      expression: '"hello || world"',
      variables: [],
    });

    expect(result).toEqual({ result: 'hello || world' });
  });

  test('It respects interpolating falsy values', async () => {
    const result = await expression({
      expression: '{{count}} || 1',
      variables: [{ key: 'count', value: 0 }],
    });

    expect(result).toEqual({ result: 1 });
  });

  test('It handles arrays', async () => {
    const result = await expression({
      expression: '"{{#names}}{{.}}, {{/names}}"',
      variables: [{ key: 'names', value: ['John', 'Jane'] }],
    });

    expect(result).toEqual({ result: 'John, Jane, ' });
  });
});
