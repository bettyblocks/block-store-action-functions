import isPresent from "../../../functions/is-present/1.0";

describe("Check if record is present", () => {
  test("Check if record is present", async () => {
    const { result } = await isPresent({ record: { data: { id: 1 } } });
    expect(result).toEqual(true);
  });

  test("Check if record is not present", async () => {
    const { result } = await isPresent({ record: { data: null } });
    expect(result).toEqual(false);
  });
});
