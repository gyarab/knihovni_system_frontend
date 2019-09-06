const initialState = {
    all: {},
    errs: [],
    ISBNTitle: '',
    UrlTitle: '',
    CustomTitle: '',
    preBooks: [],
    books: [],
    msg: '',
    genres: [],
    genre: 'All',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_BOOKS':
            return {...state, all: action.payload, genre: 'All'};

        case 'ISBN_POST':
            return {...state, ISBNTitle: action.payload.title};

        case 'URL_POST':
            return {...state, UrlTitle: action.payload.title};

        case 'CUSTOM_POST':
            return {...state, CustomTitle: action.payload.title};

        case 'TITLE_PRE_POST':
            return {...state, preBooks: action.payload};

        case 'TITLE_SEARCH':
            return {...state, all: action.payload};

        case 'RESERVE_BOOK':
            let arr = JSON.parse(JSON.stringify(state.all));
            for (let book in arr) {
                if (arr[book]._id === action.payload._id) {
                    arr[book] = action.payload;
                }
            }
            return {...state, all: arr};

        case 'CHANGE_BOOK_STATUS':
            let arr2 = JSON.parse(JSON.stringify(state.all));
            for (let book of action.payload) {
                arr2 = arr2.map(data => {
                    if (data.id === book.id) return book;
                    else return data;
                })
            }
            return {...state, all: arr2};

        case 'LOAD_GENRES':
            return {...state, genres: action.payload};

        case 'GENRE_BOOK':
            return {...state, genre: action.payload.genre, all: action.payload.arr};

        default:
            return state;
    }
}