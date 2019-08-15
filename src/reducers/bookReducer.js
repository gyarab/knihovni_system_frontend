const initialState = {
    all: {},
    errs: [],
    ISBNTitle: '',
    UrlTitle: '',
    CustomTitle: '',
    preBooks: [],
    books: [],
    msg:'',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_BOOKS':
            return {...state, all: action.payload};
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
            return {...state, msg: action.payload[0].msg};

        default:
            return state;
    }
}