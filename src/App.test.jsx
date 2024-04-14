import userEvent from "@testing-library/user-event";
import { renderComponent } from "../test-helpers/render";
import App from "./App";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createBook } from "../test-helpers/builders/createBook";

const addNewBook = (book) => {
  userEvent.type(screen.getByLabelText("Tytuł książki"), book.title);
  userEvent.type(screen.getByLabelText("Autor książki"), book.author);

  act(() => userEvent.click(screen.getByText("Dodaj książkę")));
};

describe("<App />", () => {
  it("allows to add new book and renders it", () => {
    // Given
    renderComponent(<App />);

    // When
    addNewBook({
      title: "Harry Potter",
      author: "J.K. Rowling",
    });

    // Then
    expect(screen.queryByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("J.K. Rowling")).toBeInTheDocument();

    expect(screen.getByLabelText("Tytuł książki")).toHaveValue("");
    expect(screen.getByLabelText("Autor książki")).toHaveValue("");
  });

  it("allows to remove book", () => {
    // Given
    renderComponent(<App />);

    addNewBook(createBook());

    // When
    act(() => userEvent.click(screen.getByText("Usuń")));
    act(() => userEvent.click(screen.getByText("Tak")));

    // Then
    expect(
      screen.queryByText(/^Brak książek do wyświetlenia/),
    ).toBeInTheDocument();
  });

  it("allows to edit book", () => {
    // Given
    renderComponent(<App />);

    addNewBook({
      title: "Harry Pott",
      author: "J.K. Rowli",
    });

    // When
    act(() => userEvent.click(screen.getByText("Edytuj")));

    const [, editTitleInput] = screen.getAllByLabelText("Tytuł książki");
    const [, editAuthorInput] = screen.getAllByLabelText("Autor książki");

    userEvent.type(editTitleInput, "er");
    userEvent.type(editAuthorInput, "ng");

    act(() => userEvent.click(screen.getByText("Zapisz")));

    // Then
    expect(screen.queryByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("J.K. Rowling")).toBeInTheDocument();
  });

  it("allows to pin & unpin book", () => {
    // Given
    renderComponent(<App />);

    addNewBook(createBook());

    // When & Then
    act(() => userEvent.click(screen.getByText("Przypnij")));

    expect(screen.queryByText("Przypnij")).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByText("Odepnij")));

    expect(screen.queryByText("Odepnij")).not.toBeInTheDocument();

    expect(screen.queryByText("Przypnij")).toBeInTheDocument();
  });
});
