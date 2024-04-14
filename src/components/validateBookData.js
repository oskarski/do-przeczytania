export const validateBookData = (data) => {
  if (typeof data !== "object")
    throw new Error("Expected object, received " + typeof data);

  const errors = {};

  if (!data.title) errors["title"] = new Error("Tytuł jest wymagany!");
  if (!data.author) errors["author"] = new Error("Autor jest wymagany!");

  return errors;
};
