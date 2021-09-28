export const findObjectsWithOneNotEqualValue = (
    objects: { [key: string]: number }[],
    searchKey: string
) => {
    const IndexesOfObjectsWithOneNotEqualValue: number[][] = []
    for (let i = 0; i < objects.length; i++) {
        const firstObject: { [key: string]: number } = objects[i]
        for (let j = 0; j < objects.length; j++) {
            const secondObject: { [key: string]: number } = objects[j]
            if (secondObject[searchKey] !== firstObject[searchKey]) {
                const firstObjectCopy = Object.assign({}, firstObject)
                delete firstObjectCopy[searchKey]
                const secondObjectCopy = Object.assign({}, secondObject)
                delete secondObjectCopy[searchKey]
                if (
                    JSON.stringify(secondObjectCopy) ===
                    JSON.stringify(firstObjectCopy)
                ) {
                    i < j
                        ? IndexesOfObjectsWithOneNotEqualValue.push([i, j])
                        : IndexesOfObjectsWithOneNotEqualValue.push([j, i])
                }
            }
        }
    }
    return Array.from(
        new Set(
            IndexesOfObjectsWithOneNotEqualValue.map((e) => JSON.stringify(e))
        )
    ).map((e) => JSON.parse(e))
}
