import { Base64 } from "js-base64";

const base64 = async ({ input, action }) => {
  if (action === "ENCODE") {
    return { result: Base64.encode(input) };
  } else {
    if (Base64.isValid(input)) {
      return { result: Base64.decode(input) };
    } else {
      throw {
        error: "Invalid Base64 string detected.",
      };
    }
  }
};

export default base64;
