export const fetchWorksFromAPI = async (id: string) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/works/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )
    return await response.json()
}
export const fetchWorksValuationObjectFromAPI = async (id: string) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/works/${id}/valuationObjects`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )
    return await response.json()
}
