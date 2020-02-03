import React, {Component} from 'react';
import '../styles/dashboard.css'
import {connect} from "react-redux";
import {borrowBooks, loadTakenBooks, returnTakenBooks, searchTakenBooks} from "../actionCreators/adminActions";
import {changeDashboardType, clearBorrowArray, selectToBorrow} from "../actionCreators/internalActions";
import Bookshelf from "./Bookshelf";
import UnavailableBooks from "./UnavailableBooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Borrowers from "./Borrowers";
import Genres from "./Genres";


class Dashboard extends Component {
    static defaultProps = {};

    static propTypes = {};

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.borrow = this.borrow.bind(this);
        this.switch = this.switch.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillMount() {
        if(this.props.isLogged && JSON.parse(localStorage.getItem("roles")).includes('teacher'))
        this.props.loadTakenBooks()
    }

    state = {
        mail: '',
        search: '',
        type: 'title',
        selected: [],
    };

    async switch() {
        this.props.changeDashboardType();
    }

    genres() {
        return (<div className="genreList right"><Genres/></div>)
    }


    borrow() {
        let tempArr = this.props.borrowArr.map(item => item.id);
        let obj = {email: this.state.mail, idArr: tempArr};
        this.props.borrow(obj);
    }

    unavailableBooks() {
        let btn = '';
        let board = '';
        if (this.props.isLogged && JSON.parse(localStorage.getItem("roles")).includes('teacher')) {
            if (this.props.dashboardType === 'users') {
                btn = <h6><FontAwesomeIcon icon='book'/> Books</h6>;
                board = <Borrowers/>
            } else {
                btn = <h6><FontAwesomeIcon icon='address-card'/> Users</h6>;
                board = <UnavailableBooks/>;
            }
            return (
                <div className="takenList left">
                    <div>
                        <div onClick={this.switch} className="switch">
                            {btn}
                        </div>
                        <div className="divider"/>
                    </div>
                    {board}
                </div>)
        }
    }

    render() {
        return (
            <div className="adminWrapper">
                <div className='dashRow'>
                    {/*Left Column*/}
                    {this.unavailableBooks()}

                    {/*Admin's Dashboard*/}
                    <div className="dashboard">
                        <Bookshelf/>

                    </div>

                    {/*Right column*/}
                    {this.genres()}
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadTakenBooks: () => {
        dispatch(loadTakenBooks())
    },
    searchTakenBooks: (type, phrase) => {
        dispatch(searchTakenBooks(type, phrase))
    },
    returnTakenBooks: (arr) => {
        dispatch(returnTakenBooks(arr))
    },
    selectToBorrow: (obj) => {
        dispatch(selectToBorrow([obj]));
    },
    borrow: (obj) => {
        dispatch(borrowBooks(obj));
    },
    clearBorrowArray: () => {
        dispatch(clearBorrowArray());
    },
    changeDashboardType: () => {
        dispatch(changeDashboardType())
    }
});

const mapStateToProps = state => ({
    takenBooks: state.admin.taken,
    borrowArr: state.internal.borrowArr,
    isLogged: state.auth.isLogged,
    dashboardType: state.internal.dashboardType,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
