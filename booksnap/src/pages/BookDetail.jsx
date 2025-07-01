import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/book/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error("Book not found", error));
  }, [id]);

  if (!book) return <p className="loading">Loading...</p>;

  return (
    <div className="book-detail-wrapper">
      <h1 className="detail-heading">{book.title}</h1>

      <div className="book-detail-card">
        <img
          src={book.coverImage ? `http://localhost:5000/images/${book.coverImage}` : 'https://via.placeholder.com/300x400'}
          alt={book.title}
          className="detail-image"
        />

        <div className="detail-content">
          <p className="detail-summary">{book.summary}</p>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate('/mybook')}>
        ← Back to Library
      </button>
    </div>
  );
};

export default BookDetail;
