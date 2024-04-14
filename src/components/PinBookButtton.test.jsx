import { screen, waitFor } from "@testing-library/react";
import { createBook } from "../../test-helpers/builders/createBook";
import { renderComponent } from "../../test-helpers/render";
import { PinBookButton } from "./PinBookButton";
import userEvent from "@testing-library/user-event";
import { server } from "../../test-helpers/msw";
import { rest } from "msw";
import { baseUrl } from "../api/baseUrl";

describe("<PinBookButton />", () => {
  const updateBookMock = jest.fn();

  beforeEach(() => {
    updateBookMock.mockReturnValue(createBook());

    server.use(
      rest.patch(`${baseUrl}/books/:id`, async (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(updateBookMock(await req.json())));
      }),
    );
  });

  it("allows to pin book", async () => {
    // Given
    const book = createBook({ pinned: false });

    renderComponent(<PinBookButton book={book} />);

    // When
    userEvent.click(screen.getByText("Przypnij"));

    // Then
    await waitFor(() =>
      expect(updateBookMock).toHaveBeenCalledWith({ pinned: true }),
    );
  });

  it("allows to unpin book", async () => {
    // Given
    const book = createBook({ pinned: true });

    renderComponent(<PinBookButton book={book} />);

    // When
    userEvent.click(screen.getByText("Odepnij"));

    // Then
    await waitFor(() =>
      expect(updateBookMock).toHaveBeenCalledWith({ pinned: false }),
    );
  });
});
