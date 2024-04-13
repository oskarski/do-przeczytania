import { useState } from "react";
import { CreateBookForm } from "./components/CreateBookForm";

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

      {books.length === 0 && (
        <h2 className="text-5xl text-center">
          Brak książek do wyświetlenia. <br /> Dodaj swoją pierwszą ksiażkę :)
        </h2>
      )}

      {books.length > 0 && (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.title} className="bg-gray-200 p-6 rounded-lg">
              <h3 className="text-3xl mb-1">{book.title}</h3>
              <span className="text-md italic text-gray-700">
                {book.author}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
