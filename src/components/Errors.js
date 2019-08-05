import React, {Component} from 'react';
import '../styles/errors.css'
import Toast from "react-bootstrap/Toast";
import {connect} from "react-redux";
import {deleteErrors} from "../actionCreators/internalActions";

class Errors extends Component {
    static defaultProps = {};

    static propTypes = {};


    errors() {
        let errors = "";
        if (this.props.errors.length > 0) {
            errors = this.props.errors.map((item, index) => (

                <Toast key={index} onClick={() => this.props.deleteErrors()} onClose={() => this.props.deleteErrors()} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Error</strong>
                        <small>While {item.origin}</small>
                    </Toast.Header>
                    <Toast.Body>{item.msg}</Toast.Body>
                </Toast>));
        }
        return errors;
    }

    render() {


        return (
            <div className="errorsHolder">
                {this.errors()}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    errors: state.internal.errs,
});
const mapDispatchToProps = (dispatch) => ({
    deleteErrors: () => {
        dispatch(deleteErrors())
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(Errors);
