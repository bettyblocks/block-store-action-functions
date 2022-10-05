const compareNumber = async ({ leftValue, rightValue, comparator }) => {
    let res = {};

    switch (comparator) {
        case 'eq':
            res = leftValue === rightValue 
        break;
        case 'neq':
            res = leftValue !== rightValue
        break;
        case 'lower':
            res = leftValue < rightValue
        break;
        case 'lowerEq':
            res = leftValue <= rightValue
        break;
        case 'higher':
            res = leftValue > rightValue
        break;
        case 'higherEq':
            res = leftValue >= rightValue
        break;
    }
    
    return res
}

export default compareNumber;