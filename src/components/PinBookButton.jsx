export const PinBookButton = ({ book, onPinBook, onUnpinBook }) => {
  if (book.pinned) return <button onClick={onUnpinBook}>Odepnij</button>;

  return <button onClick={onPinBook}>Przypnij</button>;
};
