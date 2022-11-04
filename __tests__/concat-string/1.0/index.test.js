import concatString from "../../../functions/concat-string/1.0";

describe("Concat string with hyphen", () => {
  test("Concat string with hyphen", async () => {
    const { result } = await concatString({
      left: "John",
      separator: "-",
      right: "Doe",
    });
    expect(result).toEqual("John-Doe");
  });
});

describe("Concat string with space", () => {
  test("Concat string with space", async () => {
    const { result } = await concatString({
      left: "John",
      separator: " ",
      right: "Doe",
    });
    expect(result).toEqual("John Doe");
  });
});

describe("Concat string with comma and space", () => {
  test("Concat string with comma and space", async () => {
    const { result } = await concatString({
      left: "John",
      separator: ", ",
      right: "Doe",
    });
    expect(result).toEqual("John, Doe");
  });
});
