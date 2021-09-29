export const listMostSimilarObjects = (
    objects: { [key: string]: number }[] = [
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 2,
            Uzbrojenie: 3,
            Dojazd: 2,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 4,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 1,
            Dojazd: 3,
        },
        {
            Lokalizacja: 4,
            'Sąsiedztwo i otoczenie': 4,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 4,
            Dojazd: 4,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 1,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 2,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 3,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 3,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 3,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 3,
        },
        {
            Lokalizacja: 3,
            'Sąsiedztwo i otoczenie': 2,
            'Kształt i wielokość działki': 4,
            Uzbrojenie: 2,
            Dojazd: 1,
        },
        {
            Lokalizacja: 2,
            'Sąsiedztwo i otoczenie': 1,
            'Kształt i wielokość działki': 2,
            Uzbrojenie: 2,
            Dojazd: 2,
        },
    ],
    object: { [key: string]: number } = {
        Lokalizacja: 2,
        'Sąsiedztwo i otoczenie': 1,
        'Kształt i wielokość działki': 2,
        Uzbrojenie: 3,
        Dojazd: 2,
    }
) => {
    const IndexesOfObjectsWithOneNotEqualValue: number[][] = []
    for (let i = 0; i < objects.length; i++) {
        const firstObject: { [key: string]: number } = objects[i]
        for (let j = 0; j < objects.length; j++) {
            // const secondObject: { [key: string]: number } = objects[j]
            // if (secondObject[searchKey] !== firstObject[searchKey]) {
            //     const firstObjectCopy = Object.assign({}, firstObject)
            //     delete firstObjectCopy[searchKey]
            //     const secondObjectCopy = Object.assign({}, secondObject)
            //     delete secondObjectCopy[searchKey]
            //     if (
            //         JSON.stringify(secondObjectCopy) ===
            //         JSON.stringify(firstObjectCopy)
            //     ) {
            //         i < j
            //             ? IndexesOfObjectsWithOneNotEqualValue.push([i, j])
            //             : IndexesOfObjectsWithOneNotEqualValue.push([j, i])
            //     }
            // }
        }
    }
    return Array.from(
        new Set(
            IndexesOfObjectsWithOneNotEqualValue.map((e) => JSON.stringify(e))
        )
    ).map((e) => JSON.parse(e))
}
