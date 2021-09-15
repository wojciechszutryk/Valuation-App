import { compareArrays } from '../compareArrays'

describe('compareArrays', () => {
    it('returns true when arrays are equal', () => {
        const array1 = [
            [1, 3, 4],
            [8, 2, 7],
            [6, 9, 5],
        ]
        const array2 = [
            [1, 3, 4],
            [8, 2, 7],
            [6, 9, 5],
        ]
        expect(compareArrays(array1, array2)).toBeTruthy()
    })
    it('returns false when arrays are not equal', () => {
        const array1 = [
            [1, 3, 4],
            [8, 2, 7],
            [6, 9, 5],
        ]
        const array2 = [
            [1, 3, 4],
            [8, 1, 7],
            [6, 9, 5],
        ]
        expect(compareArrays(array1, array2)).toBeFalsy()
    })
})
