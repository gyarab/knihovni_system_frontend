export const deleteErrors = () => dispatch => {
    dispatch({
        type: 'DELETE_ERRS'
    })
};
export const check = (res, dispatch, type, origin) => {
    if (res.status === 400) {
        dispatch({
            type: 'ERR',
            payload: {json: res.json, origin: origin}
        });
    } else {
        dispatch({
            type: type,
            payload: res.json,
        });
    }
};

export const advancedCheck = (res, dispatch, type, origin) => {
    if (res.status === 400) {
        dispatch({
            type: 'ERR',
            payload: {json: res.json.errors, origin: origin}
        });
    }
    if (res.json.books.length > 0) {
        dispatch({
            type: type,
            payload: res.json.books,
        });
    }
};


export const selectToBorrow = (arr) => dispatch => {
    dispatch({
        type: 'ADD_TO_BORROW_ARRAY',
        payload: arr
    })
};

export const selectToReturn = (arr) => dispatch => {
    dispatch({
        type: 'ADD_TO_RETURN_ARRAY',
        payload: arr
    })
};

export const clearBorrowArray = () => dispatch => {
    dispatch({
        type: 'RESET_BORROW_ARRAY'
    })
};
export const clearReturnArray = () => dispatch => {
    dispatch({
        type: 'RESET_LEND_ARRAY'
    })
};

export const changeDashboardType = () => dispatch => {
    dispatch({
        type: 'DASH_TYPE',
    })
};


export const updateEmailOnSelect = (email) => dispatch => {
    dispatch({
        type: 'BORROWER_EMAIL',
        payload: email
    })
};


