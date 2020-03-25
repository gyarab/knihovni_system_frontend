import {check} from "./internalActions";
import {myConfig} from "../config";

let {url} = myConfig;

export const getAllBooks = (sort) => dispatch => {
    fetch(`${url}/api/books/all/${sort}`)
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        })
        .then(res =>
            check(res, dispatch, 'ALL_BOOKS', 'fetching books')
        ).catch(e =>
        console.log(e)
    )
};

export const createBookByISBN = (ISBN) => dispatch => {
    fetch(`${url}/api/books/post/ISBN`, {
        method: 'POST',
        body: JSON.stringify({ISBN: ISBN}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => check(res, dispatch, 'ISBN_POST', 'adding a book by ISBN'))
        .catch(e => console.log(e));

};

export const saveBookByTitle = (title, index) => dispatch => {
    fetch(`${url}/api/books/prePost`, {
        method: 'POST',
        body: JSON.stringify({title, index: index || 5}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => check(res, dispatch, 'TITLE_PRE_POST', 'adding a book by title'))
        .catch(e => console.log(e));

};

export const saveBook = (bookUrl) => dispatch => {
    fetch(`${url}/api/books/post/url`, {
        method: 'POST',
        body: JSON.stringify({url: bookUrl}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => check(res, dispatch, 'URL_POST', 'adding a book by title/author'))
        .catch(e => console.log(e));
};

export const saveCustomBook = (book, file) => dispatch => {
    fetch(`${url}/api/books/post/custom`, {
        method: 'POST',
        body: JSON.stringify(book),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => {
        if (file.name !== 'Choose a file!') sendImage(file, res.json.id);
        check(res, dispatch, 'CUSTOM_POST', 'adding a custom book');

    })
        .catch(e => console.log(e));
};

export const searchBookByParameter = (title, param) => dispatch => {
    fetch(`${url}/api/books/search/${param}/${title}`)
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => check(res, dispatch, 'TITLE_SEARCH', 'searching a book by title'))
        .catch(e => console.log(e));

};

export const reserveBook = (id) => dispatch => {
    fetch(`${url}/api/books/reserve/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => {
        check(res, dispatch, 'RESERVE_BOOK', 'reserving a book');
        dispatch({
            type: 'BORROWED_BOOKS',
            payload: [res.json],
        })
    }).catch(e => console.log(e));
};

export const getAllGenres = () => dispatch => {
    // fetch(`${url}/api/books/genres`)
    fetch(`${url}/api/books/genres`)
        .then(res => res.json())
        .then(response => {
            dispatch({
                type:'LOAD_GENRES',
                payload: response
            })
        })
};

export const getAllBooksByGenre = (genre) => dispatch => {
    fetch(`${url}/api/books/genre`,{
        method: 'POST',
        body: JSON.stringify({genre}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            dispatch({
                type:'GENRE_BOOK',
                payload: {arr: response,genre}
            })
        })
};

export const searchThroughGenres = (genre) => dispatch => {
    fetch(`${url}/api/books/genres/search`,{
        method: 'POST',
        body: JSON.stringify({genre}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type:'LOAD_GENRES',
                payload: response
            })
        })
};


// ---------------------

const sendImage = (file, id) => {
    let form = new FormData();
    form.append("photo", file);
    fetch(`${url}/api/books/post/custom/${id}`, { // Your PUT endpoint
        method: 'PUT',
        body: form,
    }).then(
        response => response.json()
    ).then(
        success => console.log('success')
    ).catch(
        error => console.log(error)
    );
};

