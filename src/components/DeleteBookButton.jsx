import { useState } from "react";
import { deleteBook } from "../api/books";

export const DeleteBookButton = ({ book, onDeleteBook }) => {
  const [confrimVisible, setConfirmVisible] = useState(false);

  const [error, setError] = useState();

  if (confrimVisible)
    return (
      <>
        Czy na pewno?
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              deleteBook(book.id)
                .then(() => onDeleteBook())
                .catch(() => setError(new Error("Wystąpił błąd!")));
            }}
          >
            Tak
          </button>
          <button onClick={() => setConfirmVisible(false)}>Nie</button>
        </div>

        {error && <span className="text-red-700 block">{error.message}</span>}
      </>
    );

  return (
    <button className="text-red-700" onClick={() => setConfirmVisible(true)}>
      Usuń
    </button>
  );
};
