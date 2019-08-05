const initialState = {
    errs: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ERR':
            console.log('here');
            let errors = action.payload.json.map(element => {
                return {
                    msg:element.msg,
                    origin: action.payload.origin
                }
            });

            return {...state, errs: errors.concat(state.errs)};
        case 'DELETE_ERRS':
            return {...state, errs: []};
        default:
            return state;
    }
}