import { useState } from "react";
import { CreateBookForm } from "./components/CreateBookForm";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

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
        books={books}
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
