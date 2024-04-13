import { useState } from "react";
import { CreateBookForm } from "./components/CreateBookForm";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const sortedBooks = [...books].sort((a, b) => {
    if (a.pinned && b.pinned) return a.title.localeCompare(b.title);

    if (a.pinned) return -1;
    if (b.pinned) return 1;

    return a.title.localeCompare(b.title);
  });

  return (
    <div className="p-4 flex flex-col gap-y-8">
      <CreateBookForm
        onBookCreated={(newBook) => {
          // setBooks(prev => {
          //   return [...prev, newBook]
          // });
          setBooks((prev) => [...prev, newBook]);
        }}
      />

      <BookList
        books={sortedBooks}
        onDeleteBook={(bookToDelete) =>
          setBooks((prev) =>
            [...prev].filter((book) => book.id !== bookToDelete.id),
          )
        }
        onEditBook={(bookToUpdate) =>
          setBooks((prev) =>
            [...prev].map((book) => {
              if (book.id === bookToUpdate.id) return bookToUpdate;

              return book;
            }),
          )
        }
      />
    </div>
  );
}

export default App;
