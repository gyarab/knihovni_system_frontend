import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink as Link} from "react-router-dom";
import {authenticate, deleteErrors, googleAuth} from "../actionCreators/authActions";
import {connect} from "react-redux";

class Navigation extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        name:''
    };
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.decodedJWT)
    }


    render() {
        return (
            <div><Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {this.props.isLogged ?
                            <Navbar.Text>
                                Signed in as: {localStorage.getItem("name")}
                            </Navbar.Text> :
                            <Nav.Link as={Link} to="/auth">Login/Register</Nav.Link>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar></div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,


});
const mapDispatchToProps = (dispatch) => ({
    logIn: (creds, type) => {
        dispatch(authenticate(creds, type))
    },
    deleteErrors: () => {
        dispatch(deleteErrors())
    },
    googleAuth: token_id => {
        dispatch(googleAuth(token_id))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
