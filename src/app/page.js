"use client"
import React, { useState, useEffect } from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { LuEdit } from 'react-icons/lu';
import { RiMenu2Line, RiDeleteBinLine } from 'react-icons/ri';

import { TiTickOutline } from 'react-icons/ti';

// import { app, database } from '../../firebase/firebaseConfig';
import { useAuth } from "../../firebase/Auth";
import { useRouter, useNavigate } from "next/navigation";
import { addDoc, deleteDoc, getDoc, getDocs, collection, where, query, updateDoc, doc } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig';


export default function Home() {
  const router = useRouter()
  const { signOut, authUser, isLoading } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isMenuToggle, setMenuToggle] = useState(false);
  const [notes, setNotes] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  // const db = collection(database, 'notes');

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login");
    }
    if (authUser) {
      fetchNotes(authUser.uid)
    }
  }, [authUser, isLoading]);





  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setFormData({
      name: '',
      email: '',
    })
  };
  const toggleMenu = () => {
    setMenuToggle(!isMenuToggle)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(database, "notes"), {
        noteTitle: formData.title,
        noteDesc: formData.description,
        owner: authUser.uid,
        completed: false,
      });
      closePopup()
      fetchNotes(authUser.uid)
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleDelete = async (docId) => {
    try {
      await deleteDoc(doc(database, "notes", docId))
      fetchNotes(authUser.uid)
    } catch (error) {
      console.error("Error deleting document: ", error);

    }

  }
  // const handlemarkComplete = async (event , docId)=>{
  //   try {
  //     const docRef = doc(database,"notes",docId)
  //   await updateDoc(docRef,{
  //     completed: event.target.checked
  //   })
  //   } catch (error) {
  //     console.error("Error completing document: ", error);
  //   }

  // }
  // const handlemarkComplete = async (docId) => {
  //   try {
  //     const docRef = doc(database, "notes", docId);
  //     await updateDoc(docRef, {
  //       completed: true
  //     });
  //   } catch (error) {
  //     console.error("Error completing document: ", error);
  //   }
  // };

  const handlemarkComplete = async (docId) => {
    try {
      const docRef = doc(database, "notes", docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const currentCompleted = docSnapshot.data().completed;
        await updateDoc(docRef, {
          completed: !currentCompleted, // Toggle the completed value
        });
        fetchNotes(authUser.uid)
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

      let data = []

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        data.push({ ...doc.data(), id: doc.id })
      });
      setNotes(data)
    }
    catch {
      console.log("error accooaffafafaf", error)
      console.log('11111111111111111')
    }
  }


  const theChecker = () => {
    console.log(notes, " form tghe checker")
  }




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <header className="sm:fixed right-0 top-0 sm:left-60 bg-yellow-50 py-3 px-4 h-16">
        <div className='text-2xl sm:hidden flex justify-end' onClick={toggleMenu}><RiMenu2Line /></div>

        <div className="hidden  sm:inline max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <button
                type="button"
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
                onClick={theChecker}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </span>
                <span className="text-sm">Archive</span>
              </button>
            </div>
            <div className="text-lg font-bold">Todays Plan</div>
            <div>
              <button
                type="button"
                className="flex items-center focus:outline-none rounded-lg text-gray-600 hover:text-yellow-600 focus:text-yellow-600 font-semibold p-2 border border-transparent hover:border-yellow-300 focus:border-yellow-300 transition"
              >
                <span className="text-sm">This week</span>
                <span className="inline-flex items-center justify-center w-6 h-6 text-gray-600 text-xs rounded bg-white transition ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={` sm:inline ${isMenuToggle ? 'block' : 'hidden'}`}>
        <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
          <div className="flex flex-col justify-between h-full">
            <div className="flex-grow">
              <div className="px-4 py-6 text-center border-b">
                <h1 className="text-xl font-bold leading-none">
                  <span className="text-yellow-700">Task Manager</span> App
                </h1>
              </div>
              <div className="p-4">
                <ul className="space-y-1">
                  <li>
                    <a
                      href=""
                      className="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-lg mr-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                      </svg>
                      Plan
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-lg mr-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
                      </svg>
                      Task list
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="text-lg mr-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                      </svg>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="text-lg mr-4"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      Tags
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-4">
              <button
                type="button"
                className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
                onClick={signOut}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className=""
                  viewBox="0 0 16 16"
                >
                  <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </button>
              <span className="font-bold text-sm ml-2">Logout</span>
            </div>
          </div>
        </aside>
      </div>


      <main className=" sm:ml-60 pt-16  max-h-screen overflow-auto">
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`w-full relative rounded-lg shadow-lg text-center ${note.completed ? 'bg-lime-300' : 'bg-red'
                  }`}
                style={{ minWidth: "200px", minHeight: "200px" }}
              >
                {/* Display background text for completed notes */}
                {note.completed && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white bg-opacity-80 rounded p-1">
                    Mark as Completed
                  </span>
                )}
                <button className="absolute text-lg top-0 right-14 m-2" onClick={() => { handleDelete(note.id) }}>
                  <RiDeleteBinLine />
                </button>
                <button>
                  <LuEdit className="absolute text-lg top-0 right-7 m-2" />
                </button>
                <button onClick={() => handlemarkComplete(note.id)}>
                  <TiTickOutline className="absolute text-lg top-0 right-0 m-2" />
                </button>
                <h1 className="mt-8">{note.noteTitle}</h1>
                <p className="mt-4">{note.noteDesc}</p>
              </div>
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
              <h2 className="text-xl font-semibold mb-4">Popup Form</h2>
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
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
                  >
                    Submit
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
  )
}

