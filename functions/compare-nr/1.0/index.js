const compareNumber = async ({ leftValue, rightValue, comparator }) => {
    switch (comparator) {
        case 'eq':
            return { result: leftValue === rightValue }
        case 'neq':
            return { result: leftValue !== rightValue }
        case 'lower':
            return { result: leftValue < rightValue }
        case 'lowerEq':
            return { result: leftValue <= rightValue }
        case 'higher':
            return { result: leftValue > rightValue }
        case 'higherEq':
            return { result: leftValue >= rightValue}
        default:
            return { result: false }
    }
}

export default compareNumber;