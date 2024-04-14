import { useMutation, useQueryClient } from "react-query";
import { updateBook } from "../api/books";

export const PinBookButton = ({ book }) => {
  const queryClient = useQueryClient();

  const onBookUpdated = (updatedBook) => {
    queryClient.setQueryData(
      "books",
      (prev) =>
        prev &&
        [...prev].map((book) => {
          if (book.id === updatedBook.id) return updatedBook;

          return book;
        }),
    );
  };

  const pinBookMutation = useMutation(
    () => updateBook(book.id, { pinned: true }),
    {
      onSuccess: onBookUpdated,
    },
  );

  const unpinBookMutation = useMutation(
    () => updateBook(book.id, { pinned: false }),
    {
      onSuccess: onBookUpdated,
    },
  );

  if (book.pinned)
    return (
      <button
        disabled={unpinBookMutation.isLoading}
        onClick={() => unpinBookMutation.mutate()}
      >
        Odepnij
      </button>
    );

  return (
    <button
      disabled={pinBookMutation.isLoading}
      onClick={() => pinBookMutation.mutate()}
    >
      Przypnij
    </button>
  );
};
