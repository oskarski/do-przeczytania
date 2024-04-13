export const BookList = ({ books }) => {
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
        <li key={book.title} className="bg-gray-200 p-6 rounded-lg">
          <h3 className="text-3xl mb-1">{book.title}</h3>
          <span className="text-md italic text-gray-700">{book.author}</span>
        </li>
      ))}
    </ul>
  );
};
