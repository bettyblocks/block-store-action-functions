const equalsText = async ({ leftValue, rightValue, comparator, toLower }) => {
    if (toLower) {
        leftValue = leftValue.toLowerCase();
        rightValue = rightValue.toLowerCase();
    }

    switch (comparator) {
        case 'eq':
            return { result: leftValue === rightValue };
        case 'neq':
            return { result: leftValue !== rightValue };
        case 'cont':
            return { result: leftValue.includes(rightValue) };
        case 'ncont':
            return { result: !leftValue.includes(rightValue) };
        case 'startsWith':
            return { result: leftValue.startsWith(rightValue) };
        case 'endsWith':
            return { result: leftValue.endsWith(rightValue) };
        case 'regMatch':
            const regex = new RegExp(rightValue);
            return { result: regex.test(leftValue) };
        default: 
            return { result: false }
        }
    }
    export default equalsText;