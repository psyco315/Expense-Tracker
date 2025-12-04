import { nanoid } from 'nanoid'
import axios from 'axios';
import { getFullData, populateExpenses } from './dataHandler'
import runThisShi from './debtHandler';

function getFormattedDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    return `${day}/${month}/${year}`;
}

const createPostObj = (name, amount, shareList, user, paidBy) => {
    const postObj = {}
    postObj.expID = nanoid()
    postObj.expName = name
    postObj.amountPaid = amount
    postObj.paidBy = paidBy
    postObj.sharedBy = shareList
    postObj.date = getFormattedDate()

    return postObj
}

const postSingleExpense = async (
    currentExp, name, amount, shareList, user,
    resetName, resetAmount, resetShareList, paidBy, setPaidBy,
    rerender, setData, setCurrentExp, groupAccounts, setEndResult
) => {
    const postObj = createPostObj(name, amount, shareList, user, paidBy);

    try {
        const response = await axios.put(
            `https://expense-tracker-server-three-phi.vercel.app/api/expense/groupData/editExpense/${currentExp.id}`,
            postObj
        );

        await updateTransactions(currentExp, postObj, groupAccounts, setEndResult)

        resetAmount(''); // Reset state
        resetName('');
        resetShareList([]);

        // Trigger rerender after successful addition
        await rerender(setData, currentExp, setCurrentExp, user);
    } catch (error) {
        console.error('Error adding expense:', error);
    }
};

const restartCurrentExp = (newExpId, data, setCurrentExp) => {
    // console.log("Restarting exp")
    const expense = data.find((expense) => expense.id === newExpId);
    if (expense) {
        setCurrentExp(expense);
    } else {
        console.warn('Expense not found in updated data.');
    }
};

const rerender = async (setData, currExp, setCurrentExp, currUser) => {
    try {
        const updatedData = await getFullData(setData, currUser); // Fetch updated data

        if (updatedData.length > 0) {
            // Update current expense using the updated data
            restartCurrentExp(currExp.id, updatedData, setCurrentExp);
        } else {
            console.warn('No data returned from API.');
        }
    } catch (error) {
        console.error('Error during rerender:', error);
    }
};

const postTransaction = async (transactionObj) => {
    try {
        const response = await axios.post('https://expense-tracker-server-three-phi.vercel.app/api/transaction', transactionObj, {
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
        });
    } catch (error) {
        console.error('Error posting transaction:', error.response?.data || error.message);
    }
};

const updateTransactions = async (currentExp, postObj, groupAccounts, setEndResult) => {
    const { expID, expName, amountPaid, paidBy, sharedBy, date } = postObj

    let transactionObj = {
        groupID: currentExp.id,
        expID: expID,
        party1: paidBy,
        party2: sharedBy,
        amount: amountPaid
    }

    await postTransaction(transactionObj)
    await runThisShi(groupAccounts, currentExp, setEndResult)
}

export { postSingleExpense, rerender }