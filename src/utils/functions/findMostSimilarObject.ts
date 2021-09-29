export const findMostSimilarObject = (
    objects: { [key: string]: number }[],
    object: { [key: string]: number },
    excludeIndexes: number[] = []
) => {
    if (objects.length === 1 || objects.length === 0) return 0

    let mostSimilarObjectIndex = 0
    let mostSimilarObjectParametersDifference = 0
    const objectValues = Object.values(object)

    //first iteration to set mostSimilarObjectParametersDifference
    Object.values(objects[0]).forEach((parameter, index) => {
        mostSimilarObjectParametersDifference += Math.abs(
            parameter - objectValues[index]
        )
    })

    //other iterations to compare if other object is more relevant
    for (let i = 0; i < objects.length; i++) {
        const objectsObjectValues = Object.values(objects[i])
        let objectsObjectValuesDifference = 0
        objectsObjectValues.forEach((parameter, index) => {
            objectsObjectValuesDifference += Math.abs(
                parameter - objectValues[index]
            )
        })
        if (
            objectsObjectValuesDifference <
                mostSimilarObjectParametersDifference &&
            !excludeIndexes.includes(i)
        ) {
            mostSimilarObjectIndex = i
            mostSimilarObjectParametersDifference =
                objectsObjectValuesDifference
        }
    }
    return mostSimilarObjectIndex
}
