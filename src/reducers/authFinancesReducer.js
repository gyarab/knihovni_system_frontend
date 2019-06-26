const initialState = {
    isLogged: localStorage.getItem('logged') === 'true',
    error: false,
    errors:[],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESSFUL_AUTH':
            return {...state, isLogged: true};
        case 'UNSUCCESSFUL_AUTH':
            console.log('here');
            return {error:true, errors: action.payload, isLogged: false};
        case 'LOG_OUT':
            return {...state, isLogged: false};
        case 'DELETE_ERRORS':
            return {...state, errors: []};
        default:
            return state;
    }
}
