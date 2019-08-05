import React, {Component} from 'react';
import {connect} from "react-redux";
import {createBookByISBN} from "../actionCreators/bookActions";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup";
import '../styles/addbooks.css';
import classNames from "classnames";

// import PropTypes from 'prop-types';

class AddBook extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        ISBN: "",
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    loader() {
        let result = '';
        switch (this.props.location.hash) {
            case'#ISBN':
                result = (
                    <div>
                        <h3>{this.props.ISBNTitle ? `${this.props.ISBNTitle} added.` : ""} </h3>
                        {/*<img src="http://192.168.1.3:5000/images/80-7214-380-8.png"/>*/}
                        <InputGroup>
                            <FormControl name="ISBN" placeholder="e.g. 80-7214-380-8"
                                         onChange={this.handleChange.bind(this)} value={this.state.ISBN}/>
                        </InputGroup>
                    </div>);
                break;
            case'#title':
                result = 'title';
                break;
            case'#custom':
                result = 'custom';
                break;
            default:
                result = 'Suck my duck';
                break;
        }
        return result;
    }

    render() {
        return (
            <div className={classNames({'wrapper': true,'err':this.props.errors.length>0})}>

                <div className="col-lg-6 form">

                    {this.loader()}
                    <Button className="col-lg-4 offset-lg-4" variant="outline-light"
                            onClick={() => {
                                this.props.createByISBN(this.state.ISBN);
                                // this.setState({ISBN:""})
                            }}>
                        Send
                    </Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({

    createByISBN: (ISBN) => {
        dispatch(createBookByISBN(ISBN))
    },

});
const mapStateToProps = state => ({
    ISBNTitle: state.books.ISBNTitle,
    errors: state.internal.errs,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
