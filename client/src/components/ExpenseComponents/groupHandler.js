import axios from 'axios';
import { rerender } from './postExpense';

const updateExpense = async (groupID, userID, setData, currExp, setCurrentExp) => {
    try {
        const response = await axios.put("https://expense-tracker-server-three-phi.vercel.app/api/expense/groupData/leaveExpense", {
            groupID,
            userID
        });
        await rerender(setData, currExp, setCurrentExp, userID)
        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
};

const leaveGroup = async (currentExp, newObj, setData, currExp, setCurrentExp) => {
    await updateExpense(currentExp, newObj, setData, currExp, setCurrentExp)
}

export { leaveGroup };