import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../data/state/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
