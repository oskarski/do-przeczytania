import userEvent from "@testing-library/user-event";
import { renderComponent } from "../test-helpers/render";
import App from "./App";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { createBook } from "../test-helpers/builders/createBook";
import { server } from "../test-helpers/msw";
import { rest } from "msw";
import { baseUrl } from "./api/baseUrl";

const addNewBook = async (book) => {
  userEvent.type(await screen.findByLabelText("Tytuł książki"), book.title);
  userEvent.type(await screen.findByLabelText("Autor książki"), book.author);

  act(() => userEvent.click(screen.getByText("Dodaj książkę")));

  await waitFor(() =>
    expect(screen.queryByText(book.title)).toBeInTheDocument(),
  );
};

describe("<App />", () => {
  const createBookMock = jest.fn();
  const deleteBookMock = jest.fn();
  const updateBookMock = jest.fn();

  beforeEach(() => {
    createBookMock.mockReturnValue({
      id: "123",
      title: "Harry Potter",
      author: "J.K. Rowling",
      pinned: false,
    });
    updateBookMock.mockReturnValue({
      id: "123",
      title: "Harry Potter",
      author: "J.K. Rowling",
      pinned: false,
    });

    server.use(
      rest.get(`${baseUrl}/books`, (req, res, ctx) => {
        // Return empty books from API
        return res(ctx.json([]));
      }),
      rest.post(`${baseUrl}/books`, async (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(createBookMock(await req.json())));
      }),
      rest.delete(`${baseUrl}/books/:id`, async (req, res, ctx) => {
        deleteBookMock();
        return res(ctx.status(201));
      }),
      rest.patch(`${baseUrl}/books/:id`, async (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(updateBookMock(await req.json())));
      }),
    );
  });

  it("allows to add new book and renders it", async () => {
    // Given
    renderComponent(<App />);

    // When
    await addNewBook({
      title: "Harry Potter",
      author: "J.K. Rowling",
    });

    // Then
    expect(screen.queryByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("J.K. Rowling")).toBeInTheDocument();

    expect(screen.getByLabelText("Tytuł książki")).toHaveValue("");
    expect(screen.getByLabelText("Autor książki")).toHaveValue("");
  });

  it("allows to remove book", async () => {
    // Given
    renderComponent(<App />);

    await addNewBook(createBook());

    // When
    act(() => userEvent.click(screen.getByText("Usuń")));
    act(() => userEvent.click(screen.getByText("Tak")));

    // Then
    await waitFor(() => expect(deleteBookMock).toHaveBeenCalled());
    expect(
      screen.queryByText(/^Brak książek do wyświetlenia/),
    ).toBeInTheDocument();
  });

  it("allows to edit book", async () => {
    // Given
    createBookMock.mockReturnValue({
      id: "123",
      title: "Harry Pott",
      author: "J.K. Rowli",
      pinned: false,
    });

    renderComponent(<App />);

    await addNewBook({
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
    await waitFor(() => expect(updateBookMock).toHaveBeenCalled());
    expect(screen.queryByText("Harry Potter")).toBeInTheDocument();
    expect(screen.queryByText("J.K. Rowling")).toBeInTheDocument();
  });

  it("allows to pin & unpin book", async () => {
    // Given
    renderComponent(<App />);

    await addNewBook(createBook());

    // When & Then
    act(() => userEvent.click(screen.getByText("Przypnij")));

    await waitFor(() => expect(updateBookMock).toHaveBeenCalledTimes(1));
    expect(screen.queryByText("Przypnij")).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByText("Odepnij")));
    await waitFor(() => expect(updateBookMock).toHaveBeenCalledTimes(2));

    expect(screen.queryByText("Odepnij")).not.toBeInTheDocument();

    expect(screen.queryByText("Przypnij")).toBeInTheDocument();
  });
});
