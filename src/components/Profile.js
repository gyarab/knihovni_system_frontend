import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUser} from "../actionCreators/authActions";

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
        }
        else{
            return(<p>Nni nic</p>)
        }
    }

    reserved() {
        if (this.props.user.reserved && this.props.user.reserved.length > 0) {
            return this.props.user.reserved.map((item, index) => {
                return <li key={index}>{item.title}</li>
            });
        }
        else{
            return(<p>Nni nic</p>)
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    console.log(this.props.user.reserved);
                }}>Click Me
                </button>
                <img alt="Profile pic" src={this.props.user.pic}/>
                <h2>Borrowed</h2>
                <ul>
                    {this.borrowed()}
                </ul>

                <h2>Reserved</h2>
                <ul>
                    {this.reserved()}
                </ul>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser())
    },
});

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

