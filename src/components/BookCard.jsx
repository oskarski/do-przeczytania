import { useState } from "react";
import { DeleteBookButton } from "./DeleteBookButton";
import { UpdateBookForm } from "./UpdateBookForm";
import { PinBookButton } from "./PinBookButton";

export const BookCard = ({ book, onDeleteBook, onEditBook }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <li className="bg-gray-200 p-6 rounded-lg flex justify-between">
      {!editMode && (
        <div>
          <h3 className="text-3xl mb-1">{book.title}</h3>
          <span className="text-md italic text-gray-700">{book.author}</span>
        </div>
      )}

      {editMode && (
        <UpdateBookForm
          book={book}
          onEditBook={(updatedBook) => {
            onEditBook(updatedBook);
            setEditMode(false);
          }}
        />
      )}

      <div className="text-right space-x-3">
        <PinBookButton
          book={book}
          onPinBook={() => onEditBook({ ...book, pinned: true })}
          onUnpinBook={() => onEditBook({ ...book, pinned: false })}
        />

        {!editMode && <button onClick={() => setEditMode(true)}>Edytuj</button>}
        {editMode && <button onClick={() => setEditMode(false)}>Anuluj</button>}

        <DeleteBookButton book={book} onDeleteBook={onDeleteBook} />
      </div>
    </li>
  );
};
