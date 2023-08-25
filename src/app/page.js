'use client'
import React, { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { LuEdit } from 'react-icons/lu';
import { RiMenu2Line, RiDeleteBinLine } from 'react-icons/ri';
import { TiTickOutline } from 'react-icons/ti';
import { useAuth } from "../../firebase/Auth";
import { useRouter } from "next/navigation";
import { addDoc, deleteDoc, getDoc, getDocs, collection, where, query, updateDoc, doc } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig';
import Navbar from './components/Navbar';
import AsideMenu from './components/AsideMenu';
import Note from './components/Note';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter();
  const { signOut, authUser, isLoading } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuToggle, setMenuToggle] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [notes, setNotes] = useState([]);
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
      const editNote = notes.find(note => note.id === editNoteId);
      if (editNote) {
        setFormData({
          title: editNote.noteTitle,
          description: editNote.noteDesc,
          date: new Date(editNote.date), // Convert ISO date string to Date object
          color: editNote.color, // Set color directly as the color string
        });
      }
    }
  }, [isEditMode, editNoteId, notes]);
  

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
      const q = query(collection(database, "notes"), where("owner", "==", authUser.uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setNotes(data);
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
            {notes.map((note) => (
              <Note setEditMode={setEditMode} setEditNoteId={setEditNoteId} setPopupOpen={setPopupOpen} note={note} handleDelete={handleDelete} handlemarkComplete={handlemarkComplete} />
              
            ))}
            <div className="w-full bg-white rounded-lg shadow-lg text-center">
              <button className="text-2xl py-24" onClick={openPopup}>
                <GrAddCircle />
              </button>
            </div>
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Note' : 'Add Note'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                    required
                  />
                </div>
                <label htmlFor="color" className="block text-sm font-medium">
                  Color
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="mt-1 block"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
                  >
                    {isEditMode ? 'Save' : 'Submit'}
                  </button>
                  <button
                    type="button"
                    onClick={closePopup}
                    className="ml-2 px-4 py-2 border rounded-md border-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}
      </main>


    </>
  );
}
