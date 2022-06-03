import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import UniversityService from "../../Services/service"
import AuthService from "../../Services/authservice"

import {Container, ListGroup,Badge, Form, Button, Row, Col, NavbarBrand,Accordion,Card, Alert} from 'react-bootstrap';
import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu';

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
    const [alertVisible, setAlertVisible] = useState(false);
    const [queues, setQueues] = useState([])
    const [chosenMonth, setChosenMonth] = useState(0)
    const [chosenDay, setChosenDay] = useState(0)

    const chooseDate = (event) => {
        event.preventDefault();
        const date = event.target.duedate.value;
        if (date === ''){
            setAlertVisible(true);
        }
        else {
            setAlertVisible(false);
            var d = new Date( date );
            const m = d.getMonth() + 1;
            const dy = d.getDate();
            setChosenMonth(m)
            setChosenDay(dy)

            UniversityService.getQueue(univer.id, m, dy)
                .then((res) => {
                    setQueues(res.data)
                })
        }
    };
    
    const choosePlace = (event) => {
        event.preventDefault();
        if(localStorage.getItem("token")){
            UniversityService.choosePlace(univer.id, chosenMonth, chosenDay, event.target.btn.id, event.target.queue_id.value, localStorage.getItem("token"))
        }
        
        UniversityService.getQueue(univer.id, chosenMonth, chosenDay)
        .then((res) => {
            setQueues(res.data)
        })
    }
    
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
        { }
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
        <br/>
        <br/>
        <br/>
        <div className="App">
            <h1 className='own-header'>Онлайн кезекке тұру</h1>
            <div>   
            {alertVisible && (
               <Alert key="danger" variant="danger">
                Күнді таңдаңыз...
                </Alert>)}
            
                <form onSubmit={chooseDate} >
                <div className="row">
                    <div className="ms-2 col-md-3">
                        <Form.Control
                            type="date"
                            name="duedate"
                            placeholder="Due date"
                        />
                    </div>
                    <div className="ms-1 col-md-3">
                        <Button variant="success" type="submit">Success</Button>
                    </div>
                    
                </div>
                </form>
            </div>
            <div style={{marginTop: "40px"}}>
                {
                    queues.map((queue, index) => {
                        return (<>{queue.queue_type === "CN" ? <h5 style={{marginBottom: "40px", marginTop: "30px"}}>Консультация</h5> : <h5 style={{marginBottom: "40px", marginTop: "30px"}}>Басқа хуйня</h5>}
                            <div className = "row">
                                {queue.places.map((place, index) => {
                                    return (<div className="col-md-1">
                                        {place.isFree ? 
                                                <form onSubmit={choosePlace}>
                                                <input name="queue_id" type="hidden" value={queue.id}></input>
                                                <button id={place.i} type="submit" name="btn" style={{ background: "green", width: "100%", height: "", marginBottom: "10px", border: "none", textAlign: "center", color: "white"}} >{place.start.slice(0, 5)} - {place.end.slice(0, 5)}</button> 
                                                </form>
                                            : <div alt={place.place.fullname} style={{ background: "red", width: "100%", textAlign: "center", color: "white"}}>{place.start.slice(0, 5)} - {place.end.slice(0, 5)}</div>
                                            }
                                            
                                        
                                    </div>)
                                })}
                            </div>
                        </>)
                        
                    })
                }
            </div>
        </div>
    </Container>

}

export default UniversityDetail;