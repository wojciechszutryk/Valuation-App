import { AnyAction } from 'redux'
import { UserReducer } from './interfaces'
import { SET_USERNAME, SET_USER_IMAGE, SET_USERID, SET_TOKEN } from '../constans'

const initialState = {
    userId: '',
    token: '',
    userImage: '',
    userName: '',
}

const reducer = (
    state: UserReducer = initialState,
    action: AnyAction
): UserReducer => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            }

        case SET_USERID:
            return {
                ...state,
                userId: action.payload,
            }

        case SET_USER_IMAGE:
            return {
                ...state,
                userImage: action.payload,
            }

        case SET_USERNAME:
            return {
                ...state,
                userName: action.payload,
            }
        default:
            return state
    }
}

export default reducer