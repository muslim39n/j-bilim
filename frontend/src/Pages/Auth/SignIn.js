import React, { Component } from 'react'
import {Container, ListGroup,Card, Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Services/authservice"

function SignIn(props){
    const navigate = useNavigate();

    const signin = (event) => {
        event.preventDefault();
        AuthService.login(event.target.username.value, event.target.password.value)
            .then((res) => {
                console.log(res.status)
                console.log(res.data)
                if(res.status === 200){
                    localStorage.setItem('token', res.data.key)
                }
            })
    };

    return<Container>
      <Row>
          <Col className="col-md-4" style={{marginLeft: "auto", marginRight: "auto"}}>
            <form onSubmit={signin}>
                <h3>Кіру</h3>
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
                    Кіру
                </button>
                </div>
                <p className="forgot-password text-right">
                Егер аккаунт болмаса, <a href="/signup">тіркей аласыз</a>
                </p>
            </form>
            </Col>
      </Row>
    </Container>
}

export default SignIn;