import { AnyAction } from 'redux'
import * as types from '../constans'

export const setToken = (token: string): AnyAction => ({
    type: types.SET_TOKEN,
    payload: token,
})

export const setUserId = (id: string): AnyAction => ({
    type: types.SET_USERID,
    payload: id,
})

export const setUserImage = (image: string): AnyAction => ({
    type: types.SET_USER_IMAGE,
    payload: image,
})

export const setUserName = (name: string): AnyAction => ({
    type: types.SET_USERNAME,
    payload: name,
})
