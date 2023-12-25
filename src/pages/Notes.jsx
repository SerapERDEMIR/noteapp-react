import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFiltredNotes] = useState(notes);

  const handleSearch = () => {
    setFiltredNotes(
      notes.filter((note) => {
        // notes dizisinde bulunan notları filtrelemek ve text adlı bir metin girişine göre eşleşen notları içeren yeni bir diziyi setFilteredNotes fonksiyonu aracılığıyla güncellemektir.
        // match: eşleşen kısmı bulmak için
        if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);
  return (
    <section className="container">
      <header className="notes__header">
        {!showSearch && <h2>Notlarım</h2>}
        {showSearch && (
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            autoFocus
            placeholder="Aramak istediğiniz kelimeyi giriniz"
          />
        )}
        <button
          className="btn "
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && (
          <p className="empty_notes">Not eklemek ister misiniz?</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link className="btn add__btn" to="create-note">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;