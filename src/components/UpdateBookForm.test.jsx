import { act, screen } from "@testing-library/react";
import { createBook } from "../../test-helpers/builders/createBook";
import { renderComponent } from "../../test-helpers/render";
import { UpdateBookForm } from "./UpdateBookForm";
import userEvent from "@testing-library/user-event";

describe("<UpdateBookForm />", () => {
  it("prefills the form with book data", () => {
    // Given
    const book = createBook({
      title: "Pan Tadeusz",
      author: "A. Mickiewicz",
    });

    // When
    renderComponent(<UpdateBookForm book={book} onEditBook={jest.fn()} />);

    // Then
    expect(screen.getByLabelText("Tytuł książki")).toHaveValue("Pan Tadeusz");
    expect(screen.getByLabelText("Autor książki")).toHaveValue("A. Mickiewicz");
  });

  it("allows to update the book", () => {
    // Given
    const book = createBook({
      id: 1,
      title: "Pan Tadeusz",
      author: "A. Mickiewicz",
      pinned: true,
    });

    const onEditBookMock = jest.fn();

    renderComponent(<UpdateBookForm book={book} onEditBook={onEditBookMock} />);

    // When
    const titleInput = screen.getByLabelText("Tytuł książki");
    const authorInput = screen.getByLabelText("Autor książki");

    userEvent.clear(titleInput);
    userEvent.type(titleInput, "Kordian");

    userEvent.clear(authorInput);
    userEvent.type(authorInput, "J. Słowacki");

    act(() => userEvent.click(screen.getByText("Zapisz")));

    // Then
    expect(onEditBookMock).toHaveBeenCalledWith({
      id: 1,
      title: "Kordian",
      author: "J. Słowacki",
      pinned: true,
    });
    expect(onEditBookMock).toHaveBeenCalledTimes(1);
  });
});
