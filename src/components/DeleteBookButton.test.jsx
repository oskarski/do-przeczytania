import userEvent from "@testing-library/user-event";
import { renderComponent } from "../../test-helpers/render";
import { DeleteBookButton } from "./DeleteBookButton";
import { act, screen } from "@testing-library/react";

describe("<DeleteBookButton />", () => {
  it("allows to delete book after confirmation", () => {
    // Given
    const onDeleteBookMock = jest.fn();

    renderComponent(<DeleteBookButton onDeleteBook={onDeleteBookMock} />);

    // When
    act(() => userEvent.click(screen.getByText("Usuń")));

    // Then
    expect(screen.queryByText("Czy na pewno?")).toBeInTheDocument();

    // When
    act(() => userEvent.click(screen.getByText("Tak")));

    // Then
    expect(onDeleteBookMock).toHaveBeenCalledTimes(1);
  });

  it("does not delete book when cancelled", () => {
    // Given
    const onDeleteBookMock = jest.fn();

    renderComponent(<DeleteBookButton onDeleteBook={onDeleteBookMock} />);

    act(() => userEvent.click(screen.getByText("Usuń")));

    // When
    act(() => userEvent.click(screen.getByText("Nie")));

    // Then
    expect(screen.queryByText("Usuń")).toBeInTheDocument();
    expect(screen.queryByText("Czy na pewno?")).not.toBeInTheDocument();
    expect(onDeleteBookMock).not.toHaveBeenCalled();
  });
});
