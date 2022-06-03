import React, { Component } from 'react'
import {Container, ListGroup,Card, Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Services/authservice"

function SignUp(props){
    const navigate = useNavigate();
    
    const signup = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        AuthService.registration(event.target.username.value, event.target.password.value)
            .then((res) => {
                if(res.status === 201){
                    localStorage.setItem('token', res.data.key)
                    AuthService.registration2(event.target.firstname.value, event.target.lastname.value, localStorage.getItem('token'))
                    navigate('/signin')
                }
            })
    };

    return<Container>
        <Row>
          <Col className="col-md-4" style={{marginLeft: "auto", marginRight: "auto"}}>
            <form onSubmit={signup}>
                <h3>Тіркелу</h3>
                <div className="mb-3">
                <label>Атыңыз</label>
                <input
                    type="text"
                    className="form-control"
                    name="firstname"
                />
                </div>
                <div className="mb-3">
                <label>Тегіңіз</label>
                <input type="text" 
                className="form-control" 
                name="lastname"/>
                </div>
                <div className="mb-3">
                <label>Юзернейм</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                />
                </div>
                <div className="mb-3">
                <label>Кілтсөз</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                />
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Тіркелу
                </button>
                </div>
                <p className="forgot-password text-right">
                Егер тіркелген болсаңыз, <a href="/signin">сайтқа кіре аласыз</a>
                </p>
            </form>
            </Col>
      </Row>
    </Container>
}

export default SignUp;