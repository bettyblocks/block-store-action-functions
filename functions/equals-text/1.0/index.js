const equalsText = async ({ leftValue, rightValue, comparator, toLower }) => {

    let res = false;
    if (toLower) {
        leftValue = leftValue.toLowerCase();
        rightValue = rightValue.toLowerCase();
    }

    switch (comparator) {
        case 'eq':
            res = leftValue === rightValue;
        case 'neq':
            res = leftValue !== rightValue;
        case 'cont':
            res = leftValue.includes(rightValue);
        case 'ncont':
            res = !leftValue.includes(rightValue);
        case 'startsWith':
            res = leftValue.startsWith(rightValue);
        case 'endsWith':
            res = leftValue.endsWith(rightValue);
        case 'regMatch':
            const regex = new RegExp(rightValue);
            res = regex.test(leftValue);
        default: 
            res = false;
        }

        return {
            result: res
        }

}
export default equalsText;