import { useEffect, useState } from "react";
import { CreateBookForm } from "./components/CreateBookForm";
import { BookList } from "./components/BookList";
import { listBooks } from "./api/books";
import { useQuery, useQueryClient } from "react-query";

function App() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery("books", listBooks);

  const sortedBooks =
    booksQuery.data &&
    [...booksQuery.data].sort((a, b) => {
      if (a.pinned && b.pinned) return a.title.localeCompare(b.title);

      if (a.pinned) return -1;
      if (b.pinned) return 1;

      return a.title.localeCompare(b.title);
    });

  return (
    <div className="p-4 flex flex-col gap-y-8">
      {sortedBooks && (
        <CreateBookForm
          onBookCreated={(newBook) =>
            queryClient.setQueryData(
              "books",
              (prev) => prev && [...prev, newBook],
            )
          }
        />
      )}

      {booksQuery.error && (
        <h2 className="text-5xl text-red-700 text-center">
          Wystąpił błąd, prosimy spróbować później
        </h2>
      )}

      {sortedBooks && (
        <BookList
          books={sortedBooks}
          onDeleteBook={() => queryClient.invalidateQueries("books")}
          onEditBook={(bookToUpdate) =>
            queryClient.setQueryData(
              "books",
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
