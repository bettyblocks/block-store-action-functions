import switchText from '../../../functions/switch-text/1.0/index.js';

// The first test case checks if the function returns the expected value when the input matches a case.
// The second test case verifies that the function returns the input itself when it doesn't match any case.
// The third test case ensures that the function returns the defaultCase value when no matches are found.

describe('switchText', () => {
    test('should return the corresponding value if input matches a case', async () => {
        const input = 'firstName';
        const cases = [{ key: 'firstName', value: 'Betty' }];
        const defaultCase = '';

        const expectedResult = { result: 'Betty' };

        const result = await switchText({ input, cases, defaultCase });

        expect(result).toEqual(expectedResult);
    });

    test('should return the input if it does not match any case', async () => {
        const input = 'lastName';
        const cases = [{ key: 'firstName', value: 'Betty' }];
        const defaultCase = '';

        const expectedResult = { result: '' };

        const result = await switchText({ input, cases, defaultCase });

        expect(result).toEqual(expectedResult);
    });

    test('should return the defaultCase if no matches found', async () => {
        const input = 'lastName';
        const cases = [{ key: 'firstName', value: 'Betty' }];
        const defaultCase = 'No match found';

        const expectedResult = { result: 'No match found' };

        const result = await switchText({ input, cases, defaultCase });

        expect(result).toEqual(expectedResult);
    });
});
