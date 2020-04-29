import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUser} from "../actionCreators/authActions";
import '../styles/profile.css'
import {toggleProfilePopup} from "../actionCreators/internalActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

class Profile extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    componentDidMount() {
        this.props.getUser();
    }

    borrowed() {

        if (this.props.user.borrowed && this.props.user.borrowed.length > 0) {
            return this.props.user.borrowed.map((item, index) => {
                return <li key={index}>{item.title}</li>
            });
        } else {
            return (<p>Žadné knihy</p>)
        }
    }

    reserved() {
        if (this.props.user.reserved && this.props.user.reserved.length > 0) {
            return this.props.user.reserved.map((item, index) => {
                return <li key={index}>{item.title}</li>
            });
        } else {
            return (<p>Žadné knihy</p>)
        }
    }

    name() {
        if (this.props.user) {
            return (<span>{localStorage.getItem("name")}</span>)
        }
    }

    render() {
        return (
            <div className="profileContainer">
                <div className="bgProfile">
                    <div className="imgContainer">
                        <img alt="Profile pic" src={this.props.user.pic}/>
                        <h4>{this.name()}</h4>
                    </div>
                    <div>
                        <b>Borrowed</b>
                        <ul>
                            {this.borrowed()}
                        </ul>

                        <b>Reserved</b>
                        <ul>
                            {this.reserved()}
                        </ul>
                    </div>
                    <div className="btnGrp">
                        <Button variant={"outline-danger"} onClick={() => this.props.toggleProfilePopup()}>
                            <FontAwesomeIcon icon="times-circle"/> Close
                        </Button>
                        <Button variant={"outline-info"} onClick={() => this.props.getUser()}>
                            <FontAwesomeIcon icon="sync"/>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser())
    },
    toggleProfilePopup: () => {
        dispatch(toggleProfilePopup())
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

