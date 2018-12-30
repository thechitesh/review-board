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
    }

    render(){
        return(
            <div>
                <Header /> 
                <Switch>
                    <Route path="/home" component ={Home}/>

                    <Route exact path="/review" component = {()=> <ReviewBoard comments = {this.props.comments}
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