import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCreateDate from "../components/useCreateDate";
const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id==id);
  // console.log(note);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  // title ve detail değiştiğinde çalışır
  const handleForm = (e) => {
    e.preventDefault();
    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => {
        if (item.id == id) {
          item = newNote;
        }
        return item;
      });
      setNotes(newNotes);
    }
    // ana sayfaya yönlendir
    navigate("/");
  };

  // notu silme
  const handleDelete = () => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      const newNotes = notes.filter((item) => item.id != id);
      setNotes(newNotes);
      navigate("/");
    }
  };
  return (
    <section>
      <header className="create-note__header">
        <Link to={"/"} className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Kaydet
        </button>
        <button className="btn lg danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <textarea
          rows="28"
          placeholder="Not detayı..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;