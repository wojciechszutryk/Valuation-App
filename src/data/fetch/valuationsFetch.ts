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
export const fetchValuationObjectFromAPI = async (id: string) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/valuationObject/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )
    return await response.json()
}
export const fetchValuationObjectsFromAPI = async (id: string) => {
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}/valuationObjects/${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    )
    return await response.json()
}
