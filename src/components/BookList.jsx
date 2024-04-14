import { BookCard } from "./BookCard";

export const BookList = ({ books, onDeleteBook }) => {
  // Early return
  if (books.length === 0)
    return (
      <h2 className="text-5xl text-center">
        Brak książek do wyświetlenia. <br /> Dodaj swoją pierwszą ksiażkę :)
      </h2>
    );

  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDeleteBook={() => onDeleteBook(book)}
        />
      ))}
    </ul>
  );
};
