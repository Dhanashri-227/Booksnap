import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';   // ✅ Correct
import Footer from './Footer';   // ✅ Correct

export default function MainNavigation() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
