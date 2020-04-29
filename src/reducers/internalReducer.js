const initialState = {
    errs: [],
    borrowArr: [],
    email: "",
    returnArr: [],
    dashboardType: 'books',
    profile_shown: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERR':
            let errors = action.payload.json.map(element => {
                return {
                    msg: element.msg,
                    origin: action.payload.origin
                }
            });
            return {...state, errs: errors.concat(state.errs)};
        case 'DELETE_ERRS':
            return {...state, errs: []};
        case 'ADD_TO_BORROW_ARRAY':
            let email = state.email;
            let temppArr = JSON.parse(JSON.stringify(state.borrowArr));
            action.payload.forEach(obj => {
                if (temppArr.find(x => x.id === obj.id) === undefined) {
                    temppArr.push(obj);
                } else {
                    temppArr = temppArr.filter(obj2 => obj2.id !== obj.id);
                    email=""
                }
            });
            return {...state, borrowArr: temppArr,email};
        case 'ADD_TO_RETURN_ARRAY':
            let tempArr = JSON.parse(JSON.stringify(state.returnArr));
            action.payload.forEach(obj => {
                if (tempArr.find(x => x.id === obj.id) === undefined) {
                    tempArr.push(obj);
                } else tempArr = tempArr.filter(obj2 => obj2.id !== obj.id);
            });
            return {...state, returnArr: tempArr};
        case 'RESET_BORROW_ARRAY':
            return {...state, borrowArr: []};
        case 'RESET_LEND_ARRAY':
            return {...state, returnArr: []};
        case 'DASH_TYPE':
            if (state.dashboardType === 'books')
                return {...state, dashboardType: 'users'};
            else return {...state, dashboardType: 'books'};
        case 'BORROWER_EMAIL':
            return {...state, email: action.payload};
        case 'PROFILE_TOGGLE':
            return {...state, profile_shown: !state.profile_shown};
        default:
            return state;
    }
}