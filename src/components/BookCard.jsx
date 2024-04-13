import { useId, useState } from "react";
import { DeleteBookButton } from "./DeleteBookButton";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const BookCard = ({ book, onDeleteBook }) => {
  const [editMode, setEditMode] = useState(false);

  const titleId = useId();
  const authorId = useId();

  return (
    <li className="bg-gray-200 p-6 rounded-lg flex justify-between">
      {!editMode && (
        <div>
          <h3 className="text-3xl mb-1">{book.title}</h3>
          <span className="text-md italic text-gray-700">{book.author}</span>
        </div>
      )}

      {editMode && (
        <div>
          <form>
            <Label htmlFor={titleId}>Tytył książki</Label>
            <Input id={titleId} name="title" defaultValue={book.title} />

            <Label htmlFor={authorId}>Autor książki</Label>
            <Input id={authorId} name="author" defaultValue={book.author} />

            <div className="mt-3">
              <Button>Zapisz</Button>
            </div>
          </form>
        </div>
      )}

      <div className="text-right space-x-3">
        {!editMode && <button onClick={() => setEditMode(true)}>Edytuj</button>}
        {editMode && <button onClick={() => setEditMode(false)}>Anuluj</button>}

        <DeleteBookButton onDeleteBook={onDeleteBook} />
      </div>
    </li>
  );
};
