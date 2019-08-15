import React, {Component} from 'react';
import {connect} from "react-redux";
import {createBookByISBN, saveBook, saveCustomBook, saveBookByTitle} from "../actionCreators/bookActions";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup";
import '../styles/addbooks.css';
import classNames from "classnames";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";


// import PropTypes from 'prop-types';

class AddBook extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        ISBN: "",
        titleSearch: "",
        num: 0,
        title: "",
        author: "",
        year: "",
        pageC: "",
        genre: "",
        genreArr: [],
        desc: "",
        image: {name: "Choose a file!"},
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.saveCustomBook = this.saveCustomBook.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleImage(event) {
        this.setState({image: event.target.files[0]})
    }

    saveCustomBook() {
        let {title, author, desc, year, pageC, genreArr, ISBN} = this.state;
        let book = {title, author, desc, genres: genreArr, datePublished: year, numberOfPages: pageC, ISBN};
        this.props.saveCustomBook(book, this.state.image);
    }

    handleGenres() {
        this.setState({
            genre: "",
            genreArr: [...new Set(this.state.genreArr.concat(this.state.genre))]
        });
    }

    loadGenres() {
        return this.state.genreArr.map((item, index) => <Badge key={index} variant="danger" onClick={() => {
            this.setState({
                genreArr: [...new Set(this.state.genreArr.filter(genre => {
                    return genre !== item
                }))]
            });
        }}>{item}</Badge>)
    }

    loadPreBooks() {
        if (this.props.preBooks.length > 0) {
            return this.props.preBooks.map((element, index) => {
                return (
                    <div onClick={() => {
                        this.props.saveBook(element.url);
                    }} key={index} className={classNames('col-2 preWrap', {'offset-1': index % 4 !== 0})}>
                        <img alt={element.title} src={element.image}/>
                        <span>{element.title}</span>
                    </div>
                )
            })
        }
    }

    loader() {
        let result = '';
        switch (this.props.location.hash) {
            case'#ISBN':
                result = (
                    <div>
                        <h3>{this.props.ISBNTitle ? `${this.props.ISBNTitle} added.` : ""} </h3>
                        <InputGroup>
                            <FormControl name="ISBN" placeholder="e.g. 80-7214-380-8"
                                         onChange={this.handleChange}
                                         value={this.state.ISBN}
                                         onKeyDown={(e) => {
                                             if (e.key === 'Enter') {
                                                 this.props.createByISBN(this.state.ISBN);
                                             }
                                         }}/>
                        </InputGroup>
                        <Button className="col-lg-4 offset-lg-4" variant="outline-success"
                                onClick={() => {
                                    this.props.createByISBN(this.state.ISBN);
                                    this.setState({ISBN: ""})
                                }}>
                            Send
                        </Button>
                    </div>);
                break;
            case'#title':
                result = (
                    <div>
                        <h3>{this.props.UrlTitle ? `${this.props.UrlTitle} added.` : ""} </h3>
                        <InputGroup>
                            <FormControl name="titleSearch" placeholder="e.g. 451"
                                         onChange={this.handleChange}
                                         value={this.state.titleSearch}
                                         onKeyDown={(e) => {
                                             if (e.key === 'Enter') {
                                                 this.props.searchBookByTitle(this.state.titleSearch);
                                             }
                                         }}/>
                        </InputGroup>
                        <SplitButton id="splitButton1" className="col-2 offset-5"
                                     title="Search"
                                     variant="outline-warning"
                                     onClick={() => {
                                         this.props.searchBookByTitle(this.state.titleSearch, localStorage.getItem('num'));
                                         // this.setState({titleSearch: ""})
                                     }}>
                            <Dropdown.Header>Amount of results</Dropdown.Header>
                            <Dropdown.Item eventKey="1"
                                           onClick={() => {
                                               localStorage.setItem('num', '4');
                                               this.setState({num: 4});
                                           }}
                                           active={localStorage.getItem('num') === '4' || this.state.num === 4}>
                                First four
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2"
                                           onClick={() => {
                                               localStorage.setItem('num', '8');
                                               this.setState({num: 8});
                                           }}
                                           active={localStorage.getItem('num') === '8' || this.state.num === 8}>
                                First eight
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="3"
                                           onClick={() => {
                                               this.setState({num: 12});
                                               localStorage.setItem('num', '12')
                                           }}
                                           active={localStorage.getItem('num') === '12' || this.state.num === 12}>
                                First twelve
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item eventKey="4"
                                           onClick={() => {
                                               this.setState({num: -1});
                                               localStorage.setItem('num', '-1')
                                           }}
                                           active={localStorage.getItem('num') === '-1' || this.state.num === -1}>
                                All
                            </Dropdown.Item>
                        </SplitButton>
                        <div className="row bookWrapper">
                            {this.loadPreBooks()}
                        </div>
                    </div>
                );
                break;
            case'#custom':
                result = (
                    <div>
                        <h2>{this.props.CustomTitle ? `${this.props.CustomTitle} added.` : "Custom Book"} </h2>
                        <Form>
                            <Row>

                                {/*Vital Info*/}
                                <Col>
                                    {/*Title*/}
                                    <Form.Group controlId="Title">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control name="title" onChange={this.handleChange}
                                                      value={this.state.title} type="text"/>
                                    </Form.Group>

                                    {/*Author*/}
                                    <Form.Group controlId="Author">
                                        <Form.Label>Author:</Form.Label>
                                        <Form.Control name="author" onChange={this.handleChange}
                                                      value={this.state.author} type="text"/>
                                    </Form.Group>

                                </Col>

                                {/*Numbers*/}
                                <Col>
                                    {/*Year Published*/}
                                    <Form.Group controlId="Year">
                                        <Form.Label>Year Published:</Form.Label>
                                        <Form.Control name="year" onChange={this.handleChange}
                                                      value={this.state.year} type="number"/>
                                    </Form.Group>

                                    {/*Page Count*/}
                                    <Form.Group controlId="pageC">
                                        <Form.Label>Page count:</Form.Label>
                                        <Form.Control name="pageC" onChange={this.handleChange}
                                                      value={this.state.pageC} type="number"/>
                                    </Form.Group>
                                </Col>

                            </Row>

                            {/*Additional Info*/}
                            <Row>
                                {/*ISBN*/}
                                <Col>
                                    <Form.Group controlId="ISBN">
                                        <Form.Label>ISBN:</Form.Label>
                                        <Form.Control name="ISBN" onChange={this.handleChange}
                                                      value={this.state.ISBN}
                                                      placeholder="Leave empty in case it's unknown" type="text"/>
                                    </Form.Group>
                                </Col>

                                {/*Genres*/}
                                <Col>
                                    <Form.Group controlId="Genres">
                                        <Form.Label>Genres:</Form.Label>
                                        <Form.Control name="genre"
                                                      onChange={this.handleChange}
                                                      onKeyDown={(e) => {
                                                          if (e.key === 'Enter')
                                                              this.handleGenres();
                                                      }}
                                                      value={this.state.genre}
                                                      type="text"
                                        />
                                    </Form.Group>
                                    {this.loadGenres()}
                                </Col>
                            </Row>

                            <Form.Group controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control name="desc" onChange={this.handleChange}
                                              value={this.state.desc} as="textarea" rows="3"/>
                            </Form.Group>

                            <input type="file"
                                   id="image" name="image"
                                   onChange={this.handleImage}
                                   accept="image/png, image/jpeg"/>
                            <Button variant="outline-danger" as="label" htmlFor="image">{this.state.image.name}</Button>
                        </Form>
                        <Button variant="outline-danger" onClick={this.saveCustomBook} size="lg" block>
                            Create book and save
                        </Button>
                    </div>
                );
                break;
            default:
                result = 'Suck my duck';
                break;
        }
        return result;
    }

    render() {
        return (
            <div className={classNames({'wrapper': true, 'err': this.props.errors.length > 0})}>

                <div className={classNames("col-lg-6 form", {[this.props.location.hash.substring(1)]: true})}>
                    {/*<button onClick={()=>{console.log(this.state.image)}} >Debug</button>*/}
                    {this.loader()}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createByISBN: (ISBN) => {
        dispatch(createBookByISBN(ISBN))
    },
    saveBook: (url) => {
        dispatch(saveBook(url))
    },
    searchBookByTitle: (title, index) => {
        dispatch(saveBookByTitle(title, index))
    },
    saveCustomBook: (book, file) => {
        dispatch(saveCustomBook(book, file))
    },
});

const mapStateToProps = state => ({
    ISBNTitle: state.books.ISBNTitle,
    UrlTitle: state.books.UrlTitle,
    CustomTitle: state.books.CustomTitle,
    errors: state.internal.errs,
    preBooks: state.books.preBooks,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
