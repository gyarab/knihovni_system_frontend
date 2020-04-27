const initialState = {
    isLogged: localStorage.getItem('logged') === 'true',
    user:{},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SUCCESSFUL_AUTH':
            //action's payload is the jwt token
            return {...state, isLogged: true};
        case 'UNSUCCESSFUL_AUTH':
            return {isLogged: false};
        case 'LOG_OUT':
            return {...state, isLogged: false};
        case 'GET_USER':
            return {...state, user: action.payload};
        default:
            return state;
    }
}
