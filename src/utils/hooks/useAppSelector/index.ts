import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../../data/state/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
