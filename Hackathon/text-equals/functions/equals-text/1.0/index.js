const equalsText = async ({ leftValue, rightValue, comparator, toLower }) => {
    if (toLower) {
        leftValue = leftValue.toLowerCase();
        if(comparator !== 'regMatch') {
            rightValue = rightValue.toLowerCase();
        }
    }

    let res = false;

    switch (comparator) {
        case 'eq':
            res = leftValue === rightValue;
            break;
        case 'neq':
            res = leftValue !== rightValue
            break;
        case 'cont':
            res = leftValue.includes(rightValue);
            break;  
        case 'ncont':
            res = !leftValue.includes(rightValue);
            break;
        case 'startsWith':
            res = leftValue.startsWith(rightValue);
            break;
        case 'endsWith':
            res = leftValue.endsWith(rightValue);
            break;
        case 'regMatch':
            const regex = new RegExp(rightValue);
            res = regex.test(leftValue);
            break;
        default:
            res = false;
            break;
    }
    return res
}
export default equalsText;