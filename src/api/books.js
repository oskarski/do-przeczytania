import { baseUrl } from "./baseUrl";

export const listBooks = () =>
  fetch(`${baseUrl}/books`).then((response) => response.json());

export const createBook = (book) =>
  fetch(`${baseUrl}/books`, {
    method: "POST",
    body: JSON.stringify(book),
  }).then((response) => response.json());
