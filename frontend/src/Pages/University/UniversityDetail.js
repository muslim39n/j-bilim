import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import UniversityService from "../../Services/service"

import {Container, ListGroup,Badge, Form, Button, Row, Col, NavbarBrand,Accordion,Card} from 'react-bootstrap';

function UniverStepItem(props){
    return <Card 
    bg={props.color === 'sary' ? 'warning' 
        : props.color === 'kok' ? 'primary'
        : props.color === 'jasyl' ? 'success'
        : 'secondary'}
    key={props.color === 'sary' ? 'Warning' 
    : props.color === 'kok' ? 'Primary'
    : props.color === 'jasyl' ? 'Success'
    : 'Secondary'}
    text='white'
    className="mb-6 univer-step"
  >
    <Card.Header>Қадам #{props.index + 1}</Card.Header>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
          {props.description}
      </Card.Text>
    </Card.Body>
  </Card>

}

function UniverActionItem(props){
    console.log(props)
    return <Accordion.Item eventKey={props.index}>
        <Accordion.Header>{props.title}</Accordion.Header>
        <Accordion.Body>
            {
                props.steps.map((univer_step, index) => {
                    return (
                        <UniverStepItem index={index} title={univer_step.title} color={univer_step.color} description={univer_step.description}></UniverStepItem>
                    )
                })
            }
        </Accordion.Body>
    </Accordion.Item>
}

function UniversityDetail(){
    const params = useParams();

    const [univer, setUniver] = useState([])
    const [univerActions, setUniverActions] = useState([])

    
    useEffect(()=>{
        UniversityService.getUniverDetail(params.id)
            .then((response)=>{
                setUniver(response.data);
                setUniverActions(response.data.univeraction_set)
            })
    }, [])

    return <Container>
        <h1 className='own-header'>{univer.name_kz}</h1>
        <h2 className='own-header-2'>ЖОО коды: {univer.code}</h2>
        <h2 className='own-header-2'>Орналасқан қала: {univer.city_kz}</h2>

        <Row >
            <Col>
                <img className="univer-img"src={
                    univer.image_url == 'none'?
                    require("../../no-photo.jpg")
                    : univer.image_url
                }></img>
            </Col>
            <Col>
                <p>{univer.description}</p>
            </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <h1 className='own-header'>Инструкциялар</h1>
        <Accordion defaultActiveKey="0" flush>
            {
                univerActions.map((univer_action, index) => {
                    return (
                        <UniverActionItem index={index} title={univer_action.title} steps={univer_action.universtep_set}></UniverActionItem>
                    )
                })
            }
        </Accordion>
    </Container>

}

export default UniversityDetail;