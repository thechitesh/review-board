import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {NEGATIVE} from '../shared/negativeComments';
import {POSITIVE} from '../shared/positiveComments';
import {connect } from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
        positive: state.positive,
        negative: state.negative
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
                    <Home negative = {this.props.negative}
                          positive = {this.props.positive}
                          addComment = {this.props.addComment}
                    />
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));