const getAccounts = async (req, res, Model) => {
    const result = await Model.find({})
    res.status(200).json({ result, nbHits: result.length })
}

export { getAccounts }