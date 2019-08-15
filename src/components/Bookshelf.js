import React, {Component} from 'react';
import '../styles/books.css'
import {getAllBooks, reserveBook, returnBook, searchBookByParameter} from "../actionCreators/bookActions";
import {connect} from "react-redux";
import classNames from "classnames";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook} from "@fortawesome/free-solid-svg-icons/faBook";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";
import {faSortAlphaDown} from "@fortawesome/free-solid-svg-icons/faSortAlphaDown";
import {faSortAlphaDownAlt} from "@fortawesome/free-solid-svg-icons/faSortAlphaDownAlt";
import {faMinus} from "@fortawesome/free-solid-svg-icons/faMinus";
import {faCalendarAlt} from "@fortawesome/free-solid-svg-icons/faCalendarAlt";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {faHighlighter} from "@fortawesome/free-solid-svg-icons/faHighlighter";


class Bookshelf extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        bookSearch: "",
        searchParam: 'title',
        open: false,
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.getAllBooks(localStorage.getItem('sort'))
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    bookActions(item) {
        if (item.status === 'available' && this.props.isLogged) {
            return (
                <Collapse in={this.state.open === item.title}>
                    <div id="collapseButtons">
                        <Button onClick={() => {
                            this.props.reserveBook(item._id);
                            this.props.getAllBooks(localStorage.getItem('sort'));
                        }} variant={"outline-light"} size={"sm"}><FontAwesomeIcon
                            icon={faHighlighter}/> Reserve</Button>
                        {this.props.msg}
                    </div>
                </Collapse>)
        } else if (item.status === 'reserved' && item.borrowerId === localStorage.getItem('id')) {
            return (<Collapse in={this.state.open === item.title}>
                <div id="collapseButtons">
                    <Button onClick={() => {
                        this.props.returnBook(item._id);
                        this.props.getAllBooks(localStorage.getItem('sort'));
                    }} variant={"outline-light"} size={"sm"}><FontAwesomeIcon
                        icon={faHighlighter}/> Cancel</Button>
                    {this.props.msg}
                </div>
            </Collapse>)
        }
    }

    books() {
        if (this.props.allBooks.length > 0) {
            return this.props.allBooks.map((item, index) => {
                return (
                    <div className={classNames("bookCard", {notAvailable: item.status !== 'available'})} key={index}>
                        <div className="column">
                            <div className="img"
                                 style={{backgroundImage: `url(http://192.168.1.3:5000/images/${item.ISBN}${item.extension})`}}/>
                            {this.bookActions(item)}
                        </div>

                        <div className="column6" onClick={() => {
                            if (this.state.open !== item.title) {
                                this.setState({open: item.title})
                            } else this.setState({open: false})
                        }}>
                            <span className={"spanTitle"}><b>Title:</b> {item.title}</span>
                            <span className={"item"}><b>Author:</b> {item.author}</span>
                            <span className={"item"}><b>Date published:</b> {item.datePublished}</span>
                            <span className={"item"}><b>Status:</b> {item.status}</span>
                            {this.state.open !== item.title ?
                                <span className={"desc"}><i>Click for description</i></span> :
                                <span className={"desc"}><b>Description:</b></span>}
                            <Collapse in={this.state.open === item.title}>
                                <div id="example-collapse-text">
                                    <span className={"desc"}>{item.desc}</span>
                                </div>
                            </Collapse>
                        </div>
                    </div>
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
                                     value={this.state.bookSearch}
                                     onKeyDown={(e) => {
                                         if (e.key === 'Enter') {
                                             if (this.state.bookSearch !== "") this.props.searchBookByParameter(this.state.bookSearch, this.state.searchParam);
                                             else this.props.getAllBooks(localStorage.getItem('sort'));
                                         }
                                     }}/>
                    </InputGroup>
                    <div className="selectionBar">
                        <div className="radioSelection">
                            <div onClick={() => this.setState({searchParam: 'title'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'title'})}>
                                <FontAwesomeIcon className="radioSearch" icon={faBook} size="lg"/> Title
                            </div>
                            <div onClick={() => this.setState({searchParam: 'author'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'author'})}>
                                <FontAwesomeIcon className="radioSearch" icon={faUser} size="lg"/> Author
                            </div>
                            <div onClick={() => this.setState({searchParam: 'ISBN'})}
                                 className={classNames("radioOption", {" activeR": this.state.searchParam === 'ISBN'})}>
                                <FontAwesomeIcon className="radioSearch" icon={faFingerprint} size="lg"/> ISBN
                            </div>
                        </div>

                        <div className="radioSelection">
                            <div onClick={() => {
                                if (localStorage.getItem('sort') === 'title') {
                                    localStorage.setItem('sort', '-title');
                                } else localStorage.setItem('sort', 'title');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === 'title' || localStorage.getItem('sort') === '-title'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === 'title' ? faSortAlphaDown : localStorage.getItem('sort') === '-title' ? faSortAlphaDownAlt : faMinus}/> By
                                Title
                            </div>
                            <div onClick={() => {
                                if (localStorage.getItem('sort') === 'author') {
                                    localStorage.setItem('sort', '-author');
                                } else localStorage.setItem('sort', 'author');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === 'author' || localStorage.getItem('sort') === '-author'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === 'author' ? faSortAlphaDown : localStorage.getItem('sort') === '-author' ? faSortAlphaDownAlt : faMinus}
                                                 size="lg"/> By Author
                            </div>
                            <div onClick={() => {
                                localStorage.setItem('sort', '-dateAdded');
                                this.props.getAllBooks(localStorage.getItem('sort'))
                            }}
                                 className={classNames("radioOption", {" activeR": localStorage.getItem('sort') === '-dateAdded'})}>
                                <FontAwesomeIcon className="radioSearch"
                                                 icon={localStorage.getItem('sort') === '-dateAdded' ? faCalendarAlt : faMinus}
                                                 size="lg"/> Recent
                            </div>
                        </div>
                    </div>
                </div>
                {this.books()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allBooks: state.books.all,
    errors: state.books.errs,
    isLogged: state.auth.isLogged,
    msg: state.books.msg,
});
const mapDispatchToProps = (dispatch) => ({
    getAllBooks: (sort) => {
        dispatch(getAllBooks(sort))
    },
    searchBookByParameter: (title, type) => {
        dispatch(searchBookByParameter(title, type))
    },
    reserveBook: (id) => {
        dispatch(reserveBook(id));
    },
    returnBook: (id) => {
        dispatch(returnBook(id));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf);

