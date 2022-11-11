import calculate from "../../../functions/calculate/1.0";

describe("Calculate add two numbers", () => {
  test("Calculate add two numbers", async () => {
    const { result } = await calculate({
      left: 200,
      operator: "+",
      right: 100,
    });
    expect(result).toEqual(300);
  });
});

describe("Calculate minus two numbers", () => {
    test("Calculate minus two numbers", async () => {
      const { result } = await calculate({
        left: 200,
        operator: "-",
        right: 100,
      });
      expect(result).toEqual(100);
    });
  });

  describe("Calculate divide two numbers", () => {
    test("Calculate divide two numbers", async () => {
      const { result } = await calculate({
        left: 200,
        operator: "/",
        right: 100,
      });
      expect(result).toEqual(2);
    });
  });

  describe("Calculate multiply two numbers", () => {
    test("Calculate multiply two numbers", async () => {
      const { result } = await calculate({
        left: 200,
        operator: "*",
        right: 100,
      });
      expect(result).toEqual(20000);
    });
  });