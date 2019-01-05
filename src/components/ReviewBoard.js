import React, {Component} from 'react';

import {Card, CardText, CardBody, CardFooter, CardSubtitle, Modal, ModalHeader, ModalBody,  Button,Label, Col, Row} from 'reactstrap';
import CommentForm from './CommentForm';

const FeedbackCard = ({comment}) =>{
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
class Reaview extends Component{

    showComments(){
        fetch("http://localhost:1234/comments")
        .then(res => {
            var json1 = res.json()
            return json1;
        })
        .then(result => {
            this.setState({
                comments : result.comments
            });

            console.log("comments "+JSON.stringify(this.state.comments));            
        })
        .catch( err => {
            console.log(err);
        });


    }

    constructor(props){
        console.log("in review constructor");
        super(props);
        this.showComments = this.showComments.bind(this)
        this.state={
            comments:[]
        }
    }

    componentDidMount(){
     
        fetch("http://localhost:1234/comments")
        .then(res => {
            var json1 = res.json()
            return json1;
        })
        .then(result => {
            this.setState({
                comments : result.comments
            });

        })
        .catch( err => {
            console.log(err);
        });
    }

    render(props){
        
        const positives = this.state.comments.filter((comment) => comment.rating === 'positive');
        const negatives = this.state.comments.filter((comment) => comment.rating === 'negative');
 
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
                        <CommentForm show={this.showComments}/>
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
    }
}

export default Reaview;