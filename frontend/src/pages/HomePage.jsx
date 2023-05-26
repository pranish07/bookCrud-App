import React, { useEffect, useState } from "react";
import api from "../api/config";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function HomePage() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function fetchBooks() {
      const response = await api.get("/book");
      //  console.log(response.data);
      setBookList(response.data);
      setTempBookList(response.data);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function searchBooks() {
      const response = await api.get(`/book/search/all?q=${searchText}`);
      if (response.data) {
        setBookList(response.data);
        console.log(response.data);
      }
    }
    if (searchText) searchBooks();
    else setBookList(tempBookList);
  }, [searchText, tempBookList]);
  return (
    <>
    <Navbar/>
      <center>
        <input
          type="text"
          placeholder="Search Books..."
          style={{ width: "55%", margin: "20px", padding: "10px" }}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </center>{" "}
      <div
    
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {bookList.length > 0
          ? bookList.map((book, index) => {
              return (
                <div
                onClick={()=>navigate("/explore",{
                  state:{
                    book,
                  }
                })}
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign:"center",
                    padding: "1rem",
                    boxShadow: "0 0 5px #ccc",
                    marginLeft: "20px",
                    cursor:"pointer",
                  }}
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    width="200px"
                    height="200px"
                    style={{ objectFit: "contain" }}
                  />
                  <p>{book.name}</p>
                </div>
              );
            })
          : "No Books Found"}
      </div>
    </>
  );
}

export default HomePage;
