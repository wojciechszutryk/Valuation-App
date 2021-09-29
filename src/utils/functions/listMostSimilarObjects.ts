import { findMostSimilarObject } from './findMostSimilarObject'

export const listMostSimilarObjects = (
    objects: { [key: string]: number }[],
    object: { [key: string]: number }
) => {
    const objectsCopy = JSON.parse(JSON.stringify(objects))
    const objectsLength = objectsCopy.length
    const numberOfIndexesToFind = Math.floor(objectsLength / 4) + 1
    const mostSimilarObjectsIndexes: number[] = []
    const excludeIndexes: number[] = []

    while (mostSimilarObjectsIndexes.length < numberOfIndexesToFind) {
        const mostSimilarObjectIndex = findMostSimilarObject(
            objectsCopy,
            object,
            excludeIndexes
        )
        mostSimilarObjectsIndexes.push(mostSimilarObjectIndex)
        excludeIndexes.push(mostSimilarObjectIndex)
    }
    return mostSimilarObjectsIndexes
}
