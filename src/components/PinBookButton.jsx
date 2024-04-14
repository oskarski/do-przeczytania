import { updateBook } from "../api/books";

export const PinBookButton = ({ book, onPinBook, onUnpinBook }) => {
  if (book.pinned)
    return (
      <button
        onClick={() => {
          updateBook(book.id, { pinned: false }).then(() => onUnpinBook());
        }}
      >
        Odepnij
      </button>
    );

  return (
    <button
      onClick={() => {
        updateBook(book.id, { pinned: true }).then(() => onPinBook());
      }}
    >
      Przypnij
    </button>
  );
};
