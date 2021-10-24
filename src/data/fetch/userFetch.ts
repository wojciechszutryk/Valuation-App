import store from 'data/state/store'

export const userSignUp = async ({
    email,
    userName,
    password,
}: {
    email: string
    userName: string
    password: string
}) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        {
            method: 'POST',
            body: JSON.stringify({ email, password, userName }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return await response.json()
}

export const userLogin = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )
    return await response.json()
}

export const userAccountDelete = async ({
    id,
    token,
}: {
    id: string
    token: string
}) => {
    console.log(token)
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
    )
    return await response.json()
}

export const fetchUserWorksFromAPI = async ({ id }: { id: string }) => {
    const token = store.getState().user.token
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}/works`,
        {
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }
    )
    return await response.json()
}
