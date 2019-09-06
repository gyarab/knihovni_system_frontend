import React, {Component} from 'react';
import '../styles/books.css'
import {getAllBooks, searchBookByParameter} from "../actionCreators/bookActions";
import {connect} from "react-redux";
import classNames from "classnames";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {clearBorrowArray, selectToBorrow} from "../actionCreators/internalActions";
import {borrowBooks} from "../actionCreators/adminActions";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Book from "./Book";
import * as debounce from "debounce";


class Bookshelf extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        bookSearch: "",
        searchParam: 'title',
        open: false,
        mail: '',
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.borrow = this.borrow.bind(this);
        this.loadSelectedBooks = this.loadSelectedBooks.bind(this);
        this.search = this.search.bind(this);

        this.search = debounce(this.search, 500);
    }

    borrow() {
        let tempArr = this.props.borrowArr.map(item => item.id);
        let obj = {email: this.state.mail, idArr: tempArr};
        this.props.borrow(obj);
        this.props.clearBorrowArray();
    }

    search() {
        if (this.state.bookSearch !== "") this.props.searchBookByParameter(this.state.bookSearch, this.state.searchParam);
        else this.props.getAllBooks(localStorage.getItem('sort'));
    }


    loadSelectedBooks() {
        return [
            <Badge key='clearAll' size="lg" variant="warning" onClick={() => {
                this.props.clearBorrowArray();
            }}>Clear All</Badge>
            , this.props.borrowArr.map((item, index) => {
                return (
                    <Badge key={index} size="lg" variant="light" onClick={() => {
                        this.props.selectToBorrow([{id: item.id, title: item.title}])
                    }}>{item.title}</Badge>
                )
            })]

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.borrowerEmail !== "" || nextProps.borrowerEmail !== this.state.mail) {
            this.setState({mail: nextProps.borrowerEmail})
        }
    }

    componentDidMount() {
        this.props.getAllBooks(localStorage.getItem('sort'))
    }

    async handleChange(event) {
        let name = event.target.name;
        await this.setState({[name]: event.target.value});
        if (name === 'bookSearch') {
            this.search()
        }
    }


    books() {
        if (this.props.allBooks.length > 0) {
            return this.props.allBooks.map((item, index) => {
                return (
                    <Book item={item} key={index}/>
                )
            })
        }
    }

    render() {
        return (
            <div className="shelfWrapper">
                <div className="searchWrapper">
                    <InputGroup>
                        <FormControl name="bookSearch" placeholder="Search for the book you wish to get!"
                                     onChange={this.handleChange}
                                     value={this.state.bookSearch}/>
                    </InputGroup>

                    {/*Tool Bar*/}
                    <div className="selectionBar">
                        {/*Search by:*/}
                        <div className="radioSelection">
                            <div onClick={() => this.setState({searchParam: 'title'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'title'})}>
                                <FontAwesomeIcon className="radioSearch" icon='book' size="lg"/> Title
                            </div>
                            <div onClick={() => this.setState({searchParam: 'author'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'author'})}>
                                <FontAwesomeIcon className="radioSearch" icon='user' size="lg"/> Author
                            </div>
                            <div onClick={() => this.setState({searchParam: 'ISBN'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'ISBN'})}>
                                <FontAwesomeIcon className="radioSearch" icon='fingerprint' size="lg"/> ISBN
                            </div>
                        </div>
                        {/*Sort by:*/}
                        <div className="radioSelection">
                            <div onClick={() => {
                                if (localStorage.getItem('sort') === 'title') {
                                    localStorage.setItem('sort', '-title');
                                } else localStorage.setItem('sort', 'title');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === 'title' || localStorage.getItem('sort') === '-title'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === 'title' ? 'sort-alpha-down' : localStorage.getItem('sort') === '-title' ? 'sort-alpha-down-alt' : 'minus'}
                                                 size="lg"/> By Title
                            </div>
                            <div onClick={() => {
                                if (localStorage.getItem('sort') === 'author') {
                                    localStorage.setItem('sort', '-author');
                                } else localStorage.setItem('sort', 'author');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === 'author' || localStorage.getItem('sort') === '-author'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === 'author' ? 'sort-alpha-down' : localStorage.getItem('sort') === '-author' ? 'sort-alpha-down-alt' : 'minus'}
                                                 size="lg"/> By Author
                            </div>
                            <div onClick={() => {
                                localStorage.setItem('sort', '-dateAdded');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === '-dateAdded'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === '-dateAdded' ? 'calendar-alt' : 'minus'}
                                                 size="lg"/> Recent
                            </div>
                        </div>
                    </div>
                    {/*Shows borrow button when something's selected*/}
                    <Collapse in={this.props.borrowArr.length > 0}>
                        <div className="bookBorrowWrapper">
                            <h4>Lend books</h4>
                            {this.loadSelectedBooks()}
                            <Form.Control
                                name='mail'
                                onChange={this.handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') this.borrow();
                                }}
                                value={this.state.mail}
                                placeholder="E-mail address of borrower"/>
                            <Button variant="light" block onClick={this.borrow} className="buttonBorrow">
                                Borrow
                            </Button>
                        </div>
                    </Collapse>
                </div>
                {this.books()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allBooks: state.books.all,
    borrowArr: state.internal.borrowArr,
    borrowerEmail: state.internal.email
});
const mapDispatchToProps = (dispatch) => ({
    getAllBooks: (sort) => {
        dispatch(getAllBooks(sort))
    },
    searchBookByParameter: (title, type) => {
        dispatch(searchBookByParameter(title, type))
    },
    selectToBorrow: (arr) => {
        dispatch(selectToBorrow(arr));
    },
    borrow: (obj) => {
        dispatch(borrowBooks(obj));
    },
    clearBorrowArray: () => {
        dispatch(clearBorrowArray())
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf);