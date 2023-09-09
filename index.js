exports.getBigInformation = async ({handler}) => {
    let result = []
    let pagination = {
        limit: 100,
        offset: 0
    }
    let lastResult = await handler(pagination)
    result = [...result, ...lastResult]
    pagination.offset += 100
    pagination.limit = 10

    while (lastResult.length === 100) {
        const promises = []
        for (let i = 0; i < 10; i++) {
            pagination.offset += 10
            promises.push(await handler(pagination))
        }
        lastResult = (await Promise.all(promises)).reduce((acc, val) => {
            return [...acc, ...val]
        }, [])
        result = [...result, ...lastResult]
    }
    return result
}
