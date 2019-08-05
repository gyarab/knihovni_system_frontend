const initialState = {
    isLogged: localStorage.getItem('logged') === 'true',
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
        default:
            return state;
    }
}
