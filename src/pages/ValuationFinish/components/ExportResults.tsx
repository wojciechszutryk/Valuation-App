import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { findObjectsWithOneNotEqualValue, showToast } from 'utils/functions'
import { useAppSelector } from 'utils/hooks/useAppSelector'
import XLSX from 'xlsx'
import { font } from 'utils/fonts/RobotoRegular'
import {
    createValuationObject,
    fetchWorksFromAPI,
} from '../../../data/fetch/valuationsFetch'
import { workCrateNew } from '../../../data/fetch/worksFetch'
import { useStyles } from './componentsStyles'
import TocIcon from '@material-ui/icons/Toc'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import CodeIcon from '@material-ui/icons/Code'
import HistoryIcon from '@material-ui/icons/History'

const ExportResults = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const userId = useAppSelector((state) => state.user.userId)
    const valuationObjectsParameters = useAppSelector(
        (state) => state.valuation.valuationObjectsParameters
    )
    const valuationObjectsAreas = useAppSelector(
        (state) => state.valuation.valuationObjectsAreas
    )
    const valuationObjectArea = useAppSelector(
        (state) => state.valuation.valuationObjectArea
    )
    const valuationParametersObjects = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const valuationObjectsPrices = useAppSelector(
        (state) => state.valuation.valuationObjectsPrices
    )
    const valuationObjectParameters = useAppSelector(
        (state) => state.valuation.valuationObjectParameters
    )
    const valuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )
    const valuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )
    const valuationParametersStandardizedWeights = useAppSelector(
        (state) => state.valuation.valuationParametersStandardizedWeights
    )
    const valuationObjectsForValidationIndexes = useAppSelector(
        (state) => state.valuation.valuationObjectsForValidation
    )

    ///////////////////////////////////////////////////details

    const createDetailsData = useCallback(
        (
            index: number | string,
            name: string,
            area: number | string,
            properties: { [key: string]: number },
            price: number | null = null,
            unitPrice: number | null = null
        ) => {
            return Object.assign(
                {},
                { index, name, area, price, unitPrice },
                properties
            )
        },
        []
    )

    const detailsValuationObjectRow = useMemo(
        () =>
            createDetailsData(
                valuationObjects.length + 1,
                valuationObject,
                valuationObjectArea,
                valuationObjectParameters
            ),
        [
            valuationObjects,
            createDetailsData,
            valuationObject,
            valuationObjectArea,
            valuationObjectParameters,
        ]
    )

    const detailsRows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []
        for (let i = 0; i < valuationObjects.length; i++) {
            const row: { [key: string]: number | string } = createDetailsData(
                i + 1,
                valuationObjects[i],
                valuationObjectsAreas[i],
                valuationObjectsParameters[i],
                valuationObjectsPrices[i],
                parseInt(
                    (
                        valuationObjectsPrices[i] / valuationObjectsAreas[i]
                    ).toFixed(2)
                )
            )
            rows.push(row)
        }
        rows.push(detailsValuationObjectRow)
        rows.push(createDetailsData('', '', '', {}))
        rows.push(createDetailsData('', t('criteria weights'), '', {}))
        return rows
    }, [
        detailsValuationObjectRow,
        t,
        createDetailsData,
        valuationObjects,
        valuationObjectsAreas,
        valuationObjectsPrices,
        valuationObjectsParameters,
    ])

    ///////////////////////////////////////////////////weights

    const weightsCreateData = useCallback(
        (
            index: number | string,
            name: string,
            properties: { [key: string]: number },
            unitPrice: number | null = null
        ) => {
            return Object.assign({}, { index, name }, properties, {
                unitPrice,
            })
        },
        []
    )

    const unitPrices = useMemo(
        () =>
            valuationObjects.map((obj, index) => {
                return Number.parseFloat(
                    (
                        valuationObjectsPrices[index] /
                        valuationObjectsAreas[index]
                    ).toFixed(2)
                )
            }),
        [valuationObjects, valuationObjectsPrices, valuationObjectsAreas]
    )
    const minPrice = useMemo(() => Math.min(...unitPrices), [unitPrices])
    const maxPrice = useMemo(() => Math.max(...unitPrices), [unitPrices])
    const diffMaxMinPrice = useMemo(
        () => maxPrice - minPrice,
        [maxPrice, minPrice]
    )

    const weightsRows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []

        for (let i = 0; i < valuationObjects.length; i++) {
            const row: { [key: string]: number | string } = weightsCreateData(
                i + 1,
                valuationObjects[i],
                valuationObjectsParameters[i],
                unitPrices[i]
            )
            rows.push(row)
        }
        return rows
    }, [
        valuationObjects,
        valuationObjectsParameters,
        unitPrices,
        weightsCreateData,
    ])

    const similarParametersObjectsPairs = useMemo(
        () =>
            valuationParametersObjects.map((key) =>
                findObjectsWithOneNotEqualValue(valuationObjectsParameters, key)
            ),
        [valuationObjectsParameters, valuationParametersObjects]
    )

    const diffPriceArray = useMemo(
        () =>
            similarParametersObjectsPairs.map((criteriaPairs: number[][]) =>
                criteriaPairs.map((pair: number[]) =>
                    Number.parseFloat(
                        Math.abs(
                            unitPrices[pair[1]] - unitPrices[pair[0]]
                        ).toFixed(2)
                    )
                )
            ),
        [similarParametersObjectsPairs, unitPrices]
    )

    const weightsArrays = useMemo(
        () =>
            diffPriceArray.map((categoryPricesArray) =>
                categoryPricesArray.map((price) =>
                    Number.parseFloat((price / diffMaxMinPrice).toFixed(2))
                )
            ),
        [diffPriceArray, diffMaxMinPrice]
    )

    const weights = useMemo(
        () =>
            weightsArrays.map((weightsArray) => {
                const weightsSum = weightsArray.reduce(
                    (previousValue, currentValue) =>
                        previousValue + currentValue,
                    0
                )
                return Number.parseFloat(
                    ((100 * weightsSum) / weightsArray.length).toFixed(2)
                )
            }),
        [weightsArrays]
    )

    const weightsSum = useMemo(
        () =>
            weights.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            ),
        [weights]
    )

    const standardizedWeights = useMemo(() => {
        const standardizedWeights = weights.map((weight) =>
            Number.parseFloat(((100 * weight) / weightsSum).toFixed(2))
        )
        return standardizedWeights
    }, [weightsSum, weights])

    const detailsRowArray: { [key: string]: number | string }[] =
        useMemo(() => {
            const detailsRowArray: { [key: string]: number | string }[] = []
            similarParametersObjectsPairs.forEach((pairs, index) => {
                detailsRowArray.push(
                    weightsCreateData(valuationParametersObjects[index], '', {})
                )
                pairs.forEach((pair, pairIndex) => {
                    weightsRows[pair[0]][t('price difference')] = ''
                    weightsRows[pair[0]][t('weight')] = ''
                    weightsRows[pair[1]][t('price difference')] =
                        diffPriceArray[index][pairIndex]
                    weightsRows[pair[1]][t('weight')] =
                        weightsArrays[index][pairIndex]
                    detailsRowArray.push(weightsRows[pair[0]])
                    detailsRowArray.push(weightsRows[pair[1]])
                })
                detailsRowArray.push(
                    weightsCreateData('', t('weight'), {}, weights[index])
                )
                detailsRowArray.push(
                    weightsCreateData(
                        '',
                        t('standardized weight'),
                        {},
                        standardizedWeights[index]
                    )
                )
            })
            detailsRowArray.push(weightsCreateData('', '', {}))
            detailsRowArray.push(weightsCreateData('', t('valuation'), {}))
            return detailsRowArray
        }, [
            weightsCreateData,
            similarParametersObjectsPairs,
            valuationParametersObjects,
            diffPriceArray,
            t,
            weights,
            weightsArrays,
            weightsRows,
            standardizedWeights,
        ])

    /////////////////////////////////////////////////////////////////valuation count

    const countCreateData = useCallback(
        (
            attribute: string,
            standardizedWeight: number | string,
            shareOfTheAmount: number | string,
            range: number | string,
            weightFactor: number | string,
            attributeValue: number | string
        ) => {
            return {
                attribute,
                standardizedWeight: standardizedWeight + ' %',
                shareOfTheAmount,
                range,
                weightFactor,
                attributeValue,
            }
        },
        []
    )

    const differenceMinAndMaxUnitPrice = useMemo(() => {
        const unitPriceArray: number[] = valuationObjectsPrices.map(
            (price, index) => price / valuationObjectsAreas[index]
        )
        return Math.max(...unitPriceArray) - Math.min(...unitPriceArray)
    }, [valuationObjectsAreas, valuationObjectsPrices])

    const attributesRanges: number[] = useMemo(() => {
        const attributesRanges: number[] = []
        const combinedObjectsParameters = [
            ...valuationObjectsParameters,
            valuationObjectParameters,
        ]
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            let minParam: number =
                combinedObjectsParameters[0][valuationParametersObjects[i]]
            let maxParam: number =
                combinedObjectsParameters[0][valuationParametersObjects[i]]
            combinedObjectsParameters.forEach((parameter) => {
                if (parameter[valuationParametersObjects[i]] < minParam)
                    minParam = parameter[valuationParametersObjects[i]]
                if (parameter[valuationParametersObjects[i]] > maxParam)
                    maxParam = parameter[valuationParametersObjects[i]]
            })
            attributesRanges.push(maxParam - minParam)
        }
        return attributesRanges
    }, [
        valuationObjectsParameters,
        valuationObjectParameters,
        valuationParametersObjects,
    ])

    const shares = useMemo(() => {
        const shares: number[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const share =
                (valuationParametersStandardizedWeights[i] *
                    differenceMinAndMaxUnitPrice) /
                100
            shares.push(share)
        }
        return shares
    }, [
        valuationParametersStandardizedWeights,
        differenceMinAndMaxUnitPrice,
        valuationParametersObjects,
    ])

    const shareFactors = useMemo(() => {
        const shareFactors: number[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const shareFactor = shares[i] / attributesRanges[i]
            shareFactors.push(shareFactor)
        }
        return shareFactors
    }, [attributesRanges, valuationParametersObjects, shares])

    const countRows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []
        for (let i = 0; i < valuationParametersObjects.length; i++) {
            const row: { [key: string]: number | string } = countCreateData(
                valuationParametersObjects[i],
                valuationParametersStandardizedWeights[i],
                Number.parseFloat(shares[i].toFixed(2)),
                attributesRanges[i],
                Number.parseFloat(shareFactors[i].toFixed(2)),
                Object.values(valuationObjectParameters)[i]
            )
            rows.push(row)
        }
        rows.push(countCreateData('', '', '', '', '', ''))
        return rows
    }, [
        shares,
        shareFactors,
        attributesRanges,
        countCreateData,
        valuationObjectParameters,
        valuationParametersStandardizedWeights,
        valuationParametersObjects,
    ])

    /////////////////////////////////////////////////////////////////comparison

    const valuationObjectsForValidationUnitPrices = useMemo(
        () =>
            valuationObjectsPrices
                .map((price, index) => price / valuationObjectsAreas[index])
                .filter((object, index) =>
                    valuationObjectsForValidationIndexes.includes(index)
                ),
        [
            valuationObjectsAreas,
            valuationObjectsForValidationIndexes,
            valuationObjectsPrices,
        ]
    )

    const comparisonCreateData = useCallback(
        (
            attribute: string,
            weightFactor: number | string,
            objectName: number | string,
            valuationObject: number | string,
            attributeDifference: number | string,
            correction: number | string
        ) => {
            return Object.assign(
                {},
                {
                    attribute,
                    weightFactor,
                    objectName,
                    valuationObject,
                    attributeDifference,
                    correction,
                }
            )
        },
        []
    )

    const correctionsSumArray: number[] = useMemo(
        () =>
            valuationObjectsForValidationIndexes.map((objectIndex) => {
                let sum = 0
                for (let i = 0; i < valuationParametersObjects.length; i++) {
                    const attrDiff =
                        Object.values(valuationObjectParameters)[i] -
                        Object.values(valuationObjectsParameters[objectIndex])[
                            i
                        ]

                    sum += shareFactors[i] * attrDiff
                }
                return sum
            }),
        [
            shareFactors,
            valuationObjectsForValidationIndexes,
            valuationObjectParameters,
            valuationParametersObjects,
            valuationObjectsParameters,
        ]
    )

    const suggestedUnitPrice: number = useMemo(() => {
        let sum = 0
        for (let i = 0; i < correctionsSumArray.length; i++) {
            sum +=
                correctionsSumArray[i] +
                valuationObjectsForValidationUnitPrices[i]
        }
        return sum / correctionsSumArray.length
    }, [correctionsSumArray, valuationObjectsForValidationUnitPrices])

    const comparisonRowsArrays: { [key: string]: number | string }[][] =
        useMemo(() => {
            return valuationObjectsForValidationIndexes.map(
                (objectIndex, index) => {
                    const rows: { [key: string]: number | string }[] = []
                    for (
                        let i = 0;
                        i < valuationParametersObjects.length;
                        i++
                    ) {
                        const attrDiff =
                            Object.values(valuationObjectParameters)[i] -
                            Object.values(
                                valuationObjectsParameters[objectIndex]
                            )[i]

                        const row: { [key: string]: number | string } =
                            comparisonCreateData(
                                valuationParametersObjects[i],
                                shareFactors[i].toFixed(2),
                                Object.values(valuationObjectParameters)[i],
                                Object.values(
                                    valuationObjectsParameters[objectIndex]
                                )[i],
                                attrDiff,
                                attrDiff *
                                    Number.parseFloat(
                                        shareFactors[i].toFixed(2)
                                    )
                            )
                        rows.push(row)
                    }
                    rows.push(
                        comparisonCreateData(
                            t('suggested unit price'),
                            valuationObjects[objectIndex],
                            valuationObject,
                            valuationObjectsForValidationUnitPrices[index] +
                                correctionsSumArray[index],
                            '',
                            ''
                        )
                    )
                    return rows
                }
            )
        }, [
            correctionsSumArray,
            t,
            valuationObject,
            valuationObjects,
            valuationObjectsForValidationUnitPrices,
            comparisonCreateData,
            valuationObjectsParameters,
            valuationParametersObjects,
            valuationObjectParameters,
            shareFactors,
            valuationObjectsForValidationIndexes,
        ])

    const comparisonRows: { [key: string]: number | string }[] = useMemo(() => {
        const rows: { [key: string]: number | string }[] = []
        comparisonRowsArrays.forEach((object) => {
            object.forEach((row) => rows.push(row))
        })
        return rows
    }, [comparisonRowsArrays])

    const valuationSummary: { [key: string]: number | string }[] =
        useMemo(() => {
            return [
                comparisonCreateData(
                    valuationObject,
                    t('suggested unit price').toString(),
                    suggestedUnitPrice,
                    t('suggested price').toString(),
                    Number.parseFloat(suggestedUnitPrice.toFixed(2)) *
                        valuationObjectArea,
                    ''
                ),
            ]
        }, [
            t,
            comparisonCreateData,
            valuationObject,
            valuationObjectArea,
            suggestedUnitPrice,
        ])

    /////////////////////////////////////////////////////////////////export functions
    const downloadPdf = useCallback(() => {
        const doc = new jsPDF('l', 'pt', 'A4')
        doc.addFileToVFS('Roboto-Regular-normal.ttf', font)
        doc.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')
        doc.setFont('Roboto-Regular')

        doc.text(
            `${valuationObject}-${new Date().toLocaleDateString()}`,
            20,
            10
        )

        autoTable(doc, {
            theme: 'grid',
            head: [Object.keys(detailsRows[0])],
            body: detailsRows.map((row) => Object.values(row)).slice(0, -2),
            styles: { font: 'Roboto-Regular' },
        })

        autoTable(doc, {
            theme: 'grid',
            head: [Object.keys(detailsRowArray[1])],
            body: detailsRowArray.map((row) => Object.values(row)),
            styles: { font: 'Roboto-Regular' },
        })

        autoTable(doc, {
            theme: 'grid',
            head: [Object.keys(countRows[0])],
            body: countRows.map((row) => Object.values(row)).slice(0, -1),
            styles: { font: 'Roboto-Regular' },
        })

        autoTable(doc, {
            theme: 'grid',
            head: [Object.keys(comparisonRows[0])],
            body: comparisonRows.map((row) => Object.values(row)),
            styles: { font: 'Roboto-Regular' },
        })

        autoTable(doc, {
            theme: 'grid',
            body: valuationSummary.map((row) => Object.values(row)),
            styles: { font: 'Roboto-Regular' },
        })
        doc.save(`${valuationObject}-${new Date().toLocaleDateString()}.pdf`)
        showToast(t('succeeded in exporting report to .pdf file'))
    }, [
        t,
        valuationObject,
        valuationSummary,
        comparisonRows,
        countRows,
        detailsRowArray,
        detailsRows,
    ])

    const downloadExcel = useCallback(() => {
        const sheet = XLSX.utils.json_to_sheet(detailsRows)
        XLSX.utils.sheet_add_json(sheet, detailsRowArray, {
            origin: -1,
        })
        XLSX.utils.sheet_add_json(sheet, countRows, {
            origin: -1,
        })
        XLSX.utils.sheet_add_json(sheet, comparisonRows, {
            origin: -1,
        })
        XLSX.utils.sheet_add_json(sheet, valuationSummary, {
            origin: -1,
            skipHeader: true,
        })

        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, sheet, 'valuation')
        XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' })
        XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' })
        XLSX.writeFile(
            workBook,
            `${valuationObject}-${new Date().toLocaleDateString()}.xlsx`
        )
        showToast(t('succeeded in exporting report to .xlsx file'))
    }, [
        t,
        valuationObject,
        valuationSummary,
        comparisonRows,
        countRows,
        detailsRowArray,
        detailsRows,
    ])

    const downloadJSON = useCallback(() => {
        const valuationObj: {
            [key: string]: string | number | { [key: string]: number }
        } = {}
        const valuationObjs: {
            [key: string]: string[] | number[] | { [key: string]: number }[]
        } = {}
        const downloadObj: {
            [key: string]:
                | {
                      [key: string]: string | number | { [key: string]: number }
                  }
                | {
                      [key: string]:
                          | string[]
                          | number[]
                          | { [key: string]: number }[]
                  }
        } = {}
        valuationObj['name'] = valuationObject
        valuationObj['area'] = valuationObjectArea
        valuationObj['area'] = valuationObjectArea
        valuationObj['objectParameters'] = valuationObjectParameters
        valuationObjs['names'] = valuationObjects
        valuationObjs['areas'] = valuationObjectsAreas
        valuationObjs['prices'] = valuationObjectsPrices
        valuationObjs['objectsParameters'] = valuationObjectsParameters
        downloadObj['valuationObject'] = valuationObj
        downloadObj['valuationObjects'] = valuationObjs
        const url = window.URL.createObjectURL(
            new Blob([JSON.stringify(downloadObj)])
        )
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
            'download',
            `${valuationObject}-${new Date().toLocaleDateString()}.json`
        )
        document.body.appendChild(link)
        link.click()
        link.parentNode && link.parentNode.removeChild(link)
        showToast(t('succeeded in exporting report to .json file'))
    }, [
        valuationObjectArea,
        valuationObjectParameters,
        valuationObjects,
        valuationObjectsAreas,
        valuationObjectsParameters,
        t,
        valuationObject,
    ])

    const saveToAccount = useCallback(async () => {
        try {
            const response = await workCrateNew({
                parameters: valuationParametersObjects,
                userId,
            })
            if (response.createdWork) {
                const workId = response.createdWork.id
                for (let i = 0; i < valuationObjects.length; i++) {
                    await createValuationObject({
                        workId,
                        name: valuationObjects[i],
                        parametersValues: Object.values(
                            valuationObjectsParameters[i]
                        ),
                        price: valuationObjectsPrices[i],
                        area: valuationObjectsAreas[i],
                        isForValuation: false,
                    })
                }
                await createValuationObject({
                    workId,
                    name: valuationObject,
                    parametersValues: Object.values(valuationObjectParameters),
                    price: 0,
                    area: valuationObjectArea,
                    isForValuation: true,
                })
                showToast(t('Successfully saved work'))
            }
        } catch (err) {
            showToast(t('Error in saving work') + ' ' + err)
        }
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
                <Paper className={classes.exportChild}>
                    <Typography variant={'h5'}>
                        {t('Export to excel')}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {t(
                            'save the report as a spreadsheet file on your device'
                        )}
                    </Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={downloadExcel}
                    >
                        <TocIcon color="secondary" />
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
                <Paper className={classes.exportChild}>
                    <Typography variant={'h5'}>{t('Export to PDF')}</Typography>
                    <Typography variant={'subtitle1'}>
                        {t('print report to pdf file')}
                    </Typography>
                    <Button variant="outlined" fullWidth onClick={downloadPdf}>
                        <PictureAsPdfIcon color="secondary" />
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
                <Paper className={classes.exportChild}>
                    <Typography variant={'h5'}>
                        {t('Export to JSON')}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {t(
                            'save the valuation to a JSON file on your device, it can be imported to the application later'
                        )}
                    </Typography>
                    <Button variant="outlined" fullWidth onClick={downloadJSON}>
                        <CodeIcon color="secondary" />
                    </Button>
                </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
                <Paper className={classes.exportChild}>
                    <Typography variant={'h5'}>
                        {t('Save work to history')}
                    </Typography>
                    <Typography variant={'subtitle1'}>
                        {t(
                            'save the valuation in the history on your application account, you will be able to return to the report after logging in'
                        )}
                    </Typography>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={saveToAccount}
                    >
                        <HistoryIcon color="secondary" />
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ExportResults
