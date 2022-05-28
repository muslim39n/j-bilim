import React, { useEffect, useState } from 'react';
import UniversityService from "../../Services/service"

import {Container, ListGroup,Badge, Form, Button, Row, Col} from 'react-bootstrap';


function UniversityItem(props){
    return <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
            <a href="#"><div className="fw-bold">{ props.slug }</div></a>
            {props.name_kz}
            </div>
            <Badge bg="primary" pill>
            {props.id}
            </Badge>
            
            </ListGroup.Item>
}

function UniversityList(){
    const [univers, setUnivers] = useState([])
    const [cities, setCities] = useState([])
    useEffect(()=>{
        UniversityService.getUniversityList()
            .then((response)=>{
                setUnivers(response.data);
            })
        
        UniversityService.getCityList()
            .then((response)=>{
                setCities(response.data);
            })
        
    }, [])
    return <Container>
        <h1 className="own-header">Университеттер тізімі</h1>
        <Form className="univer-form">
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="univer-name">Атауы:</Form.Label>
                        <Form.Control id="univer-name" placeholder="" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">Қала:</Form.Label>
                    <Form.Select id="disabledSelect">
                        <option value="Бәрі">Бәрі</option>
                        {
                            cities.map((city, index) => {
                                return (
                                    <option value={city}>{ city }</option>
                                )
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit">Іздеу</Button>
        </Form>
        <ListGroup as="ol" numbered>
            {
                univers.map((univer, index)=>{
                    return (
                        <UniversityItem slug={univer.slug} name_kz={univer.name_kz} id={univer.code} image={univer.image_url}></UniversityItem>
                    )
                })
            }
        </ListGroup>
    </Container>;
}

export default UniversityList;