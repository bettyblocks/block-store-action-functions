import compareNumber from '../../functions/compare-number/1.0';

const leftValue = 15;
const rightValue = 1;

if (leftValue === rightValue) {
    describe('Compare-nr test suite where left == right', () => {
        test('Using "eq" returns true if the values are equal', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'eq' })).toStrictEqual({ result: true });
        })

        test('Using "neq" returns false if the values are not equal', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'neq' })).toStrictEqual({ result: false });
        })

        test('Using "lower" returns false if the first value is lower then the second value', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lower' })).toStrictEqual({ result: false });
        })

        test('Using "lowerEq" returns true if the first value is lower then the second value or if the values are equal', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lowerEq' })).toStrictEqual({ result: true });
        })

        test('Using "higher" returns false if the first value is higher then the second value', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higher' })).toStrictEqual({ result: false });
        })

        test('Using "higherEq" returns true if the first value is higher then the second value or if the values are equal', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higherEq' })).toStrictEqual({ result: true });
        })
    })
} else if (leftValue < rightValue) {
    describe('Compare-nr test suite where left < right', () => {
        test('Using "eq" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'eq' })).toStrictEqual({ result: false });
        })

        test('Using "neq" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'neq' })).toStrictEqual({ result: true });
        })

        test('Using "lower" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lower' })).toStrictEqual({ result: true });
        })

        test('Using "lowerEq" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lowerEq' })).toStrictEqual({ result: true });
        })

        test('Using "higher" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higher' })).toStrictEqual({ result: false });
        })

        test('Using "higherEq" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higherEq' })).toStrictEqual({ result: false });
        })
    })
} else if (leftValue > rightValue) {
    describe('Compare-nr test suite where left > right', () => {
        test('Using "eq" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'eq' })).toStrictEqual({ result: false });
        })

        test('Using "neq" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'neq' })).toStrictEqual({ result: true });
        })

        test('Using "lower" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lower' })).toStrictEqual({ result: false });
        })

        test('Using "lowerEq" returns false', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'lowerEq' })).toStrictEqual({ result: false });
        })

        test('Using "higher" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higher' })).toStrictEqual({ result: true });
        })

        test('Using "higherEq" returns true', async () => {
            expect(compareNumber({ leftValue: leftValue, rightValue: rightValue, comparator: 'higherEq' })).toStrictEqual({ result: true });
        })
    })
}