import { screen } from "@testing-library/react";
import { renderComponent } from "../../test-helpers/render";
import { BookList } from "./BookList";
import { createBook } from "../../test-helpers/builders/createBook";

describe("<BookList />", () => {
  it("renders list of books", () => {
    // Given
    const books = [
      createBook({
        title: "Harry Potter",
        author: "J.K. Rowling",
      }),
      createBook({
        title: "Pan Tadeusz",
        author: "A. Mickiewicz",
      }),
    ];

    // When
    renderComponent(<BookList books={books} />);

    // Then
    expect(screen.queryByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("J.K. Rowling")).toBeInTheDocument();

    expect(screen.queryByText("Pan Tadeusz")).toBeInTheDocument();
    expect(screen.queryByText("A. Mickiewicz")).toBeInTheDocument();
  });

  it("renders empty state when no books", () => {
    // Given
    const books = [];

    // When
    renderComponent(<BookList books={books} />);

    // Then
    expect(
      screen.queryByText(/^Brak książek do wyświetlenia\./),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Dodaj swoją pierwszą ksiażkę :\)$/),
    ).toBeInTheDocument();
  });
});
