import { truncateText } from "../textHelper";

describe("truncateText", () => {
  it("should return the original text if it is shorter than maxChar", () => {
    const input = "Hello";
    const maxChar = 10;
    expect(truncateText(input, maxChar)).toBe("Hello");
  });

  it("should truncate the text and add '..' if it is longer than maxChar", () => {
    const input = "Hello, World!";
    const maxChar = 5;
    expect(truncateText(input, maxChar)).toBe("Hello..");
  });

  it("should return an empty string if input is empty", () => {
    const input = "";
    const maxChar = 5;
    expect(truncateText(input, maxChar)).toBe("");
  });

  it("should handle maxChar of zero", () => {
    const input = "Hello";
    const maxChar = 0;
    expect(truncateText(input, maxChar)).toBe("..");
  });

  it("should handle maxChar greater than input length", () => {
    const input = "Hello";
    const maxChar = 10;
    expect(truncateText(input, maxChar)).toBe("Hello");
  });
});
