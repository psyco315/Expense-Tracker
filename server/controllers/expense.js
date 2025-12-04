import { nanoid } from 'nanoid'

const getFullData = async (req, res, Model) => {
    const result = await Model.find({})
    res.status(200).json({ result, nbHits: result.length })
}

const addExpense = async (req, res, Model) => {
    const groupID = req.params.groupID;
    const postObj = req.body;

    try {

        // // Log the current document before updating
        // const existingGroup = await Model.findOne({ id: groupID });  // Use groupID instead of expenseId
        // console.log('Existing Group Expense:', existingGroup);

        // Update the document and add the new expense
        const updatedExpense = await Model.updateOne(
            { id: groupID },  // Replace expenseId with groupID in the query
            { $push: { expenses: postObj } }
        );

        // console.log('Updated Expense:', updatedExpense);

        // Check if any documents were matched and modified
        if (updatedExpense.matchedCount === 0) {
            return res.status(404).send({ message: 'Expense group not found' });
        }

        if (updatedExpense.modifiedCount === 0) {
            return res.status(400).send({ message: 'No changes made to the expense' });
        }

        res.status(200).send({
            message: `Expense added successfully to ${groupID}`,  // Use groupID in the response
            updatedExpense
        });

    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).send({
            message: 'Error adding expense',
            error: error.message || error
        });
    }
}

const createGroup = async (req, res, Model) => {
    const { currUser, newGroupName, createDate } = req.body
    const postObj = {
        id: nanoid(),
        name: newGroupName,
        type: "groupExpense",
        createDate: createDate,
        createBy: currUser,
        members: [currUser],
        expenses: []
    }

    try {
        const response = await Model.create(postObj)
        res.status(201).json({ message: 'Group created successfully' });
    }
    catch (error) {
        console.error('Error creating group expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const leaveGroup = async (req, res, Model) => {
    const { groupID, userID } = req.body;

    try {
        const updatedGroup = await Model.updateOne(
            { id: groupID },
            { $pull: { members: userID } }
        );

        if (updatedGroup.matchedCount === 0) {
            return res.status(404).send({ message: 'Group not found' });
        }

        if (updatedGroup.modifiedCount === 0) {
            return res.status(400).send({ message: 'User not found in the group' });
        }

        res.status(200).send({
            message: `User ${userID} left the group ${groupID} successfully`,
            updatedGroup
        });

    } catch (error) {
        console.error('Error leaving group:', error);
        res.status(500).send({
            message: 'Error leaving group',
            error: error.message || error
        });
    }
}

export { getFullData, addExpense, createGroup, leaveGroup }