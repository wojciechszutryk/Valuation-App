import {
    fetchValuationObjectFromAPI,
    fetchValuationObjectsFromAPI,
    fetchWorksFromAPI,
} from 'data/fetch/valuationsFetch'
import {
    setFinishedSteps,
    setParametersObjects,
    setParametersScale,
    setValuationObject,
    setValuationObjectArea,
    setValuationObjectParameters,
    setValuationObjects,
    setValuationObjectsAreas,
    setValuationObjectsParameters,
    setValuationObjectsPrices,
} from 'data/state/actions/valuationActions'
import { useAppDispatch } from '../hooks/useAppDispach'

export const FetchDataFromApiToState = async (workId: string) => {
    const dispatch = useAppDispatch()
    const { valuationObjectId, valuationObjectsId } = await fetchWorksFromAPI(
        workId
    )
    const {
        name: valuationObject,
        objectParameters: valuationObjectParameters,
        area: valuationObjectArea,
    } = await fetchValuationObjectFromAPI(valuationObjectId)
    const {
        names: valuationObjects,
        areas: valuationObjectsAreas,
        prices: valuationObjectsPrices,
        objectsParameters: valuationObjectsParameters,
    } = await fetchValuationObjectsFromAPI(valuationObjectsId)

    const valuationObjectsParametersValues = await valuationObjectsParameters
        .map((obj: { [key: string]: number }) => {
            return Object.values(obj)
        })
        .flat()
        .concat(Object.values(valuationObjectParameters))

    const valuationParametersObjects = Object.keys(valuationObjectParameters)

    await dispatch(setValuationObject(valuationObject))
    await dispatch(setValuationObjects(valuationObjects))
    await dispatch(setFinishedSteps(2))
    await dispatch(setParametersObjects(valuationParametersObjects))
    await dispatch(setValuationObjectParameters(valuationObjectParameters))
    await dispatch(setValuationObjectsParameters(valuationObjectsParameters))
    await dispatch(setValuationObjectsAreas(valuationObjectsAreas))
    await dispatch(setValuationObjectsPrices(valuationObjectsPrices))
    await dispatch(setValuationObjectArea(valuationObjectArea))
    await dispatch(
        setParametersScale([
            Math.min(...valuationObjectsParametersValues),
            Math.max(...valuationObjectsParametersValues),
        ])
    )
}
