import {advancedCheck, check} from "./internalActions";
import {myConfig} from "../config";

let {url} = myConfig;
export const loadTakenBooks = () => dispatch => {
    fetch(`${url}/api/admin/all`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    }).then(response => response.json())
        .then(res => dispatch({type: 'TAKEN_BOOKS', payload: res}))
        .catch(e => console.log(e));

};

export const searchTakenBooks = (search, type) => dispatch => {
    fetch(`${url}/api/admin/search/${type}/${search}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => check(res, dispatch, 'TAKEN_BOOKS', 'getting all taken books'))
        .catch(e => console.log(e));

};

export const returnTakenBooks = (arr) => dispatch => {
    fetch(`${url}/api/admin/return`, {
        method: 'post',
        body: JSON.stringify({idArr: arr}),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => {
        advancedCheck(res, dispatch, 'RETURNED_BOOKS', 'returning taken books');
        dispatch({
            type: 'CHANGE_BOOK_STATUS',
            payload: res.json.books
        })
    })
        .catch(e => console.log(e));

};

export const borrowBooks = (obj) => dispatch => {
    fetch(`${url}/api/admin/borrow`, {
        method: 'post',
        body: JSON.stringify(obj),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('auth')}`,
        }
    })
        .then(async response => {
            let json = await response.json();
            return {json: json, status: response.status}
        }).then(res => {
        advancedCheck(res, dispatch, 'BORROWED_BOOKS', 'lending books');
        dispatch({
            type: 'CHANGE_BOOK_STATUS',
            payload: res.json.books
        })
    })
        .catch(e => console.log(e));

};

export const currentReaders = (type) => dispatch => {
        fetch(`${url}/api/admin/users/${type}`)
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'CURRENT_READERS',
                    payload: res,
                })
            })
            .catch(e => console.log(e));

    }
;