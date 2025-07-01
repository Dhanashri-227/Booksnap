import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import foodBook from '../assets/foodBook.jpeg';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function BookItems({ books: propBooks, fromFavPage = false }) {
  const location = useLocation(); // ✅ instead of window.location.pathname
  const loaderBooks = useLoaderData();
  const books = propBooks || loaderBooks;
  const [allBooks, setAllBooks] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const userEmail = user?.email ?? 'guest';

  const [favItems, setFavItems] = useState(() =>
    JSON.parse(localStorage.getItem(`fav_${userEmail}`)) ?? []
  );

  // ✅ If fromFavPage is true, allow detail page navigation
  const isReadOnlyPage = !fromFavPage && location.pathname === '/mybook';

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/book/${id}`);
      setAllBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const favBook = (item) => {
    let updatedFavs;
    if (favItems.some((book) => book._id === item._id)) {
      updatedFavs = favItems.filter((book) => book._id !== item._id);
    } else {
      updatedFavs = [...favItems, item];
    }
    setFavItems(updatedFavs);
    localStorage.setItem(`fav_${userEmail}`, JSON.stringify(updatedFavs));

    if (fromFavPage) {
      setAllBooks(updatedFavs);
    }
  };

  return (
    <div className="card-container">
      {allBooks.map((item) => {
        const isFav = favItems.some((book) => book._id === item._id);

        const cardInner = (
          <>
            <img
              src={
                item.coverImage
                  ? `http://localhost:5000/images/${item.coverImage}`
                  : foodBook
              }
              alt={item.title}
            />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="icons">
                {!isReadOnlyPage ? (
                  <FaHeart
                    onClick={(e) => {
                      e.preventDefault(); // Stop link if clicked
                      favBook(item);
                    }}
                    style={{
                      color: isFav ? 'red' : 'gray',
                      cursor: 'pointer',
                    }}
                  />
                ) : (
                  <div className="action">
                    <Link
                      to={`/editbook/${item._id}`}
                      className="editIcon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaEdit />
                    </Link>
                    <FaTrash
                      onClick={() => onDelete(item._id)}
                      className="deleteIcon"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        );

        return (
          <div key={item._id} className="card">
            {/* ✅ Always wrap in Link unless it's strictly "My Books" page */}
            {!isReadOnlyPage ? (
              <Link
                to={`/bookdetail/${item._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {cardInner}
              </Link>
            ) : (
              cardInner
            )}
          </div>
        );
      })}
    </div>
  );
}
