const compareNumber = ({ leftValue, rightValue, comparator }) => {
    let result = false;

    switch (comparator) {
        case 'eq':
            result = leftValue === rightValue;
            break;
        case 'neq':
            result = leftValue !== rightValue;
            break;
        case 'lower':
            result = leftValue < rightValue;
            break;
        case 'lowerEq':
            result = leftValue <= rightValue;
            break;
        case 'higher':
            result = leftValue > rightValue;
            break;
        case 'higherEq':
            result = leftValue >= rightValue;
            break;
        default:
            result = leftValue === rightValue;
            break;
    }

    return {
        result,
    };

}

export default compareNumber;