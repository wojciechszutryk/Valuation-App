import store from 'data/state/store'

export const workDelete = async ({ id }: { id: string }) => {
    console.log(id)
    const token = store.getState().user.token
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/works/${id}`,
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

export const workCrateNew = async ({
    userId,
    parameters,
}: {
    userId: string
    parameters: string[]
}) => {
    const token = store.getState().user.token
    const response = await fetch(`${process.env.REACT_APP_API_URL}/works`, {
        method: 'POST',
        body: JSON.stringify({
            date: new Date().toLocaleDateString(),
            parameters,
            userId,
        }),
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    })
    return await response.json()
}
