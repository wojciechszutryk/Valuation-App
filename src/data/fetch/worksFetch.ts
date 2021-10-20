import store from "data/state/store";

export const workDelete = async ({ id }: { id: string }) => {
    const token = store.getState().user.token;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
    return await response.json()
};