import { AnyAction } from 'redux'
import { FinishedSteps } from 'typings'

import * as types from '../constans'

// information how many form fields were correctly fulfilled - 0-none, 3-all
export const setFinishedSteps = (finishNumber: FinishedSteps): AnyAction => ({
    type: types.SET_FINISHED_STEPS,
    payload: finishNumber,
})
