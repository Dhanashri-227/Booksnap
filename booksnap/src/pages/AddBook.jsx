import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddFoodbook() {
    const [bookData, setBookData] = useState({})
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        const { name, value, files } = e.target;
        const val =
            name === "summary"
                ? value.split(",")
                : name === "file"
                    ? files[0]
                    : value;

        setBookData(prev => ({
            ...prev,
            [name]: val
        }));
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
            await axios.post("http://localhost:5000/book", formData, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")
                    // do not manually set Content-Type here
                },
            });
            navigate("/");
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

                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}
