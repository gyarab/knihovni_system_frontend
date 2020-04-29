import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink as Link} from "react-router-dom";
import {connect} from "react-redux";
import '../styles/navigation.css'
import {logOut} from "../actionCreators/authActions";
import Profile from "./Profile";
import {toggleProfilePopup} from "../actionCreators/internalActions";

class Navigation extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        name: '',
        show: false,
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
                        {this.props.isLogged ? <Nav.Link onClick={() => {
                            this.props.toggleProfilePopup()
                        }}>Profile</Nav.Link> : ""}
                    </Nav>


                    <Nav>
                        {this.props.isLogged ?
                            <Navbar.Text onClick={() => {
                                this.props.logOut();
                                this.props.toggleProfilePopup();
                            }}>
                                Signed in as: {localStorage.getItem("name")}
                            </Navbar.Text> :
                            <Nav.Link as={Link} to="/auth">Login/Register</Nav.Link>
                        }

                    </Nav>

                </Navbar.Collapse>
            </Navbar>{this.props.profile_shown ? <Profile/> : ""}

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,
    profile_shown: state.internal.profile_shown,
});
const mapDispatchToProps = (dispatch) => ({
    logOut: () => {
        dispatch(logOut())
    },
    toggleProfilePopup: () => {
        dispatch(toggleProfilePopup())
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
