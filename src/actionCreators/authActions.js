//Log in/ or register based on the second parameter
export const authenticate = (creds, type) => dispatch => {
    fetch(`http://localhost:5000/api/users/${type}`, {
        body: JSON.stringify(creds),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        method: "post"
    }).then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }
    ).then(res => {
        check(res, dispatch)
    }).catch(e =>
        console.log(e)
    )
};

export const deleteErrors = () => dispatch => {
    dispatch({
        type: 'DELETE_ERRORS'
    })
};

export const googleAuth = token_id => dispatch => {
    fetch("http://localhost:5000/api/users/google", {
        body: JSON.stringify(token_id),
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        method: "post"
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        })
        .then(res => {
            check(res, dispatch)
        }).catch(e =>
        console.log(e)
    )
};
export const logOut = () => dispatch => {
    localStorage.setItem('logged', false);
    localStorage.removeItem('auth');
    dispatch({
        type: 'LOG_OUT'
    })
};
//checks whether the login was successful or not
const check = (res, dispatch) => {
    if (res.status === 400 || res.status === 401 || res.status === 403) {
        dispatch({
            type: 'UNSUCCESSFUL_AUTH',
            payload: res.json
        });
    } else {
        const {firstName,surname} = parseJwt(res.json.token);
        localStorage.setItem('name', `${firstName} ${surname}`);
        localStorage.setItem('logged', true);
        localStorage.setItem('auth', res.json.token);
        dispatch({
            type: 'SUCCESSFUL_AUTH',
            payload: res.json.token,
        });
    }
};

let b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
let parseJwt = token =>
    JSON.parse(
        b64DecodeUnicode(
            token.split('.')[1].replace('-', '+').replace('_', '/')
        )
    )
;


