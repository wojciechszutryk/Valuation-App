import React from 'react'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import PublishIcon from '@material-ui/icons/Publish'

const FileUpload = () => {
    const { t } = useTranslation()
    const onDrop = React.useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: Blob) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const binaryStr = reader.result
                console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
        })
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
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
