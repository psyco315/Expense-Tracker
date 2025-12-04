const getTransactions = async (req, res, Model) => {
    const result = await Model.find({})
    res.status(200).json({ result, nbHits: result.length })
}

const postTransactions = async (req, res, Model) => {
    try {
        // Assuming transactionObj is directly sent from the frontend
        const transactionObj = req.body;

        // Validate required fields in transactionObj
        const { groupID, expID, party1, party2, amount } = transactionObj;
        if (!groupID || !expID || !party1 || !party2 || !amount) {
            return res.status(400).json({ message: 'Missing required fields in the transaction object' });
        }

        // Create and save the transaction directly using the transactionObj
        const newTransaction = new Model(transactionObj);

        // Save the transaction to MongoDB
        await newTransaction.save();

        // Query all transactions (or apply any other query logic if needed)
        const result = await Model.find({}); // You can add filters if needed
        const nbHits = result.length; // Count the number of results

        // Send response with result and nbHits
        res.status(200).json({
            result,
            nbHits
        });

    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { getTransactions, postTransactions }