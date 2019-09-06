import {uniqBy} from "lodash/array";

const initialState = {
    taken: [],
    users: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TAKEN_BOOKS':
            return {...state, taken: action.payload};
        case 'RETURNED_BOOKS':
            let tempArr = JSON.parse(JSON.stringify(state.taken));
            action.payload.forEach(rBook => {
                tempArr = tempArr.filter(tBook => tBook.id !== rBook.id)
            });
            return {...state, taken: tempArr};
        case 'BORROWED_BOOKS':
            let tArr = state.taken.concat(action.payload);
            tArr = uniqBy(tArr, 'id');
            return {...state, taken: tArr};
        case 'CURRENT_READERS':
            return {...state, users: action.payload};
        default:
            return state;
    }
}
