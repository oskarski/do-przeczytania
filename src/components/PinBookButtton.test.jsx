import { screen } from "@testing-library/react";
import { createBook } from "../../test-helpers/builders/createBook";
import { renderComponent } from "../../test-helpers/render";
import { PinBookButton } from "./PinBookButton";
import userEvent from "@testing-library/user-event";

describe("<PinBookButton />", () => {
  it("allows to pin book", () => {
    // Given
    const book = createBook({ pinned: false });
    const onPinBookMock = jest.fn();
    const onUnpinBookMock = jest.fn();

    renderComponent(
      <PinBookButton
        book={book}
        onPinBook={onPinBookMock}
        onUnpinBook={onUnpinBookMock}
      />,
    );

    // When
    userEvent.click(screen.getByText("Przypnij"));

    // Then
    expect(onPinBookMock).toHaveBeenCalledTimes(1);
    expect(onUnpinBookMock).not.toHaveBeenCalled();
  });

  it("allows to unpin book", () => {
    // Given
    const book = createBook({ pinned: true });
    const onPinBookMock = jest.fn();
    const onUnpinBookMock = jest.fn();

    renderComponent(
      <PinBookButton
        book={book}
        onPinBook={onPinBookMock}
        onUnpinBook={onUnpinBookMock}
      />,
    );

    // When
    userEvent.click(screen.getByText("Odepnij"));

    // Then
    expect(onUnpinBookMock).toHaveBeenCalledTimes(1);
    expect(onPinBookMock).not.toHaveBeenCalled();
  });
});
