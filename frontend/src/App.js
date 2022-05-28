import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Pages/Home"
import About from './Pages/About';
import UniversityList from './Pages/University/UniversityList';
import UniversityDetail from './Pages/University/UniversityDetail';

import { Navbar, Container,Nav, NavDropdown } from 'react-bootstrap';
 
function App() {
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
              <Nav.Link href="#home">Университеттер</Nav.Link>
              <Nav.Link href="#link">Форум</Nav.Link>
              <Nav.Link href="#link">Мақалалар</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Router>
      <Routes>
        <Route path="/" element={<UniversityList/>}/>
        <Route path="/:id" element={<UniversityDetail/>}></Route>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
