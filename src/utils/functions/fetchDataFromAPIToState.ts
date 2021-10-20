import {
    fetchWorksValuationObjectFromAPI,
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
import { ValuationObjectInteface } from 'typings'
import { useAppDispatch } from '../hooks/useAppDispach'

export const FetchDataFromApiToState = async (workId: string) => {
    const dispatch = useAppDispatch()
    const { parameters } = await fetchWorksFromAPI(
        workId
    )
    const allValuationObjects = await fetchWorksValuationObjectFromAPI(workId)
    const valuationObject = allValuationObjects.find((obj: ValuationObjectInteface) => (
        obj.isForValuation === true
    ))
    const valuationObjects = allValuationObjects.filter((obj: ValuationObjectInteface) => (
        obj.isForValuation === false
    ))
    const valuationObjectName = valuationObject.name;
    const valuationObjectArea = valuationObject.area;
    const valuationObjectParameters = valuationObject.parametersValues;
    const valuationObjectsNames = valuationObjects.map((obj: ValuationObjectInteface) => (
        obj.name
    ));
    const valuationObjectsAreas = valuationObjects.map((obj: ValuationObjectInteface) => (
        obj.area
    ));
    const valuationObjectsPrices = valuationObjects.map((obj: ValuationObjectInteface) => (
        obj.price
    ));

    const valuationObjectsParameters = await valuationObjects
        .map((obj: ValuationObjectInteface) => {
            return obj.parametersValues
        })

    const valuationParametersObjects = parameters;

    await dispatch(setValuationObject(valuationObjectName))
    await dispatch(setValuationObjects(valuationObjectsNames))
    await dispatch(setFinishedSteps(2))
    await dispatch(setParametersObjects(valuationParametersObjects))
    await dispatch(setValuationObjectParameters(valuationObjectParameters))
    await dispatch(setValuationObjectsParameters(valuationObjectsParameters))
    await dispatch(setValuationObjectsAreas(valuationObjectsAreas))
    await dispatch(setValuationObjectsPrices(valuationObjectsPrices))
    await dispatch(setValuationObjectArea(valuationObjectArea))
    await dispatch(
        setParametersScale([
            Math.min(...valuationObjectsParameters.concat(valuationObjectParameters)),
            Math.max(...valuationObjectsParameters.concat(valuationObjectParameters)),
        ])
    )
}