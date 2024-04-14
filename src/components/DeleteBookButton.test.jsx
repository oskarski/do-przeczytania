import userEvent from "@testing-library/user-event";
import { renderComponent } from "../../test-helpers/render";
import { DeleteBookButton } from "./DeleteBookButton";
import { act, screen, waitFor } from "@testing-library/react";
import { server } from "../../test-helpers/msw";
import { rest } from "msw";
import { baseUrl } from "../api/baseUrl";
import { createBook } from "../../test-helpers/builders/createBook";

describe("<DeleteBookButton />", () => {
  const deleteBookMock = jest.fn();

  beforeEach(() => {
    server.use(
      rest.delete(`${baseUrl}/books/:id`, async (req, res, ctx) => {
        deleteBookMock();
        return res(ctx.status(201));
      }),
    );
  });

  it("allows to delete book after confirmation", async () => {
    // Given
    const onDeleteBookMock = jest.fn();

    renderComponent(
      <DeleteBookButton book={createBook()} onDeleteBook={onDeleteBookMock} />,
    );

    // When
    act(() => userEvent.click(screen.getByText("Usuń")));

    // Then
    expect(screen.queryByText("Czy na pewno?")).toBeInTheDocument();

    // When
    act(() => userEvent.click(screen.getByText("Tak")));

    // Then
    await waitFor(() => expect(deleteBookMock).toHaveBeenCalled());
    expect(onDeleteBookMock).toHaveBeenCalledTimes(1);
  });

  it("does not delete book when cancelled", () => {
    // Given
    const onDeleteBookMock = jest.fn();

    renderComponent(
      <DeleteBookButton book={createBook()} onDeleteBook={onDeleteBookMock} />,
    );

    act(() => userEvent.click(screen.getByText("Usuń")));

    // When
    act(() => userEvent.click(screen.getByText("Nie")));

    // Then
    expect(screen.queryByText("Usuń")).toBeInTheDocument();
    expect(screen.queryByText("Czy na pewno?")).not.toBeInTheDocument();
    expect(onDeleteBookMock).not.toHaveBeenCalled();
  });
});
