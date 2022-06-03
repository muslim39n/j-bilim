import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

import Home from "./Pages/Home"
import About from './Pages/About';
import UniversityList from './Pages/University/UniversityList';
import UniversityDetail from './Pages/University/UniversityDetail';
import SignUp from './Pages/Auth/SignUp';
import SignIn from './Pages/Auth/SignIn';
import ForumList from './Pages/Forum/ForumList'

import AuthService from "./Services/authservice"

import { Navbar, Container,Nav, NavDropdown } from 'react-bootstrap';
 
function App() {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    if(localStorage.getItem('token') !== null){
      AuthService.getUser(localStorage.getItem('token'))
            .then((response)=>{
                if (response.status === 200){
                  setUser(response.data)
                }
            })
      }
  }, [])

  const logout = (event) => {
    event.preventDefault();
    
    localStorage.removeItem("token");
    setUser(null)
    }; 

  return (
    <div>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">      
          <img
            src={require("./logo.png")}
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
      </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end header">
              <Nav.Link href="/">Университеттер</Nav.Link>
              <Nav.Link href="/forum">Форум</Nav.Link>
              <Nav.Link href="/">Мақалалар</Nav.Link>
              
              {
                user ? <Nav.Link href="#" onClick={logout}>Шығу</Nav.Link> : <Nav.Link href="/signin">Кіру</Nav.Link>
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<UniversityList/>}/>
        <Route path="/:id" element={<UniversityDetail/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/forum" element={<ForumList/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
