import React, { useState } from 'react'
import foodBook from '../assets/foodBook.jpeg'
import BookItems from '../component/BookItems';  // renamed if you switch from RecipeItems
import { useNavigate } from 'react-router-dom';
import Modal from '../component/Modal'
import InputForm from '../component/InputForm'

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const addBook = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addbook");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div>
        <section className="home">
          <div className="left">
            <h1>Book Summary</h1>
            <h4>
              Book Snap is a user-friendly web application designed for book lovers to easily add, manage, and favorite their personal book collection. With a clean and intuitive interface, users can upload book cover images, provide titles and summaries, and organize their library efficiently. The platform allows for quick access to your favorite reads and supports a personalized reading experience. Whether you're cataloging classics or exploring new titles, Book Snap makes it simple and visually appealing. Designed with modern aesthetics and responsive design, it’s perfect for casual readers and bibliophiles alike to build and showcase their own virtual bookshelf.      <br/><br/>      </h4>
            <button onClick={addBook}>Share your book</button>
          </div>
          <div className="right">
            <img src={foodBook} width="320" height="300" alt="book" />
          </div>

        </section>
        {/* <section className="home">
<div  className="left">
   <h1>Books are</h1>
</div>
  </section> */}

        {/* <div className="bg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#d4f6e8" fillOpacity="1" d="M0,0L48,48C96,96,192,192,288,197.3C384,203,480,117,576,74.7C672,32,768,32,864,64C960,96,1056,160,1152,197.3C1248,235,1344,245,1392,250.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div> */}

      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
      <div className="recipe">
        <BookItems />
      </div>
    </>
  );
}
