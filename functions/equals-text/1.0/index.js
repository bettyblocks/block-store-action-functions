const equalsText = async ({ leftValue, rightValue, comparator, toLower }) => {

    let result = false;
    if (toLower) {
        leftValue = leftValue.toLowerCase();
        rightValue = rightValue.toLowerCase();
    }

    switch (comparator) {
        case 'eq':
            result = leftValue === rightValue;
        case 'neq':
            result = leftValue !== rightValue;
        case 'cont':
            result = leftValue.includes(rightValue);
        case 'ncont':
            result = !leftValue.includes(rightValue);
        case 'startsWith':
            result = leftValue.startsWith(rightValue);
        case 'endsWith':
            result = leftValue.endsWith(rightValue);
        case 'regMatch':
            const regex = new RegExp(rightValue);
            result = regex.test(leftValue);
        default: 
        result = false;
        }

        return {
            result
        }
}

export default equalsText;