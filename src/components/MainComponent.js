import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import {addComment} from '../redux/ActionCreators';
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

    render(){
        return(
            <div>
                <Header /> 
                <Switch>
                    <Route path="/home" component ={Home}/>

                    <Route exact path="/review" component = {Review} />
                    <Route path="/contactus" />
                    <Route path="/aboutus" />
                    <Redirect to="/home" />
                </Switch>
                
                <Footer />
            </div>
        );
    }
}
export default Main;