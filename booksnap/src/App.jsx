import React from 'react';
import axios from 'axios';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import MainNavigation from './component/MainNavigation';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import MyBooks from './pages/MyBooks';
import Favourites from './pages/Favourites';
import BookDetail from './pages/BookDetail';

// 📌 Loaders

const getAllBooks = async () => {
  let allBooks = [];
  await axios.get('http://localhost:5000/book').then((res) => {
    allBooks = res.data;
  });
  return allBooks;
};

const getMyBooks = async () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) return [];
  let allBooks = await getAllBooks();
  return allBooks.filter((item) => item.createdBy === user._id);
};

const getFavBooks = () => {
  return JSON.parse(localStorage.getItem('fav')) ?? [];
};

// 📌 Routes

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: getAllBooks,
      },
      {
        path: '/mybook',
        element: <MyBooks />,      // changed here
        loader: getMyBooks,
      },
      {
        path: '/favbook',
        element: <Favourites />,   // changed here
        loader: getFavBooks,
      },
      {
        path: '/addbook',
        element: <AddBook />,
      },
      {
        path: '/editbook/:id',
        element: <EditBook />,
        loader: getMyBooks,
      },
      {
         path:'/bookdetail/:id' ,
         element:<BookDetail />
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
}


export default App;
