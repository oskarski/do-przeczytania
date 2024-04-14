import { useEffect, useState } from "react";
import { CreateBookForm } from "./components/CreateBookForm";
import { BookList } from "./components/BookList";
import { listBooks } from "./api/books";

function App() {
  const [books, setBooks] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    listBooks()
      .then((books) => setBooks(books))
      .catch(() =>
        setError(new Error("Wystąpił błąd, prosimy spróbować później")),
      );
  }, []);

  const sortedBooks =
    books &&
    [...books].sort((a, b) => {
      if (a.pinned && b.pinned) return a.title.localeCompare(b.title);

      if (a.pinned) return -1;
      if (b.pinned) return 1;

      return a.title.localeCompare(b.title);
    });

  return (
    <div className="p-4 flex flex-col gap-y-8">
      {sortedBooks && (
        <CreateBookForm
          onBookCreated={(newBook) => {
            // setBooks(prev => {
            //   return [...prev, newBook]
            // });
            setBooks((prev) => prev && [...prev, newBook]);
          }}
        />
      )}

      {error && (
        <h2 className="text-5xl text-red-700 text-center">{error.message}</h2>
      )}

      {sortedBooks && (
        <BookList
          books={sortedBooks}
          onDeleteBook={(bookToDelete) =>
            setBooks(
              (prev) =>
                prev && [...prev].filter((book) => book.id !== bookToDelete.id),
            )
          }
          onEditBook={(bookToUpdate) =>
            setBooks(
              (prev) =>
                prev &&
                [...prev].map((book) => {
                  if (book.id === bookToUpdate.id) return bookToUpdate;

                  return book;
                }),
            )
          }
        />
      )}
    </div>
  );
}

export default App;
