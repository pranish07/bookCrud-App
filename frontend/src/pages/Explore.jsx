import React from "react";
import { useLocation } from "react-router-dom";

function Explore() {
  const book = useLocation().state.book;
  console.log(book);
  return (
    <>
      <button style={{padding:"0"}}>
        <a
          href="http://localhost:3000"
          style={{ textDecoration: "none",padding:"0 2rem" }}
        >
          Back
        </a>
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          boxShadow: "0 0 5px #ccc",
          marginLeft: "20px",
          cursor: "pointer",
          width: "80%",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <img
          src={book.image}
          alt={book.name}
          width="200px"
          height="200px"
          style={{ objectFit: "contain" }}
        />
        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}>Book Name: </span>
          {book.name}
        </p>

        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}>Author Name: </span>
          {book.author}
        </p>
        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}> Genre:</span> {book.genre}
        </p>
        <p style={{ margin: ".5rem" }}>
          <span style={{ color: "black" }}> Description: </span>
          {book.description}
        </p>
      </div>
    </>
  );
}

export default Explore;
