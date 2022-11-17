/* eslint-disable no-eval */
import expression from '../../../functions/expression/1.0';

describe('Expression', () => {
  global.eval = jest.fn();
  test('It evaluate two string values', async () => {
    await expression({
      expression: "'{{first_name}}' + ' ' + '{{last_name}}'",
      variables: [
        { key: 'first_name', value: 'John' },
        { key: 'last_name', value: 'Doe' },
      ],
      outputType: 'text',
    });

    expect(eval).toBeCalledWith("'John' + ' ' + 'Doe'");
  });

  test('It evaluate a ternary expression', async () => {
    await expression({
      expression: '{{age}} > 17 ? true : false',
      variables: [{ key: 'age', value: '17' }],
      outputType: 'checkbox',
    });

    expect(eval).toBeCalledWith('17 > 17 ? true : false');
  });

  test('It evaluate counting two numbers', async () => {
    await expression({
      expression: '{{number1}} + {{number2}}',
      variables: [
        { key: 'number1', value: '1' },
        { key: 'number2', value: '1' },
      ],
      outputType: 'number',
    });

    expect(eval).toBeCalledWith('1 + 1');
  });
});
