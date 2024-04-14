import { createBook } from "../../test-helpers/builders/createBook";
import { validateBookData } from "./validateBookData";

describe("validateBookData()", () => {
  it("raises error for non object input", () => {
    expect(() => validateBookData(123)).toThrow(
      "Expected object, received number",
    );
    expect(() => validateBookData("abc")).toThrow(
      "Expected object, received string",
    );
    expect(() => validateBookData(() => {})).toThrow(
      "Expected object, received function",
    );
    expect(() => validateBookData(true)).toThrow(
      "Expected object, received boolean",
    );
  });

  it("returns errors when required fields are missing", () => {
    // Given
    const book = {};

    // When
    const errors = validateBookData(book);

    // Then
    expect(errors).toEqual({
      title: new Error("Tytuł jest wymagany!"),
      author: new Error("Autor jest wymagany!"),
    });
  });

  it("returns empty object when there are no errors", () => {
    // Given
    const book = createBook({
      title: "Harry Potter",
      author: "J.K. Rowling",
    });

    // When
    const errors = validateBookData(book);

    // Then
    expect(errors).toEqual({});
  });
});
