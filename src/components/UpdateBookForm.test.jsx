import { act, screen, waitFor } from "@testing-library/react";
import { createBook } from "../../test-helpers/builders/createBook";
import { renderComponent } from "../../test-helpers/render";
import { UpdateBookForm } from "./UpdateBookForm";
import userEvent from "@testing-library/user-event";
import { server } from "../../test-helpers/msw";
import { rest } from "msw";
import { baseUrl } from "../api/baseUrl";

describe("<UpdateBookForm />", () => {
  const updateBookMock = jest.fn();

  beforeEach(() => {
    updateBookMock.mockReturnValue({
      id: 1,
      title: "Kordian",
      author: "J. Słowacki",
      pinned: true,
    });

    server.use(
      rest.patch(`${baseUrl}/books/:id`, async (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(updateBookMock(await req.json())));
      }),
    );
  });

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

  it("allows to update the book", async () => {
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
    await waitFor(() =>
      expect(updateBookMock).toHaveBeenCalledWith({
        title: "Kordian",
        author: "J. Słowacki",
      }),
    );
    expect(onEditBookMock).toHaveBeenCalledTimes(1);
  });
});
