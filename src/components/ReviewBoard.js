import React, {Component} from 'react';

import {Card, CardText, CardBody, CardFooter, CardSubtitle} from 'reactstrap';
import CommentForm from './CommentForm';

const FeedbackCard = ({comment}) =>{
    return(
       <Card >
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
        })
        .catch( err => {
            console.log(err);
        });


    }

    constructor(props){
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
        
        const positives = this.state.comments.filter((comment) => comment.section === 'Happy');
        const negatives = this.state.comments.filter((comment) => comment.section === 'UnHappy');
 
        const positive = positives.map((positive) =>{
        return(
            
            <div key={positive.id} className="m-1">
                <FeedbackCard comment={positive} />
            </div>
        );
        });

        const negative = negatives.map((negative) =>{
            return(
            <div key={negative.id} className="m-1">
                <FeedbackCard comment={negative} />
            </div>
            );
        });
    

        return(
            <div className="container">
                <div className="row justify-content-center  intro">
                <div className="col-md-8">
                    <h3>Give your opinion about the sprint </h3> <br/>
                    <p>This board can help in reducing the use of sticky notes, <br/>
                        which we carelessly use to display our views about the sprint</p>
                </div>
                <div className="col-md-2 md-1">
                        <CommentForm show={this.showComments}/>
                </div>
                </div>
                <div className="row align-items-start ">
                    <div className="col-12 col-md-6">
                        {positives.length > 0 ? 
                            <div className="tabHead" >
                                <h5>Your are Happy About</h5>
                            </div>
                            :<div></div>
                    }
                        
                        {positive}
                    </div>

                    <div className="col-12 col-md-6">
                    {negatives.length > 0 ? 
                            <div className="tabHead" >
                                <h5>Your are not so Happy About</h5>
                            </div>
                            :null
                            
                    }
                        {negative}
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Reaview;