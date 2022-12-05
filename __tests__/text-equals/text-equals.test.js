import textEquals from "../../functions/equals-text/1.0";

// Use following values to test
const leftValue = "HELLO";
const rightValue = "Hello";
const toLower = true;

// Standard comparators => Array to loop through
const comparators = [
  "eq",
  "neq",
  "cont",
  "ncont",
  "startsWith",
  "endsWith",
  "regMatch",
];

function returnExpectedResult(comparator) {
  // Calculates the expected result for the given comparator
  // This way the test can be automated
  let expectedResult = false;
  let left = leftValue;
  let right = rightValue;

  if (toLower) {
    left = leftValue.toLowerCase();
    right = rightValue.toLowerCase();
  }

  switch (comparator) {
    case "eq":
      expectedResult = left === right;
      break;
    case "neq":
      expectedResult = left !== right;
      break;
    case "cont":
      expectedResult = left.includes(right);
      break;
    case "ncont":
      expectedResult = !left.includes(right);
      break;
    case "startsWith":
      expectedResult = left.startsWith(right);
      break;
    case "endsWith":
      expectedResult = left.endsWith(right);
      break;
    case "regMatch":
      const regex = new RegExp(right);
      expectedResult = regex.test(left);
  }

  return expectedResult;
}

describe("Text equals 1.0:", () => {
  for (var i = 0; i < comparators.length; i++) {
    // Loop through all the comparators in comparators[]
    const expectedResult = returnExpectedResult(comparators[i]);
    const comparator = comparators[i];
    // Process left and right value for correct test logging messages
    const leftValueProcessed = toLower ? leftValue.toLowerCase() : leftValue;
    const rightValueProcessed = toLower ? rightValue.toLowerCase() : rightValue;

    test(`If "${leftValueProcessed}" ${comparators[i]} "${rightValueProcessed}" then return ${expectedResult}`, () => {
      expect(
        textEquals({
          leftValue: leftValue,
          rightValue: rightValue,
          comparator: comparator,
          toLower: toLower,
        })
      ).toStrictEqual({
        result: expectedResult,
      });
    });
  }
});
