export const createBook = (overrides) => ({
  id: new Date().getTime() * Math.random(),
  title: "Harry Potter",
  author: "J.K. Rowling",
  pinned: false,
  ...overrides,
});
