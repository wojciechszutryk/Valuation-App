import { Box, Container, Hidden } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { Stepper } from 'components'
import { Steps } from 'typings'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import {
    ValuationObjectInput,
    ValuationNavigation,
    ValuationObjectsForm,
    ValuationPropertiesForm,
} from './components'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        box: {
            flexBasis: '49%',
        },
    })
)

const ValuationNew: React.FC = () => {
    const storeValuationObjects = useAppSelector(
        (state) => state.valuation.valuationObjects
    )
    const storeValuationCriteria = useAppSelector(
        (state) => state.valuation.valuationParametersObjects
    )
    const storeValuationObject = useAppSelector(
        (state) => state.valuation.valuationObject
    )
    const storeValueCriteriaScale = useAppSelector(
        (state) => state.valuation.valuationParametersScale
    )
    const [valuationObjects, setValidationObjects] = useState<string[]>(
        storeValuationObjects
    )
    const [valuationCriteria, setValuationCriteria] = useState<string[]>(
        storeValuationCriteria
    )
    const [valuationObject, setValuationObject] = useState(storeValuationObject)
    const [valueCriteriaScale, setValueCriteriaScale] = useState<number[]>(
        storeValueCriteriaScale
    )
    const classes = useStyles()
    return (
        <>
            <Hidden mdUp>
                <Container>
                    <Stepper activeStepFromProps={0 as Steps} />
                    <ValuationObjectInput
                        valuationObject={valuationObject}
                        setValuationObject={setValuationObject}
                    />
                    <ValuationObjectsForm
                        valuationObjects={valuationObjects}
                        setValidationObjects={setValidationObjects}
                    />
                    <ValuationPropertiesForm
                        valuationCriteria={valuationCriteria}
                        setValuationCriteria={setValuationCriteria}
                        valueCriteriaScale={valueCriteriaScale}
                        setValueCriteriaScale={setValueCriteriaScale}
                    />
                    <ValuationNavigation
                        valuationObject={valuationObject}
                        valuationCriteria={valuationCriteria}
                        valuationObjects={valuationObjects}
                        valueCriteriaScale={valueCriteriaScale}
                    />
                </Container>
            </Hidden>
            <Hidden smDown>
                <Container className={classes.flex}>
                    <Stepper activeStepFromProps={0 as Steps} />
                    <Box className={classes.box}>
                        <ValuationObjectInput
                            valuationObject={valuationObject}
                            setValuationObject={setValuationObject}
                        />
                        <ValuationObjectsForm
                            valuationObjects={valuationObjects}
                            setValidationObjects={setValidationObjects}
                        />
                    </Box>
                    <Box className={classes.box}>
                        <ValuationNavigation
                            valuationObject={valuationObject}
                            valuationCriteria={valuationCriteria}
                            valuationObjects={valuationObjects}
                            valueCriteriaScale={valueCriteriaScale}
                        />
                        <ValuationPropertiesForm
                            valuationCriteria={valuationCriteria}
                            setValuationCriteria={setValuationCriteria}
                            valueCriteriaScale={valueCriteriaScale}
                            setValueCriteriaScale={setValueCriteriaScale}
                        />
                    </Box>
                </Container>
            </Hidden>
        </>
    )
}

export default ValuationNew
