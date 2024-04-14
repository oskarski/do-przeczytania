import { useId, useState } from "react";
import { validateBookData } from "./validateBookData";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { FieldErrorMessage } from "../ui/FieldErrorMessage";
import { Button } from "../ui/Button";
import { updateBook } from "../api/books";
import { useMutation, useQueryClient } from "react-query";

export const UpdateBookForm = ({ book, onEditBook }) => {
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState({});

  const titleId = useId();
  const authorId = useId();

  const updateBookMutation = useMutation(
    (updateBookData) => updateBook(book.id, updateBookData),
    {
      onSuccess: (updatedBook) => {
        queryClient.setQueryData(
          "books",
          (prev) =>
            prev &&
            [...prev].map((book) => {
              if (book.id === updatedBook.id) return updatedBook;

              return book;
            }),
        );
        onEditBook();
        setErrors({});
      },
    },
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title");
        const author = formData.get("author");

        const updateBookData = { title, author };
        const validationErrors = validateBookData(updateBookData);
        const hasErrors = Object.keys(validationErrors).length > 0;

        if (hasErrors) {
          setErrors(validationErrors);
          return;
        }

        updateBookMutation.mutate(updateBookData);
      }}
    >
      <Label htmlFor={titleId}>Tytuł książki</Label>
      <Input id={titleId} name="title" defaultValue={book.title} />
      <FieldErrorMessage error={errors.title} />

      <Label htmlFor={authorId}>Autor książki</Label>
      <Input id={authorId} name="author" defaultValue={book.author} />
      <FieldErrorMessage error={errors.author} />

      <div className="mt-3">
        <Button>Zapisz</Button>
      </div>
    </form>
  );
};
