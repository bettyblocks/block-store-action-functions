import expression from '../../../functions/expression/1.2';

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

  test('It can loop through arrays', async () => {
    const result = await expression({
      expression: '"{{#names}}{{.}}, {{/names}}"',
      variables: [{ key: 'names', value: ['John', 'Jane'] }],
    });

    expect(result).toEqual({ result: 'John, Jane, ' });
  });

  test('It handles arrays', async () => {
    const result = await expression({
      expression: '{{{names}}}',
      variables: [{ key: 'names', value: ['John', 'Jane'] }],
    });

    expect(result).toEqual({ result: ['John', 'Jane'] });
  });

  test('It maps through an array of objects', async () => {
    const result = await expression({
      expression: '{{{names}}}.map((name) => name.value)',
      variables: [
        {
          key: 'names',
          value: [
            {
              id: 1,
              label: 'Hello',
              index: 1,
              value: 'World',
            },
            {
              id: 2,
              label: 'Foo',
              index: 2,
              value: 'Bar',
            },
            {
              id: 3,
              label: 'Baz',
              index: 3,
              value: 'Qux',
            },
            {
              id: 4,
              label: 'Quux',
              index: 4,
              value: 'Corge',
            },
            {
              id: 5,
              label: 'Grault',
              index: 5,
              value: 'Garply',
            },
            {
              id: 6,
              label: 'Waldo',
              index: 6,
              value: 'Fred',
            },
            {
              id: 7,
              label: 'Plugh',
              index: 7,
              value: 'Xyzzy',
            },
            {
              id: 8,
              label: 'Thud',
              index: 8,
              value: 'Blah',
            },
          ],
        },
      ],
    });

    expect(result).toEqual({
      result: [
        'World',
        'Bar',
        'Qux',
        'Corge',
        'Garply',
        'Fred',
        'Xyzzy',
        'Blah',
      ],
    });
  });

  test('It handles objects', async () => {
    const result = await expression({
      expression: '{{{object}}}',
      variables: [
        {
          key: 'object',
          value: {
            id: 1,
            label: 'Hello',
            index: 1,
            value: 'World',
          },
        },
      ],
    });

    expect(result).toEqual({
      result: {
        id: 1,
        label: 'Hello',
        index: 1,
        value: 'World',
      },
    });
  });
});
