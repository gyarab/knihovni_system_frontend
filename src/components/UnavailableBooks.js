import React, {Component} from 'react';
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {loadTakenBooks, returnTakenBooks, searchTakenBooks} from "../actionCreators/adminActions";
import {connect} from "react-redux";
import {clearReturnArray, selectToReturn} from "../actionCreators/internalActions";
import * as debounce from "debounce";

class UnavailableBooks extends Component {
    static defaultProps = {};

    static propTypes = {};


    //Default state values as  to not break anything.
    state = {
        type: 'title',
    };

    // We bind all functions here, so they are created only once, not upon every rerender!
    // Sometimes that isn't enough, because we also want to pass it an object. In that case, we create a sub-component.
    constructor(props) {
        super(props);
        this.toggleSelect = this.toggleSelect.bind(this);
        this.return = this.return.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)

        this.search = debounce(this.search, 500);
    }

    //Handles input
    async handleChange(event) {
        await this.setState({[event.target.name]: event.target.value});
        this.search();
    }

    search() {
        if (this.state.search !== "") this.props.searchTakenBooks(this.state.search, this.state.type);
        else this.props.loadTakenBooks();
    }

    //Returns selected books(cancels reservations/ marks books available when the students brings them back)
    return() {
        this.props.returnTakenBooks(this.props.returnArr);
        this.props.clearReturnArray();
    }

    //Mechanism to select the books that are being returned
    toggleSelect(book) {
        this.props.selectToReturn([{id: book.id, title: book.title}])
    }

    //Renders a lsit of all unavailable books. There is a sub-component in use here, as to not load functions like toggleSelect() each time the component rerenders, multiplied by the amount of books being rendered.
    unavailableBooks() {
        if (this.props.takenBooks.length > 0) {
            return this.props.takenBooks.map((book, index) => {
                //We pass all the necessary objects and functions as props.
                return (
                    <Book book={book} key={index} toggleSelect={this.toggleSelect} returnArr={this.props.returnArr}/>)
            })
        } else return <b style={{color: 'white'}}>Currently no books are taken</b>
    }

    render() {
        return (
            <div>
                {/*This Form.Group renders the search bar for borrowed books*/}
                <Form.Group className="takenBooks">
                    {/*Search input*/}
                    <Form.Control
                        className="borrowerInput"
                        name="search"
                        placeholder={`Search for unavailable books by ${this.state.type}`}
                        onChange={this.handleChange}
                        value={this.state.search}
                    />

                    {/*Renders a bar below the search input allowing to change between searching by title, author or ISBN*/}
                    <div className="takenSearchTypes">
                        <div onClick={() => this.setState({type: 'title'})}
                             className={classNames("searchOption", {" activeR": this.state.type === 'title'})}>
                            <FontAwesomeIcon className="radioSearch" icon='book' size="lg"/> Title
                        </div>
                        <div onClick={() => this.setState({type: 'author'})}
                             className={classNames("searchOption", {" activeR": this.state.type === 'author'})}>
                            <FontAwesomeIcon className="radioSearch" icon='user' size="lg"/> Author
                        </div>
                        <div onClick={() => this.setState({type: 'ISBN'})}
                             className={classNames("searchOption", {" activeR": this.state.type === 'ISBN'})}>
                            <FontAwesomeIcon className="radioSearch" icon='fingerprint' size="lg"/> ISBN
                        </div>
                    </div>
                </Form.Group>

                {/*Shows return button only when there are selected books*/}
                <Collapse in={this.props.returnArr.length > 0}>
                    <div>
                        <Button block onClick={this.return} className="buttonReturn">
                            Return
                        </Button>
                    </div>
                </Collapse>

                {/*Displays all unavailable books*/}
                {this.unavailableBooks()}</div>
        );
    }
}

//Sub components handling selecting books. It is needed for optimization purposes - thanks to it we create toggleSelect() only once.
class Book extends Component {
    handleClick = () => {
        this.props.toggleSelect(this.props.book);
    };

    render() {
        let {book: {status, id, title, borrower}, returnArr} = this.props;
        let selected = false;
        for (let i of returnArr) {
            if (i.id === id) selected = true;
        }
        return (
            <div onClick={this.handleClick} className={classNames("takenItem", {
                [status]: true,
                selected: selected,
            })}>
                <span className="takenTitle"><b>Title: </b> {title}</span>
                <span className="takenInfo"><b>Status: </b> {status}</span>
                <span className="takenInfo"><b>By:</b> {borrower}</span>
            </div>)
    }
}


const mapDispatchToProps = (dispatch) => ({
    loadTakenBooks: () => {
        dispatch(loadTakenBooks())
    },
    selectToReturn: (arr) => {
        dispatch(selectToReturn(arr))
    },
    searchTakenBooks: (type, phrase) => {
        dispatch(searchTakenBooks(type, phrase))
    },
    returnTakenBooks: (arr) => {
        dispatch(returnTakenBooks(arr))
    },
    clearReturnArray: () => {
        dispatch(clearReturnArray())
    },
});

const mapStateToProps = state => ({
    takenBooks: state.admin.taken,
    returnArr: state.internal.returnArr,
});

export default connect(mapStateToProps, mapDispatchToProps)(UnavailableBooks);

