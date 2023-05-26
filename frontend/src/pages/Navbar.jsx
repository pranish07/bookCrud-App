import React from 'react'
function Navbar() {
  return (
    <div >
    
        <ul style={{display:"flex",justifyContent:"center", gap:"1rem",textAlign:"center"}}>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/" style={{textDecoration:"none"}}>Home</a>
            </li>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/dashboard/addBook" style={{textDecoration:"none"}}>Add Book</a>
            </li>
            <li style={{listStyleType:"none"}}>
                <a href="http://localhost:3000/dashboard/listBook" style={{textDecoration:"none"}}>Book List</a>
            </li>
        </ul>

    </div>
  )
}

export default Navbar