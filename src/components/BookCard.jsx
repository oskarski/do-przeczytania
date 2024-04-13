import { DeleteBookButton } from "./DeleteBookButton";

export const BookCard = ({ book, onDeleteBook }) => {
  return (
    <li className="bg-gray-200 p-6 rounded-lg flex justify-between">
      <div>
        <h3 className="text-3xl mb-1">{book.title}</h3>
        <span className="text-md italic text-gray-700">{book.author}</span>
      </div>

      <div className="text-right">
        <DeleteBookButton onDeleteBook={onDeleteBook} />
      </div>
    </li>
  );
};
