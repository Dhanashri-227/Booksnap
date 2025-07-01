import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditBook() {
  const [bookData, setBookData] = useState({
    title: '',
    summary: [],
    file: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/book/${id}`);
        const res = response.data;
        setBookData({
          title: res.title,
          summary: res.summary.join(","),
          file: null
        });
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getData();
  }, [id]);

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val =
      name === "summary"
        ? value.split(",")
        : name === "file"
          ? files[0]
          : value;
    setBookData((prev) => ({ ...prev, [name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("summary", bookData.summary);

    if (bookData.file) {
      formData.append("file", bookData.file);
    }

    try {
      await axios.put(`http://localhost:5000/book/${id}`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/mybook");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            className="input"
            name="title"
            value={bookData.title}
            onChange={onHandleChange}
            required
          />
        </div>

        <div className="form-control">
          <label>Summary </label>
          <textarea
            className="input-textarea"
            name="summary"
            rows="5"
            value={bookData.summary}
            onChange={onHandleChange}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label>Book Cover Image</label>
          <input
            type="file"
            className="input"
            name="file"
            onChange={onHandleChange}
          />
        </div>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
