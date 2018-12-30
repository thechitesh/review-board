import React , {Component} from 'react';
import {Navbar , NavbarBrand, Nav, NavbarToggler, Collapse, NavItem , Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{

    constructor(props){
        super(props)
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(event){
        this.toggleModal();
        alert("Username : "+this.username.value + " Password "+ this.password.value+
        " Remember "+this.remember.checked);
        event.preventDefault();
    }
    render(){
        return(
        //<React.Fragment>
        <>
            <Navbar dark expand="md">
                <div className="container">
                <NavbarToggler onClick={this.toggleNav}/>
                <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/chi.png" height="30" width="41" 
                    alt="Green Board" />
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home">
                            <span className="fa fa-home fa-lg"></span> Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus">
                            <span className="fa fa-info fa-lg"></span> About Us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/review">
                            <span className="fa fa-list fa-lg"></span> Review Board
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus">
                            <span className="fa fa-address-card fa-lg"></span> Contact Us
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span> Login
                        </Button>
                    </NavItem>
                </Nav>
                </Collapse>
                </div>
            </Navbar>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" 
                            innerRef ={(input) => this.username = input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" 
                            innerRef ={(input) => this.password = input}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="remember"
                                innerRef ={(input) => this.remember = input}
                                />
                                Remember Me
                            </Label>
                        </FormGroup>
                        <Button type="submit" value="submit" className="bg-primary" >Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
        );
    }

    toggleNav(){
        this.setState({
            isNavOpen : !this.state.isNavOpen
        });
    }

}

export default Header;