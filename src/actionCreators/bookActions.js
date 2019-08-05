export const getAllBooks = () => dispatch => {
    fetch(`http://localhost:5000/api/books`)
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
    fetch("http://localhost:5000/api/books/ISBN", {
        method: 'POST',
        body: JSON.stringify({"ISBN": ISBN}),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
    }).then(async response => {
        let json = await response.json();
        return {json: json, status: response.status}
    })
        .then(res => check(res, dispatch, 'ISBN_PRE_POST', 'adding a book'))
        .catch(e => console.log(e));

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