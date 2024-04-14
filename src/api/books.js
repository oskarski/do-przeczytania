import { baseUrl } from "./baseUrl";

export const listBooks = () =>
  fetch(`${baseUrl}/books`).then((response) => response.json());
