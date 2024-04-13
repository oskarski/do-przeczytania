import { useState } from "react";

export const DeleteBookButton = ({ onDeleteBook }) => {
  const [confrimVisible, setConfirmVisible] = useState(false);
  if (confrimVisible)
    return (
      <>
        Czy na pewno?
        <div className="flex gap-x-2">
          <button onClick={() => onDeleteBook()}>Tak</button>
          <button onClick={() => setConfirmVisible(false)}>Nie</button>
        </div>
      </>
    );

  return (
    <button className="text-red-700" onClick={() => setConfirmVisible(true)}>
      Usuń
    </button>
  );
};
