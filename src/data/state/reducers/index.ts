import { combineReducers } from 'redux'
import appReducer from './appReducer'
import valuationReducer from './valuationReducer'

const reducers = combineReducers({
    app: appReducer,
    valuation: valuationReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
