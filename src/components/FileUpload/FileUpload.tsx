import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import PublishIcon from '@material-ui/icons/Publish'
import { useHistory } from 'react-router-dom'
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
} from '../../data/state/actions/valuationActions'
import { showToast } from '../../utils'
import { useAppDispatch } from '../../utils/hooks/useAppDispach'

const FileUpload = () => {
    let history = useHistory()
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    const onDrop = React.useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            const reader = new FileReader()
            reader.onload = (function (theFile) {
                return function (e: any) {
                    try {
                        const json = JSON.parse(e.target.result)
                        const valuationObject = json.valuationObject
                        const valuationObjects = json.valuationObjects
                        const valuationObjectsParametersValues =
                            valuationObjects.objectsParameters
                                .map((obj: { [key: string]: number }) => {
                                    return Object.values(obj)
                                })
                                .flat()
                                .concat(
                                    Object.values(
                                        valuationObject.objectParameters
                                    )
                                )
                        dispatch(setValuationObject(valuationObject.name))
                        dispatch(setValuationObjects(valuationObjects.names))
                        dispatch(setFinishedSteps(2))
                        dispatch(
                            setParametersObjects(
                                Object.keys(valuationObject.objectParameters)
                            )
                        )
                        dispatch(
                            setValuationObjectParameters(
                                valuationObject.objectParameters
                            )
                        )
                        dispatch(
                            setValuationObjectsParameters(
                                valuationObjects.objectsParameters
                            )
                        )
                        dispatch(
                            setValuationObjectsAreas(valuationObjects.areas)
                        )
                        dispatch(
                            setValuationObjectsPrices(valuationObjects.prices)
                        )
                        console.log(valuationObjects)
                        dispatch(setValuationObjectArea(valuationObject.area))
                        dispatch(
                            setParametersScale([
                                Math.min(...valuationObjectsParametersValues),
                                Math.max(...valuationObjectsParametersValues),
                            ])
                        )
                        history.push('/valuation/new')
                        showToast(t('Loaded JSON file successfully'))
                    } catch (ex) {
                        showToast(
                            t('Error in loading JSON file') +
                                t('message') +
                                ': ' +
                                ex
                        )
                    }
                }
            })(file)
            reader.readAsText(file)
        })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.json',
    })
    return (
        <Button endIcon={<PublishIcon />}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{t('Import work')}</p>
            </div>
        </Button>
    )
}

export default FileUpload
