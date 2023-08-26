import React from 'react'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import AsideMenu from '../components/AsideMenu'
import Note from '../components/Note'

const page = ({toggleMenu , isMenuToggle , signOut}) => {
  return (
    <>
    <Navbar toggleMenu={toggleMenu} />
      <ToastContainer position="top-center" />
      <AsideMenu isMenuToggle={isMenuToggle} signOut={signOut} />
     
    </>
  )
}

export default page