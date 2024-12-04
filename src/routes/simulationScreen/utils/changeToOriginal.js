export const changeToOriginal = (arr, str) => {
    let setOfIds = []
    arr?.forEach((item) => {
        if (item?.benefitGroup == str) {
            setOfIds.push(item?.benefitOrder)
        }
    })
    return setOfIds
}