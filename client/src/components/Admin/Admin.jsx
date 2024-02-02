import { useState, useMemo } from "react";
import AddBook from "./AddBook";
import BookEdit from "./EditBook";
import Delete from "./DeleteBook";

const AdminAdd = () => {
  const [view, setView] = useState("add");

  const addMemoized = useMemo(() => <AddBook />, []);
  const editMemoized = useMemo(() => <BookEdit />, []);
  const deleteMemoized = useMemo(() => <Delete />, []);

  return (
    <div className="login-form">
      <nav>
        <h3
          onClick={() => setView("add")}
          style={{ color: view === "add" ? "#fff" : "" }}
        >
          Add
        </h3>
        <h3
          onClick={() => setView("edit")}
          style={{ color: view === "edit" ? "#fff" : "" }}
        >
          Edit
        </h3>
        <h3
          onClick={() => setView("delete")}
          style={{ color: view === "delete" ? "#fff" : "" }}
        >
          Delete
        </h3>
      </nav>
      {view === "add" ? addMemoized : view === "edit" ? editMemoized : deleteMemoized}
    </div>
  );
}

export default AdminAdd;
