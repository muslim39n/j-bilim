import React, { Component } from 'react'
import {Container, ListGroup,Card, Form, Button, Row, Col} from 'react-bootstrap';

function SignUp(props){
  return<Container>
      <Row>
          <Col className="col-md-4" style={{marginLeft: "auto", marginRight: "auto"}}>
            <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                <label>First name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                />
                </div>
                <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" />
                </div>
                <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
                </div>
                <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
                </div>
                <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
            </Col>
      </Row>
    </Container>
}

export default SignUp;