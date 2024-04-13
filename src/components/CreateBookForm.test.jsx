import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateBookForm } from "./CreateBookForm";
import { act } from "react-dom/test-utils";

describe("<CreateBookForm />", () => {
  it("allows to add new book", () => {
    // Given
    const onBookCreatedMock = jest.fn();

    render(<CreateBookForm onBookCreated={onBookCreatedMock} />);

    // When
    userEvent.type(screen.getByLabelText("Tytuł książki"), "Harry Potter");
    userEvent.type(screen.getByLabelText("Autor książki"), "J.K. Rowling");

    act(() => userEvent.click(screen.getByText("Dodaj książkę")));

    // Then
    expect(onBookCreatedMock).toHaveBeenCalledWith({
      id: expect.anything(),
      title: "Harry Potter",
      author: "J.K. Rowling",
      pinned: false,
    });
    expect(onBookCreatedMock).toHaveBeenCalledTimes(1);
  });

  it.todo("prevents adding new book when invalid data");
});
