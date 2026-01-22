import { vi } from 'vitest';
import expression from '../../../functions/expression/1.3';

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

  test('logs error to console.error when debugLogging is true', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      expression({
        expression: 'not_defined_variable + 1',
        variables: [],
        debugLogging: true,
      }),
    ).rejects.toThrowError(/not_defined_variable is not defined/);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error evaluating expression:'),
    );

    consoleSpy.mockRestore();
  });

  test('does not log error to console.error when debugLogging is false', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      expression({
        expression: 'not_defined_variable + 1',
        variables: [],
        debugLogging: false,
      }),
    ).rejects.toThrowError();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
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

  test('throws formatted error when template is wrong', async () => {
    let success = false;
    try {
      let a = await expression({
        expression: 'testing + "!!"',
        variables: [{ key: 'testing', value: 'testing' }],
      });
      console.log({ a });
      success = true;
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'Error evaluating expression: "testing is not defined" (template: testing + "!!" variables: {"testing":"testing"})',
        ),
      );
    }

    expect(success).toBe(false);
  });
});
