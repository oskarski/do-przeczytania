import { useState } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { FieldErrorMessage } from "../ui/FieldErrorMessage";
import { Button } from "../ui/Button";
import { validateBookData } from "./validateBookData";

export const CreateBookForm = ({ onBookCreated }) => {
  const [errors, setErrors] = useState({});

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title");
        const author = formData.get("author");

        const createBookData = { id: new Date().getTime(), title, author };
        const validationErrors = validateBookData(createBookData);
        const hasErrors = Object.keys(validationErrors).length > 0;

        if (hasErrors) {
          setErrors(validationErrors);
          return;
        }

        onBookCreated(createBookData);

        setErrors({});
        e.target.reset();
      }}
      className="bg-gray-200 border-gray-500 border p-5 rounded flex gap-x-4 items-end"
    >
      <div className="flex-1 flex gap-x-4">
        <div className="flex-1">
          <Label htmlFor="title" className="block mb-2">
            Tytuł książki
          </Label>
          {/* Label({ htmlFor: 'title', className: 'block mb-2', children: 'Tytuł ...' }) */}
          <Input id="title" name="title" type="text" />
          <FieldErrorMessage error={errors.title} />
        </div>

        <div className="flex-1">
          <Label htmlFor="author" className="block mb-2">
            Autor książki
          </Label>
          <Input id="author" name="author" type="text" />
          <FieldErrorMessage error={errors.author} />
        </div>
      </div>

      <Button>Dodaj książkę</Button>
    </form>
  );
};
