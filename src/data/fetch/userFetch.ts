import store from "data/state/store";

export const userSignUp = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        body: data,
        // headers: {"Content-Type": "multipart/form-data"}
    })
    return await response.json()
};

export const userLogin = async (data) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return await response.json()
};

export const userPhotoChange = async ({ id, data }) => {
    const token = store.getState().common.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/changePhoto`, {
        method: 'PUT',
        body: data,
        headers: { 'Authorization': 'Bearer ' + token }
    })
    return await response.json()
};

export const userPhotoGet = async ({ id }) => {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/users/image/${id}`,{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}/getPhoto`, {
        method: 'GET',
    })
    return await response.json();
};

export const userAccountDelete = async ({ id }) => {
    const token = store.getState().user.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    return await response.json()
};