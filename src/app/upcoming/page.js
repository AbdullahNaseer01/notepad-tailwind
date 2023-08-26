'use client'
import React, { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { LuEdit } from 'react-icons/lu';
import { RiMenu2Line, RiDeleteBinLine } from 'react-icons/ri';
import { TiTickOutline } from 'react-icons/ti';
import { useAuth } from "../../../firebase/Auth";
import { useRouter } from "next/navigation";
import { addDoc, deleteDoc, getDoc, getDocs, collection, where, query, updateDoc, doc } from 'firebase/firestore';
import { database } from '../../../firebase/firebaseConfig';
import Navbar from '../components/Navbar';
import AsideMenu from '../components/AsideMenu';
import Note from '../components/Note';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupForm from '../components/PopupForm';

const page = () => {
  const router = useRouter();
  const { signOut, authUser, isLoading } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuToggle, setMenuToggle] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState({
    today: [],
    future: []
  });  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Initialize with the current date or any default date
    color: "#ffffff",
  });


  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (authUser) {
      fetchNotes(authUser.uid);
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    if (isEditMode && editNoteId) {
      const editNote = notes.today.find(note => note.id === editNoteId);
      if (editNote) {
        setFormData({
          title: editNote.noteTitle,
          description: editNote.noteDesc,
          date: new Date(editNote.date),
          color: editNote.color,
        });
      }
    }
  }, [isEditMode, editNoteId, notes.today]);

  useEffect(() => {
    if (isEditMode && editNoteId) {
      const editNote = notes.future.find(note => note.id === editNoteId);
      if (editNote) {
        setFormData({
          title: editNote.noteTitle,
          description: editNote.noteDesc,
          date: new Date(editNote.date),
          color: editNote.color,
        });
      }
    }
  }, [isEditMode, editNoteId, notes.future]);


  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setFormData({
      title: '',
      description: '',
    });
    setEditMode(false)
  };

  const toggleMenu = () => {
    setMenuToggle(!isMenuToggle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && editNoteId) {
        const docRef = doc(database, "notes", editNoteId);
        await updateDoc(docRef, {
          noteTitle: formData.title,
          noteDesc: formData.description,
          date: formData.date,
          color: formData.color
        });
        setEditMode(false);
        toast.success("Note updated sucessfully")
      } else {

        const docRef = await addDoc(collection(database, "notes"), {
          noteTitle: formData.title,
          noteDesc: formData.description,
          owner: authUser.uid,
          completed: false,
          date: formData.date,
          color: formData.color,
        });
        toast.success("Note added sucessfully")

      }
      closePopup();
      fetchNotes(authUser.uid);
      console.log("Note updated or added successfully");
    } catch (error) {
      console.error("Error updating or adding note: ", error);
      toast.error("Some Issue Occured Try Again")
    }
  };

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(database, "notes", docId));
      fetchNotes(authUser.uid);
      toast.success("Note deleted sucessfully")
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("some issue while deleting Note")
    }
  };

  const handlemarkComplete = async (docId) => {
    try {
      const docRef = doc(database, "notes", docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentCompleted = docSnapshot.data().completed;
        await updateDoc(docRef, {
          completed: !currentCompleted,
        });
        fetchNotes(authUser.uid);
      } else {
        console.error("Document not found");
      }
    } catch (error) {
      console.error("Error toggling completed status: ", error);
    }
  };


  const fetchNotes = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
  
      // Query notes with today's date or earlier
      const todayQuery = query(
        collection(database, "notes"),
        where("owner", "==", authUser.uid),
        where("date", "<=", today)
      );
  
      // Query notes with future dates
      const futureQuery = query(
        collection(database, "notes"),
        where("owner", "==", authUser.uid),
        where("date", ">", today)
      );
  
      const [todaySnapshot, futureSnapshot] = await Promise.all([
        getDocs(todayQuery),
        getDocs(futureQuery)
      ]);
  
      let todayNotes = [];
      let futureNotes = [];
  
      todaySnapshot.forEach((doc) => {
        todayNotes.push({ ...doc.data(), id: doc.id });
      });
  
      futureSnapshot.forEach((doc) => {
        futureNotes.push({ ...doc.data(), id: doc.id });
      });
  
      setNotes({
        today: todayNotes,
        future: futureNotes
      });
    } catch (error) {
      console.log("Error fetching notes: ", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Convert the date input to ISO format
    const newValue = type === "date" ? new Date(value).toISOString().split("T")[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };
  return (
    <>
      <Navbar toggleMenu={toggleMenu} />
      <ToastContainer position="top-center" />
      <AsideMenu isMenuToggle={isMenuToggle} signOut={signOut} />
      <main className=" sm:ml-60 pt-16  max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notes.future.map((note) => (
              <Note key={note.id} setEditMode={setEditMode} setEditNoteId={setEditNoteId} setPopupOpen={setPopupOpen} note={note} handleDelete={handleDelete} handlemarkComplete={handlemarkComplete} />

            ))}
            <div className="w-full bg-white rounded-lg shadow-lg text-center">
              <button className="text-2xl py-24" onClick={openPopup}>
                <GrAddCircle />
              </button>
            </div>
          </div>
        </div>
        <PopupForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} isPopupOpen={isPopupOpen} closePopup={closePopup} isEditMode={isEditMode} formData={formData}/>
      </main>
    </>
  )
}

export default page

  


