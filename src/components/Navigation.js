import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink as Link} from "react-router-dom";
import {connect} from "react-redux";
import '../styles/navigation.css'
import {logOut} from "../actionCreators/authActions";

class Navigation extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        name: ''
    };

    admin() {
        if (this.props.isLogged && JSON.parse(localStorage.getItem("roles")).includes('teacher')) {
            return (
                <NavDropdown title="Add a Book" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/expand#ISBN">Generate by ISBN</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/expand#title">Generate by Title</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to="/expand#custom">Create a custom one</NavDropdown.Item>
                </NavDropdown>)

        }
    }

    render() {
        return (
            <div><Navbar className="navB" variant="dark" expand="lg">
                <Navbar.Brand>451° F</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link exact as={Link} to="/dashboard">Dashboard</Nav.Link>
                        {this.admin()}
                        {this.props.isLogged ? <Nav.Link exact as={Link} to="/profile">Profile</Nav.Link> : ""}
                    </Nav>


                    <Nav>
                        {this.props.isLogged ?
                            <Navbar.Text onClick={() => {
                                this.props.logOut();
                            }}>
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
    logOut: () => {
        dispatch(logOut())
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
