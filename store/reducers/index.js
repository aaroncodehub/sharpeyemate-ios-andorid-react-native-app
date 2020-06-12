import {
    ERROR_MESSAGE,
    CLEAN_ERROR,
    LOADING,
    SET_ORDERS,
    SET_PROFILE,
    LOGOUT
} from '../actions'

const initialState = {
    errorMessage: null,
    loading: false,
    orders: [],
    userProfile: null
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case CLEAN_ERROR:
            return {
                ...state,
                errorMessage: null
            }
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        case SET_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}
