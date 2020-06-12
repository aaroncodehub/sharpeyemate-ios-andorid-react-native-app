export const ERROR_MESSAGE = 'ERROR_MESSAGE'
export const CLEAN_ERROR = 'CLEAN_ERROR'
export const CURRENT_USER = 'CURRENT_USER'
export const LOADING = 'LOADING'
export const LOGOUT = 'LOGOUT'
export const SET_ORDERS = 'SET_ORDERS'
export const SET_PROFILE = 'SET_PROFILE'
export const FETCH_USER = 'FETCH_USER'
import firebase from 'firebase'
import 'firebase/firestore'
import axios from 'axios'


var firebaseConfig = {
    apiKey: "AIzaSyAll-VaHFJWg6jwQ-BPnx80g6QAdNrMb1s",
    authDomain: "mysharpeyemate.firebaseapp.com",
    databaseURL: "https://mysharpeyemate.firebaseio.com",
    projectId: "mysharpeyemate",
    storageBucket: "mysharpeyemate.appspot.com",
    messagingSenderId: "67037945546",
    appId: "1:67037945546:web:1df278cc49c23a3bef9e33",
    measurementId: "G-274K5GPPX7"
};
firebase.initializeApp(firebaseConfig)



export const login = (email, password) => {
    return dispatch => {
        dispatch({
            type: LOADING,
            loading: true
        })
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({
                    type: LOADING,
                    loading: false
                })
                dispatch({
                    type: CLEAN_ERROR
                })
                dispatch(fetchProfile(user.user.uid))
            })
            .catch(err => {
                dispatch({
                    type: LOADING,
                    loading: false
                })
                dispatch({
                    type: ERROR_MESSAGE,
                    errorMessage: err.message
                })
            })
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}

export const fetchProfile = (uid) => {
    return async dispatch => {
        dispatch({
            type: LOADING,
            loading: true
        })
        const response = await firebase.firestore().collection('users').doc(uid).get()
        await dispatch({
            type: SET_PROFILE,
            userProfile: response.data()
        })
        await dispatch(fetchOrders())
    }
}


export const fetchOrders = () => {
    return (dispatch, getState) => {
        const companyId = getState().myReducer.userProfile.companyId
        const accessToken = getState().myReducer.userProfile.accessToken
        const limited = getState().myReducer.userProfile.limitedOrder
        axios({
            url: 'https://api.sharpeye.co.nz/api/v1/model/sale.order/?limit=' + limited + '&detailed=True&domain=partner_id,=,' + companyId,
            headers: {
                'access_token': accessToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        }).then((res) => {
            dispatch({
                type: SET_ORDERS,
                orders: res.data
            })
        }).then(() => {
            dispatch({
                type: LOADING,
                loading: false
            })
        }).catch(err => {
            dispatch({
                type: ERROR_MESSAGE,
                errorMessage: err.message
            })
            dispatch({
                type: LOADING,
                loading: false
            })
        })
    }
}

export const cleanError = () => {
    return {
        type: CLEAN_ERROR
    }
}
