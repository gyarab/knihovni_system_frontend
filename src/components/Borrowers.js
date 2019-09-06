import React, {Component} from 'react';
import {connect} from "react-redux";
import {currentReaders, returnTakenBooks} from "../actionCreators/adminActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    changeDashboardType,
    clearBorrowArray,
    selectToBorrow,
    selectToReturn,
    updateEmailOnSelect
} from "../actionCreators/internalActions";

class Borrowers extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        statusType: 'Reserved',
        rotation: 0
    };

    componentDidMount() {
        this.props.currentReaders(this.state.statusType)
    }

    constructor(props) {
        super(props);
        this.switch = this.switch.bind(this);
    }


    async switch() {
        if (this.state.statusType === 'Borrowed') {
            await this.setState({statusType: 'Reserved'})
        } else await this.setState({statusType: 'Borrowed'});
        this.props.currentReaders(this.state.statusType);
        if (this.state.rotation === 180)
            this.setState({rotation: 0});
        else this.setState({rotation: 180});
    }

    readers() {
        return this.props.users.map((user, i) => {
            return (
                <div className="reader" key={i}>
                    <img alt='avatar' height={96} width={96} src={user.pic}/>
                    <BookList select={this.props.selectToBorrow}
                              return={this.props.selectToReturn} user={user}
                              clearBorrowArray={this.props.clearBorrowArray}
                              statusType={this.state.statusType}
                              emailOnSelect={this.props.updateEmailOnSelect}
                              arr={user[this.state.statusType.toLowerCase()]}
                              borrowerEmail={this.props.borrowerEmail}
                              changeDashboardType={this.props.changeDashboardType}/>
                </div>
            )
        })

    }

    render() {
        return (
            <div>
                <div onClick={this.switch} className="statusType">
                    <FontAwesomeIcon rotation={this.state.rotation} icon='adjust'/> {this.state.statusType}
                </div>
                <div className='readerWrapper'>{this.readers()}</div>
            </div>
        );
    }
}

class BookList extends Component {
    handleClick = () => {
        if (this.props.statusType === 'Borrowed') {
            this.props.return(this.props.arr);
            this.props.changeDashboardType();
        } else {
            if (this.props.borrowerEmail !== this.props.user.email) {
                this.props.clearBorrowArray();
            }
            this.props.select(this.props.arr);
            this.props.emailOnSelect(this.props.user.email);

        }
    };

    render() {
        return (
            <div onClick={this.handleClick} className="name">
                <span className='readerName'>{this.props.user.name}</span>
            </div>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    currentReaders: (type) => {
        let temp = type.toLowerCase();
        dispatch(currentReaders(temp))
    },
    selectToBorrow: (arr) => {
        dispatch(selectToBorrow(arr));
    },
    selectToReturn: (arr) => {
        dispatch(selectToReturn(arr));
    },
    returnTakenBooks: (arr) => {
        dispatch(returnTakenBooks(arr))
    },
    updateEmailOnSelect: (email) => {
        dispatch(updateEmailOnSelect(email));
    },
    clearBorrowArray: () => {
        dispatch(clearBorrowArray())
    },
    changeDashboardType: () => {
        dispatch(changeDashboardType())
    }
});

const mapStateToProps = state => ({
    users: state.admin.users,
    borrowerEmail: state.internal.email
});

export default connect(mapStateToProps, mapDispatchToProps)(Borrowers);
