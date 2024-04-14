import { useState } from "react";
import { deleteBook } from "../api/books";
import { useMutation } from "react-query";

export const DeleteBookButton = ({ book, onDeleteBook }) => {
  const [confrimVisible, setConfirmVisible] = useState(false);

  const deleteBookMutation = useMutation(() => deleteBook(book.id), {
    onSuccess: onDeleteBook,
  });

  if (confrimVisible)
    return (
      <>
        Czy na pewno?
        <div className="flex gap-x-2">
          <button
            disabled={deleteBookMutation.isLoading}
            onClick={() => deleteBookMutation.mutate()}
            className="disabled:text-lime-500"
          >
            Tak
          </button>
          <button
            disabled={deleteBookMutation.isLoading}
            onClick={() => setConfirmVisible(false)}
            className="disabled:text-lime-500"
          >
            Nie
          </button>
        </div>
        {deleteBookMutation.isError && (
          <span className="text-red-700 block">Wystąpił błąd!</span>
        )}
      </>
    );

  return (
    <button className="text-red-700" onClick={() => setConfirmVisible(true)}>
      Usuń
    </button>
  );
};
