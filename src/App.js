import { CreateBookForm } from "./components/CreateBookForm";
import { BookList } from "./components/BookList";
import { listBooks } from "./api/books";
import { useQuery, useQueryClient } from "react-query";

function App() {
  const queryClient = useQueryClient();

  const booksQuery = useQuery("books", listBooks, {
    select: (books) => {
      return [...books].sort((a, b) => {
        if (a.pinned && b.pinned) return a.title.localeCompare(b.title);

        if (a.pinned) return -1;
        if (b.pinned) return 1;

        return a.title.localeCompare(b.title);
      });
    },
  });

  return (
    <div className="p-4 flex flex-col gap-y-8">
      {booksQuery.isSuccess && (
        <CreateBookForm
          onBookCreated={(newBook) =>
            queryClient.setQueryData(
              "books",
              (prev) => prev && [...prev, newBook],
            )
          }
        />
      )}

      {booksQuery.isLoading && (
        <h3 className="text-3xl text-center mt-10">Loading ...</h3>
      )}

      {booksQuery.isFetching && (
        <h3 className="text-3xl text-center mt-10">Fetching ...</h3>
      )}

      {booksQuery.error && (
        <h2 className="text-5xl text-red-700 text-center">
          Wystąpił błąd, prosimy spróbować później
        </h2>
      )}

      {booksQuery.data && (
        <BookList
          books={booksQuery.data}
          onDeleteBook={() => queryClient.invalidateQueries("books")}
        />
      )}
    </div>
  );
}

export default App;
