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

      <BookList books={books} />
    </div>
  );
}

export default App;
