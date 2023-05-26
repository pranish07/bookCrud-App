import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

function ListBook() {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/book");
      //   console.log(response.data);
      if (response.data) {
        setBookList(response.data);
      }
    }
    getBooks();
  });

  const deleteBook = async (id, idx) => {
    const data = window.confirm("Do you want to delete?");
    try{
    if (data) {
      const response = await api.delete(`/book/delete/${id}`);
      console.log(response);

      if(response.data.success){
       const newBookList = bookList.filter((book,index)=>index!==idx);
       setBookList(newBookList);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }}
    catch(err){
        console.log(err.message)
        toast.error(err.data.message);
    }
  };
  return (
    <center>
        <Navbar />
      <div>
        <ToastContainer />
        {bookList.length > 0
          ? bookList.map((book, index) => (
              <div
                key={index}
                style={{
                  boxShadow: "0 0 5px #ccc",
                  padding: "1rem",
                  margin: "1rem",
                  width: "40%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            ))
          : "No Books"}
      </div>
    </center>
  );
}

export default ListBook;
