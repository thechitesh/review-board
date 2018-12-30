import React, {Component} from 'react';
import {Card, CardText, CardBody, CardFooter, CardSubtitle, Modal, ModalHeader, ModalBody,  Button,Label, Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';


function FeedbackCard({comment}){
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

const ReviewBoard = (props) =>{

    const positives = props.comments.filter((comment) => comment.rating === 'positive');
    const negatives = props.comments.filter((comment) => comment.rating === 'negative');
 
    const positive = positives.map((positive) =>{
       return(
        <div key={positive.id} className="m-2 border-1">
            <FeedbackCard comment={positive} />
        </div>
       );
    });

    const negative = negatives.map((negative) =>{
        return(
         <div key={negative.id} className="m-2 border-1">
             <FeedbackCard comment={negative} />
         </div>
        );
     });
 

    return(
        <div className="container">
            <div className="row justify-content-center  intro">
               <div className="col-md-8">
                   <h3>Start adding your comment </h3> 
               </div>
               <div className="col-md-3 md-1">
                    <CommentForm 
                        addComment = {props.addComment}
                    />
               </div>
            </div>
            <div className="row align-items-start ">
                <div className="col-12 col-md-5  m-1">
                <div className="ml-3">
                        <h5>All Positive Comments</h5>
                    </div>
                    {positive}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <div className="ml-3">
                        <h5>All Negative Comments</h5>
                    </div>
                    {negative}
                </div>
            </div>
            
        </div>
    );
};

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
        this.props.addComment(values.rating, values.author, values.comment);
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
                                            <option>--select--</option>
                                            <option>positive</option>
                                            <option>negative</option>                                        
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

export default ReviewBoard;