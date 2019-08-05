const initialState = {
    all: {},
    errs: [],
    ISBNTitle: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_BOOKS':
            return {...state, all: action.payload};
        case 'BOOK_ERR':
            return {...state, errs: action.payload};
        case 'DELETE_BOOK_ERRORS':
            return {...state, errs: []};
        case 'ISBN_PRE_POST':
            return {...state, ISBNTitle: action.payload.title};
        default:
            return state;
    }
}