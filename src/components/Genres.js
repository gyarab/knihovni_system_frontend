import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllBooks, getAllBooksByGenre, getAllGenres, searchThroughGenres} from "../actionCreators/bookActions";
import '../styles/genres.css'
import Form from "react-bootstrap/Form";
import * as debounce from "debounce";
import ListGroup from "react-bootstrap/ListGroup";

class Genres extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {
        search: ""
    };

    componentDidMount() {
        this.props.getAllGenres();
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);

        this.search = debounce(this.search, 500);
    }

    search() {
        this.props.searchThroughGenres(this.state.search);
    }

    async handleChange(event) {
        await this.setState({[event.target.name]: event.target.value});
        this.search();
    }


    genres() {
        return this.props.genres.map((genre, index) => {
            return (<GenreItem variant="warning" selectedGenre={this.props.genre} getAllBooksByGenre={this.props.getAllBooksByGenre}
                               getAllBooks={this.props.getAllBooks}
                               key={index} genre={genre}/>)
        })
    }

    render(){
        return (
            <div>
                <h4>{this.props.genre === 'All' ? 'Všechny Knihy' : this.props.genre}</h4>
                <Form.Control
                    autoFocus
                    className="genreSearch"
                    name="search"
                    placeholder={`Search through genres`}
                    onChange={this.handleChange}
                    value={this.state.search}
                />
                <ListGroup variant="flush"> {this.genres()}</ListGroup>
            </div>
        );
    }
}

class GenreItem extends Component {
    handleClick = () => {
        if (this.props.genre.name !== this.props.selectedGenre)
            this.props.getAllBooksByGenre(this.props.genre.name);
        else this.props.getAllBooks()
    };

    render() {
        let {genre, selectedGenre} = this.props;
        return (
            <ListGroup.Item action active={genre.name === selectedGenre} onClick={this.handleClick}>
                {genre.name} ({genre.amount})
            </ListGroup.Item>)
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllGenres: () => {
        dispatch(getAllGenres())
    },
    getAllBooksByGenre: (genre) => {
        dispatch(getAllBooksByGenre(genre))
    },
    getAllBooks: (sort) => {
        dispatch(getAllBooks(sort))
    },
    searchThroughGenres: (param) => {
        dispatch(searchThroughGenres(param))
    }
});

const mapStateToProps = state => ({
    genres: state.books.genres,
    genre: state.books.genre,
});

export default connect(mapStateToProps, mapDispatchToProps)(Genres);
