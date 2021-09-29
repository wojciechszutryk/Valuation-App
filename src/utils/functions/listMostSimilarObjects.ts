import { findMostSimilarObject } from './findMostSimilarObject'

export const listMostSimilarObjects = (
    objects: { [key: string]: number }[],
    object: { [key: string]: number }
) => {
    const objectsLength = objects.length
    const numberOfIndexesToFind = Math.floor(objectsLength / 4) + 1
    const mostSimilarObjectsIndexes: number[] = []

    while (mostSimilarObjectsIndexes.length < numberOfIndexesToFind) {
        const mostSimilarObjectIndex = findMostSimilarObject(objects, object)
        mostSimilarObjectsIndexes.push(mostSimilarObjectIndex)
        objects.splice(mostSimilarObjectIndex, 1)
    }
    return mostSimilarObjectsIndexes
}
