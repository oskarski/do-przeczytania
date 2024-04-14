import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateBookForm } from "./CreateBookForm";
import { act } from "react-dom/test-utils";
import { renderComponent } from "../../test-helpers/render";
import { server } from "../../test-helpers/msw";
import { rest } from "msw";
import { baseUrl } from "../api/baseUrl";

describe("<CreateBookForm />", () => {
  const createBookMock = jest.fn();

  beforeEach(() => {
    createBookMock.mockReturnValue({
      id: "123",
      title: "Harry Potter",
      author: "J.K. Rowling",
      pinned: false,
    });

    server.use(
      rest.post(`${baseUrl}/books`, async (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(createBookMock(await req.json())));
      }),
    );
  });

  it("allows to add new book", async () => {
    // Given
    const onBookCreatedMock = jest.fn();

    renderComponent(<CreateBookForm onBookCreated={onBookCreatedMock} />);

    // When
    userEvent.type(screen.getByLabelText("Tytuł książki"), "Harry Potter");
    userEvent.type(screen.getByLabelText("Autor książki"), "J.K. Rowling");

    act(() => userEvent.click(screen.getByText("Dodaj książkę")));

    // Then
    await waitFor(() =>
      expect(createBookMock).toHaveBeenCalledWith({
        title: "Harry Potter",
        author: "J.K. Rowling",
        pinned: false,
      }),
    );
    expect(createBookMock).toHaveBeenCalledTimes(1);
    expect(onBookCreatedMock).toHaveBeenCalledWith({
      id: "123",
      title: "Harry Potter",
      author: "J.K. Rowling",
      pinned: false,
    });
    expect(onBookCreatedMock).toHaveBeenCalledTimes(1);
  });

  it("prevents adding new book when invalid data", async () => {
    // Given
    const onBookCreatedMock = jest.fn();

    renderComponent(<CreateBookForm onBookCreated={onBookCreatedMock} />);

    // When & Then
    act(() => userEvent.click(screen.getByText("Dodaj książkę")));

    expect(screen.queryByText("Tytuł jest wymagany!")).toBeInTheDocument();
    expect(screen.queryByText("Autor jest wymagany!")).toBeInTheDocument();
    expect(onBookCreatedMock).not.toHaveBeenCalled();

    userEvent.type(screen.getByLabelText("Tytuł książki"), "Harry Potter");
    userEvent.type(screen.getByLabelText("Autor książki"), "J.K. Rowling");

    act(() => userEvent.click(screen.getByText("Dodaj książkę")));

    await waitFor(() => expect(createBookMock).toHaveBeenCalled());
    expect(onBookCreatedMock).toHaveBeenCalled();
  });
});
