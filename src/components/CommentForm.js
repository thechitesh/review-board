import React, {Component} from 'react';

import { Modal, ModalHeader, ModalBody,  Button,Label, Col, Row} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;

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
        fetch("http://localhost:1234/comments",{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(res =>{
            this.props.show();
        });
    
    }

    render(){
        return(
            <div>
                <Button className="bg-light btn-light" onClick={this.toggleModal}>Add Your Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Your Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="section" md={3}>You Feel</Label>
                            <Col md={{size:9}}>
                                    <Control.select model=".section" name="section" 
                                    className="form-control">
                                        <option>--select--</option>
                                        <option>Happy</option>
                                        <option>UnHappy</option>                                        
                                    </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={3}>Your Name</Label>
                            <Col md={9}>
                                <Control.text model=".author" id="author" name="author" 
                                placeholder="Your Name" 
                                className="form-control"
                                validators ={{
                                    required
                                }}
                                />
                            </Col>
                            <Errors className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required:'Required'
                                }}
                            />               
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={3}>Comment</Label>
                            <Col md={9}>
                                <Control.textarea model=".comment" rows="5" id="comment" name="comment" 
                                placeholder="comment" 
                                className="form-control"
                                validators ={{
                                    required
                                }}
                                />
                            </Col>
                            <Errors className="text-danger"
                                model=".comment"
                                show="touched"
                                messages={{
                                    required:'Required'
                                }}
                            />               
                        </Row>
                        <Button type="submit" className="bg-primary" >Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

export default CommentForm;