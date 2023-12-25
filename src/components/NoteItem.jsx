import React from "react";
import { Link } from "react-router-dom";

const NoteItem = ({ note }) => {
  return (
    <Link to={`/edit-note/${note.id}`} className="note">
      <h4>
        {/* substr yerine slice da kullanılabilir */}
        {note.title.length > 50 ? note.title.substr(0, 50) + "..." : note.title}
      </h4>
      <p>{note.date}</p>
    </Link>
  );
};

export default NoteItem;