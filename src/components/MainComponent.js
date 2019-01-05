import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {NEGATIVE} from '../shared/negativeComments';
import {POSITIVE} from '../shared/positiveComments';
import {connect } from 'react-redux';
import {addComment} from '../redux/ActionCreators';
import ReviewBoard from './ReviewBoardComponent';
import Review from './ReviewBoard';

const mapStateToProps = state => {
    return{
        comments: state.comments
    };    
  }

const mapDispatchToProps = (dispatch) =>({
  addComment: (rating, author, comment) => dispatch(addComment(rating, author, comment))
});

class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
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
            // var response = JSON.parse(result);
            // console.log("respnse :"+response);
            this.setState({
                comments : result.comments
            });

            console.log("comments "+JSON.stringify(this.state.comments));            
        })
        .catch( err => {
            console.log(err);
        });

    }

    render(){
        return(
            <div>
                <Header /> 
                <Switch>
                    <Route path="/home" component ={Home}/>

                    <Route exact path="/review" component = {()=> <Review comments = {this.state.comments}
                        addComment = {this.props.addComment}/>} />
                    <Route path="/contactus" />
                    <Route path="/aboutus" />
                    <Redirect to="/home" />
                </Switch>
                
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));