import { useStyles } from './styles';
import React from 'react'
import { Box, Button, Modal } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone'

const FileUpload = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <>
            <Button className={classes.loadButton} onClick={handleOpen}>{t('Import work')}</Button>
            <Modal
                className={classes.modalWrapper}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modal}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default FileUpload
