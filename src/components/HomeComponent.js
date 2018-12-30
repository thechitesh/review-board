import React, {Component} from 'react';

import {Card,CardHeader, CardText, CardBody, CardFooter, CardSubtitle, Modal, ModalHeader, ModalBody,  Button,Label, Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';

function FeedbackCard({comment}){
    console.log("comment "+JSON.stringify(comment));
    return(
       <Card>
           <CardBody>
                <CardText>{comment.comment}</CardText>
           </CardBody>
           <CardFooter>
                <CardSubtitle >{comment.author}</CardSubtitle>
           </CardFooter>
           
           
            
        </Card>
    );    
}

const Home = (props) =>{
    const positive = props.positive.map((positive) =>{
       return(
        <div key={positive.id} className="m-2 border-1">
            <FeedbackCard comment={positive}
                
             />
        </div>
       );
    });

    const negative = props.negative.map((negative) =>{
        return(
         <div key={negative.id} className="m-2 border-1">
             <FeedbackCard comment={negative} />
         </div>
        );
     });
 

    return(
        <div className="container">
            <div className="row justify-content-center">
               <div className="col-md-8">
                   <h3>Your Feedback</h3> 
               </div>
               <div className="col-md-3 md-1">
                    <CommentForm 
                        addComment = {props.addComment}
                    />
               </div>
            </div>
            <div className="row align-items-start">
                <div className="col-12 col-md-5  m-1">
                    {positive}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {negative}
                </div>
            </div>
            
        </div>
    );
}


class CommentForm extends Component{
    constructor(props){
        super(props)
        
    this.state = {
        isNavOpen: false,
        isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.toggleModal();
        console.log("dishId : "+this.props.dishId);
        this.props.addComment(values.rating, values.author, values.comment);
        alert("Values : "+JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button className="bg-light btn-light" onClick={this.toggleModal}>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    
                        <Row className="form-group">
                            <Label htmlFor="rating" md={3}>Rating</Label>
                                <Col md={{size:9}}>
                                        <Control.select model=".rating" name="rating" 
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={3}>Your Name</Label>
                                <Col md={9}>
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    />
                                </Col>               
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={3}>Comment</Label>
                                <Col md={9}>
                                    <Control.textarea model=".comment" rows="5" id="comment" name="comment" 
                                    placeholder="comment" 
                                    className="form-control"
                                    />
                                </Col>               
                            </Row>
                        <Button type="submit" className="bg-primary" >Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default Home;