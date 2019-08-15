export const getAllBooks = (sort) => dispatch => {
    fetch(`http://192.168.1.3:5000/api/books/all/${sort}`)
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
    fetch("http://192.168.1.3:5000/api/books/post/ISBN", {
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
    fetch("http://192.168.1.3:5000/api/books/prePost", {
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

export const saveBook = (url) => dispatch => {
    fetch("http://192.168.1.3:5000/api/books/post/url", {
        method: 'POST',
        body: JSON.stringify({url: url}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    }).then(res => check(res, dispatch, 'URL_POST', 'adding a book by title/author'))
        .catch(e => console.log(e));
};

export const saveCustomBook = (book, file) => dispatch => {
    fetch("http://192.168.1.3:5000/api/books/post/custom", {
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
    fetch(`http://192.168.1.3:5000/api/books/search/${param}/${title}`)
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => check(res, dispatch, 'TITLE_SEARCH', 'searching a book by title'))
        .catch(e => console.log(e));

};

export const reserveBook = (id) => dispatch => {
    fetch(`http://192.168.1.3:5000/api/books/reserve/${id}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => check(res, dispatch, 'RESERVE_BOOK', 'reserving a book'))
        .catch(e => console.log(e));
};
export const returnBook = (id) => dispatch => {
    fetch(`http://192.168.1.3:5000/api/books/return/${id}`,{
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => check(res, dispatch, 'RESERVE_BOOK', 'returning a book'))
        .catch(e => console.log(e));
};

// ---------------------

const sendImage = (file, id) => {
    let form = new FormData();
    form.append("photo", file);
    fetch(`http://192.168.1.3:5000/api/books/post/custom/${id}`, { // Your POST endpoint
        method: 'POST',
        body: form,
    }).then(
        response => response.json()
    ).then(
        success => console.log('success')
    ).catch(
    error => console.log(error)
);
};

const check = (res, dispatch, type, origin) => {
    if (res.status === 400) {
        dispatch({
            type: 'ERR',
            payload: {json: res.json, origin: origin}
        });
    } else {
        dispatch({
            type: type,
            payload: res.json,
        });
    }
};