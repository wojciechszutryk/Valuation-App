import React from 'react'
import {
    makeStyles,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core/styles'
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import CreateIcon from '@material-ui/icons/Create'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import StepConnector from '@material-ui/core/StepConnector'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { StepIconProps } from '@material-ui/core/StepIcon'
import { useTranslation } from 'react-i18next'
import { Steps } from 'typings'
import { useHistory } from 'react-router-dom'
import { showToast } from '../../utils'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

const Connector = withStyles((theme) => {
    return createStyles({
        alternativeLabel: {
            top: 22,
        },
        active: {
            '& $line': {
                backgroundImage:
                    theme.palette.type === 'light'
                        ? `linear-gradient( 95deg,${theme.palette.primary.light} 0%,${theme.palette.primary.main} 50%,${theme.palette.divider} 100%)`
                        : `linear-gradient( 95deg,${theme.palette.divider} 0%,${theme.palette.divider} 50%,${theme.palette.primary.main} 100%)`,
            },
        },
        completed: {
            '& $line': {
                backgroundImage:
                    // `linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)`,
                    `linear-gradient( 95deg,${theme.palette.primary.light} 0%,${theme.palette.primary.main} 50%,${theme.palette.divider} 100%)`,
            },
        },
        line: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.type === 'dark'
                    ? theme.palette.primary.main
                    : '#ccc',
            borderRadius: 1,
        },
    })
})(StepConnector)

const useIconStyles = makeStyles((theme) => {
    return createStyles({
        root: {
            backgroundColor: theme.palette.type === 'dark' ? `none` : '#ccc',
            backgroundImage:
                theme.palette.type === 'dark'
                    ? `linear-gradient( 120deg,${theme.palette.primary.main} 0%,${theme.palette.primary.dark} 50%,${theme.palette.primary.dark} 100%)`
                    : 'none',
            zIndex: 1,
            color: '#fff',
            width: 50,
            height: 50,
            display: 'flex',
            borderRadius: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        active: {
            backgroundImage: `linear-gradient( 120deg,${theme.palette.secondary.light} 0%,${theme.palette.secondary.dark} 50%,${theme.palette.secondary.dark} 100%)`,
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        },
        completed: {
            backgroundImage: `linear-gradient( 120deg,${theme.palette.secondary.light} 0%,${theme.palette.secondary.dark} 50%,${theme.palette.secondary.dark} 100%)`,
        },
    })
})

function StepIcon(props: StepIconProps) {
    const classes = useIconStyles()
    const { active, completed } = props

    const icons: { [index: string]: React.ReactElement } = {
        1: <CreateIcon />,
        2: <LibraryAddIcon />,
        3: <PlaylistAddCheckIcon />,
    }

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        stepper: {
            backgroundColor:
                theme.palette.type === 'dark' ? '#4e4e4e' : '#f3f3ff',
            borderRadius: 10,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        step: {
            cursor: 'pointer',
            '& svg': {
                transition: '.2s',
            },
            '&:hover svg': {
                transform: 'scale(1.2)',
            },
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
)

function getSteps() {
    return [
        'Add basic information',
        'Set details and parameters',
        'Finish valuation',
    ]
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return 'Add basic information'
        case 1:
            return 'Set details and parameters'
        case 2:
            return 'Finish valuation'
        default:
            return 'Unknown step'
    }
}

export default function CustomStepper({
    activeStepFromProps = 0,
    children = <></>,
}: {
    activeStepFromProps: Steps
    children?: JSX.Element
}) {
    const finishedSteps = useAppSelector(
        (state) => state.valuation.finishedSteps
    )
    const [activeStep, setActiveStep] = React.useState(activeStepFromProps)
    const classes = useStyles()
    let history = useHistory()
    const steps = getSteps()
    const { t } = useTranslation()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) as Steps)
        handleGoToStep((activeStep + 1) as Steps)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => (prevActiveStep - 1) as Steps)
        handleGoToStep((activeStep - 1) as Steps)
    }

    const handleReset = () => {
        setActiveStep(0)
        handleGoToStep(0)
    }

    const handleGoToStep = (step: Steps) => {
        if (step > 2 || step < 0) return
        if (step === 0) {
            history.push('/valuation/new')
        } else if (step === 1) {
            history.push('/valuation/details')
        } else if (step === 2) {
            if (activeStep === 0 && finishedSteps < 2) {
                showToast(
                    t(
                        "You can't access that field before completing previous ones."
                    )
                )
                return
            }
            history.push('/valuation/finish')
        }
    }

    return (
        <div className={classes.root}>
            <Stepper
                className={classes.stepper}
                alternativeLabel
                activeStep={activeStep}
                connector={<Connector />}
            >
                {steps.map((label, index) => (
                    <Step className={classes.step} key={label}>
                        <StepLabel
                            StepIconComponent={StepIcon}
                            onClick={() => handleGoToStep(index as Steps)}
                        >
                            {t(label)}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            {children}
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button
                            onClick={handleReset}
                            className={classes.button}
                        >
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
