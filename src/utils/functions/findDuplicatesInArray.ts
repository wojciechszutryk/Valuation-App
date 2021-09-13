export const findDuplicatesInArray = (arr: any[]) => {
    const result = arr.filter((item, index) => arr.indexOf(item) !== index)
    return result.length !== 0
}
