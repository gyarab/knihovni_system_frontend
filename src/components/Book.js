import React, {Component} from 'react';
import classNames from "classnames";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getAllBooks, reserveBook, searchBookByParameter} from "../actionCreators/bookActions";
import {returnTakenBooks} from "../actionCreators/adminActions";
import {selectToBorrow} from "../actionCreators/internalActions";
import {connect} from "react-redux";
import '../styles/singleBook.css'
import {myConfig} from "../config";

let {url} = myConfig;

class Book extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    //Bindings are done in the constructor so the app doesn't create the function every time it renders, but just on mount.
    constructor(props) {
        super(props);
        this.teacherActions = this.teacherActions.bind(this);
        this.reserve = this.reserve.bind(this);
        this.cancel = this.cancel.bind(this);
        this.select = this.select.bind(this);
        this.showDescription = this.showDescription.bind(this);
    }

    // Select mechanism.
    select(e) {
        let {id, title} = JSON.parse(e.currentTarget.value);
        this.props.selectToBorrow([{id, title}])
    }

    //Show more options if the user has permissions
    teacherActions(item) {
        if (this.props.isLogged && localStorage.getItem('roles').includes('teacher') && (item.status === 'available' || item.status === 'reserved')) {
            return (
                //For some reason I can't pass a value that's an object. Needs to be a string.
                // I stringify it here and then parse in the function that's called onClick.
                <Button onClick={this.select} value={JSON.stringify(item)}
                        variant="outline-warning" size={"sm"} className="brwBtn">
                    <FontAwesomeIcon icon='plus'/>
                </Button>);
        } else return ""
    }

    //Reserve a book
    reserve(e) {
        this.props.reserveBook(e.currentTarget.value);
    }

    //Cancel reservation
    cancel(e) {
        this.props.returnBook(e.currentTarget.value);
    }

    // Expands the bookCard on click, showing books' description and reservation options
    showDescription(id) {
        if (this.state.open !== id) {
            this.setState({open: id})
        } else this.setState({open: false})
    }

    // Renders reservation or cancellation options.
    bookActions(item) {
        if (item.status === 'available' && this.props.isLogged) {
            return (
                <Collapse in={this.state.open === item.id}>
                    <div id="collapseButtons">
                        <Button value={item.id} onClick={this.reserve} variant="outline-success" size={"sm"}>
                            <FontAwesomeIcon icon='highlighter'/> Reserve
                        </Button>
                    </div>
                </Collapse>)
        } else if (item.status === 'reserved' && item.borrowerId === localStorage.getItem('id')) {
            return (

                <Collapse in={this.state.open === item.id}>
                    <div id="collapseButtons">
                        <Button value={item.id} onClick={this.cancel} variant={"outline-light"} size={"sm"}>
                            <FontAwesomeIcon icon='highlighter'/> Cancel</Button>
                    </div>

                </Collapse>)
        }
    }

    render() {
        let {item, item: {status, title, id, image_link}} = this.props;
        return (
            <div className={classNames("bookCard", {
                [status]: true,
                selected: this.props.borrowArr.find(x => x.id === id)
            })}>
                {/*Book cover*/}
                <div className="column">
                    <div className="img"
                         style={{backgroundImage: `url(${image_link})`}}/>
                    {this.bookActions(item)}
                </div>
                {/*Book info*/}
                <div className="column6">
                    <span className={"spanTitle"}><b>{title}</b> {this.teacherActions(item)}</span>
                    {/*This is a sub-component with the purpose of optimization - we pass an object to a function without creating it every render.*/}
                    <Info showDescription={this.showDescription} state={this.state} item={item}/>
                </div>
            </div>
        );
    }
}

class Info extends Component {
    handleClick = () => {
        this.props.showDescription(this.props.item.id);
    };

    render() {
        let {item: {author, id, datePublished, status, desc}, state} = this.props;
        return (
            <div className="pointer" onClick={this.handleClick}>
                <span className={"item"}><b>Author:</b> {author}</span>
                <span className={"item"}><b>Date published:</b> {datePublished}</span>
                <span className={"item"}><b>Status:</b> {status}</span>

                {state.open !== id ?
                    <span className={"desc"}><i>Click for description</i></span> :
                    <span className={"desc"}><b>Description:</b></span>}

                <Collapse in={state.open === id}>
                    <div id="example-collapse-text">
                        <span className={"desc"}>{desc}</span>
                    </div>
                </Collapse>
            </div>)
    }
}

const mapStateToProps = state => ({
    isLogged: state.auth.isLogged,
    borrowArr: state.internal.borrowArr
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
        dispatch(returnTakenBooks([{id}]));
    },
    selectToBorrow: (arr) => {
        dispatch(selectToBorrow(arr));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Book);
