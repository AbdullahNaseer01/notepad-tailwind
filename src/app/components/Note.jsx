// Note.js
import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { LuEdit } from 'react-icons/lu';
import { TiTickOutline } from 'react-icons/ti';

function Note({
  note,
  handleDelete,
  handleSubmit,
  handlemarkComplete,
  setEditMode,
  setEditNoteId,
  setPopupOpen,
}) {
  return (
    <div
      className={`w-full relative rounded-lg shadow-lg text-center ${note.completed ? 'bg-lime-300' : 'bg-red'}`}
      style={{ minWidth: "200px", minHeight: "200px", backgroundColor: note.color }}
    >
      {/* Display background text for completed notes */}
      {note.completed && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white bg-opacity-80 rounded p-1">
          Mark as Completed
        </span>
      )}
      <button className="absolute text-lg top-0 right-14 m-2" onClick={() => handleDelete(note.id)}>
        <RiDeleteBinLine />
      </button>
      <LuEdit className="absolute text-lg top-0 right-7 m-2" onClick={() => {
                    setEditMode(true);
                    setEditNoteId(note.id);
                    setPopupOpen(true);
                  }} />
      <button onClick={() => handlemarkComplete(note.id)}>
        <TiTickOutline className="absolute text-lg top-0 right-0 m-2" />
      </button>
      <h1 className="mt-8">{note.noteTitle}</h1>
      <p className="mt-4">{note.noteDesc}</p>
    </div>
  );
}

export default Note;
