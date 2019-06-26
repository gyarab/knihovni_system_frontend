import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../styles/auth.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import GoogleLogin from "react-google-login";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {connect} from "react-redux";
import {deleteErrors, googleAuth, authenticate} from "../actionCreators/authActions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {Redirect} from "react-router-dom";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            surname: "",
            email: "",
            password: "",
            password2: ""
        };
    }

    redirect() {
        if (localStorage.getItem('logged')) {
            return (<Redirect to='/'/>)
        }
    };

    //Displays all errors if there are any.
    errors() {
        let errors = "";
        if (this.props.error) {
            errors = this.props.errors.map((item, index) => (
                <Alert key={index} variant="warning" onClose={() => this.props.deleteErrors()} dismissible>
                    {item.msg}
                </Alert>));
        }
        return errors;
    }

    //Changes the values stored in the state based on the value in the input fields
    handleInput(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmitLogin(event) {
        event.preventDefault();
        let user = {email: this.state.email, password: this.state.password};
        this.props.logIn(user, 'login');
        this.setState({
            email: "",
            password: "",
        })
    }

    handleSubmitRegister(event) {
        event.preventDefault();
        let user = {
            firstName: this.state.firstName,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.logIn(user, 'register');
        this.setState({
            firstName: "",
            surname: "",
            email: "",
            password: "",
            password2: ""
        })
    }

    sendGoogleAuth(response) {
        this.props.googleAuth(response)
    }

    render() {

        return (

            //Downloads as small image as possible to save bandwidth
            <div className='aligner' style={{
                background: "url(\"https://images.pexels.com/photos/1020320/pexels-photo-1020320.jpeg?auto=compress&cs=tinysrgb&w=1920\") no-repeat"
            }}>{this.redirect()}
                {/*Login form, full width on mobile, in the center on desktop*/}
                <Container>
                    <Row>
                        <Col xs={12} md={{span: 6, offset: 3}}>
                            <Tabs style={{background: 'rgba(255,255,255,0.5)'}} unmountOnExit={true}
                                  id="controlled-tab-example" activeKey={this.state.key}
                                  onSelect={key => {
                                      this.props.deleteErrors();
                                      this.setState({key})
                                  }}>
                                <Tab eventKey="home" title="Login">
                                    <Card>
                                        <Card.Body>

                                            {this.errors()}

                                            <Form>

                                                {/*Email*/}
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" name="email"
                                                                  value={this.state.email}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>

                                                {/*Password*/}
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" name="password"
                                                                  value={this.state.password}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                </Form.Group>

                                                {/*Login options*/}
                                                <ButtonToolbar className="justify-content-between"
                                                               aria-label="Toolbar with Button groups">
                                                    <Button variant="primary" type="submit"
                                                            onClick={this.handleSubmitLogin.bind(this)}>
                                                        Login
                                                    </Button>
                                                    <GoogleLogin
                                                        clientId="19505045016-o77k6h2qe7ipitsih5bc3kac9o03qb8u.apps.googleusercontent.com"
                                                        render={renderProps => (
                                                            <Button variant="outline-danger" className='float-right'
                                                                    type="submit" onClick={renderProps.onClick}
                                                                    disabled={renderProps.disabled}>Sign with
                                                                Google</Button>
                                                        )}
                                                        buttonText="Login"
                                                        onSuccess={this.sendGoogleAuth.bind(this)}
                                                        onFailure={() => console.log('fail')}
                                                        cookiePolicy={'single_host_origin'}/>
                                                </ButtonToolbar>

                                            </Form>

                                        </Card.Body>
                                    </Card>
                                </Tab>
                                <Tab eventKey="profile" title="Register">
                                    <Card>
                                        <Card.Body>

                                            {this.errors()}

                                            <Form>

                                                {/*Name*/}
                                                <Form.Group controlId="formBasicUsername">
                                                    <Form.Label>First name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter first name"
                                                                  name="firstName"
                                                                  value={this.state.firstName}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                </Form.Group>

                                                {/*Surname*/}
                                                <Form.Group controlId="formBasicUsername">
                                                    <Form.Label>Surname</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter surname" name="surname"
                                                                  value={this.state.surname}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                </Form.Group>

                                                {/*Email*/}
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" name="email"
                                                                  value={this.state.email}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                    <Form.Text className="text-muted">
                                                        We'll never share your email with anyone else.
                                                    </Form.Text>
                                                </Form.Group>

                                                {/*Password*/}
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" name="password"
                                                                  value={this.state.password}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                </Form.Group>

                                                {/*Password retyped*/}
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Retype your Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Retype your Password"
                                                                  name="password2"
                                                                  value={this.state.password2}
                                                                  onChange={this.handleInput.bind(this)}/>
                                                </Form.Group>

                                                {/*Login options*/}
                                                <ButtonToolbar className="justify-content-between"
                                                               aria-label="Toolbar with Button groups">
                                                    <Button variant="primary" type="submit"
                                                            onClick={this.handleSubmitRegister.bind(this)}>
                                                        Register
                                                    </Button>
                                                    <GoogleLogin
                                                        clientId="19505045016-o77k6h2qe7ipitsih5bc3kac9o03qb8u.apps.googleusercontent.com"
                                                        render={renderProps => (
                                                            <Button variant="outline-danger" className='float-right'
                                                                    type="submit" onClick={renderProps.onClick}
                                                                    disabled={renderProps.disabled}>Sign with
                                                                Google</Button>
                                                        )}
                                                        buttonText="Login"
                                                        onSuccess={this.sendGoogleAuth.bind(this)}
                                                        onFailure={() => console.log('fail')}
                                                        cookiePolicy={'single_host_origin'}/>
                                                </ButtonToolbar>

                                            </Form>

                                        </Card.Body>
                                    </Card>
                                </Tab>
                            </Tabs>


                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,
    error: state.auth.error,
    errors: state.auth.errors,

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
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
