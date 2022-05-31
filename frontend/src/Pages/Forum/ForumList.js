import React, { useEffect, useState } from 'react';
import ForumService from "../../Services/forumservice"

import {Container, ListGroup,Card, Form, Button, Row, Col} from 'react-bootstrap';


function ForumItem(props){
    return <Card style={{marginBottom: "15px"}}>
            <Card.Header>{props.user.username} | {props.created.slice(0, 10)} {props.created.slice(11, 19)}</Card.Header>
                <Card.Body>
                    <Card.Title>{ props.title }</Card.Title>
                    <Card.Text>
                        {props.short_body}
                    </Card.Text>
                    <Button variant="outline-primary">Постты ашу</Button>
                </Card.Body>
            </Card>
}

function ForumList(){
    const [forums, setForums] = useState([])
    const [page, setPage] = useState(1)
    const [prevPage, setPrevPage] = useState()
    const [nextPage, setNextPage] = useState()

        

    const getNextPage = (event) => {
        event.preventDefault();
        ForumService.getForumList(page + 1)
            .then((response) => {
                setPage(page + 1)
                setPrevPage(response.data.previous)
                setNextPage(response.data.next)
                setForums(response.data.results);
            })
    };
    
    const getPrevPage = (event) => {
        event.preventDefault();
        ForumService.getForumList(page - 1)
            .then((response) => {
                setPage(page - 1)
                setPrevPage(response.data.previous)
                setNextPage(response.data.next)
                setForums(response.data.results);
            })
    };

    useEffect(()=>{
        ForumService.getForumList()
            .then((response)=>{
                setPrevPage(response.data.previous)
                setNextPage(response.data.next)
                setForums(response.data.results);
            })
        
    }, [])


    return <>
    <Container>
        <h1 className="own-header">Форум</h1>
        {
            forums.map((forum, index) => {
                return (
                    <ForumItem title={forum.title} short_body={forum.short_body} id={forum.id} user={forum.user} created={forum.created}></ForumItem>
                )
            })
        }
        <Row>
        <p style={{fontSize: "18px"}}>Бет: {page}</p>
            <Col>
        {prevPage ? <Button onClick={getPrevPage} className="col-md-3" variant="primary" value="prev">Алдыңғы бет</Button> :<></>}
        {nextPage ? <Button onClick={getNextPage} className="ms-1 col-md-3" variant="primary" value="next">Келесі бет</Button> : <></>}
            </Col>
        </Row>
    </Container> 
    </>;
}

export default ForumList;