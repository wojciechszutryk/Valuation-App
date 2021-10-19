import { combineReducers } from 'redux'
import appReducer from './appReducer'
import valuationReducer from './valuationReducer'
import userReducer from './userReducer'

const reducers = combineReducers({
    app: appReducer,
    valuation: valuationReducer,
    user: userReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
