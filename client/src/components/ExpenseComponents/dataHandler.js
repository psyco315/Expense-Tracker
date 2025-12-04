import axios from 'axios'

const getFullData = async (setData, userID) => {
    try {
        // console.log("Fetching full data")
        const response = await axios.get('/api/expense/groupData');
        let result = response.data.result || []; // Handle missing data gracefully
        // console.log("Full data:", result)
        
        result = result.filter(group => group.members.includes(userID));
        // console.log("Refined data for", userID, ":", result)
        setData(result); // Update the React state
        return result; // Return fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array on error
    }
};

const getAccounts = (setAccount) => {
    axios.get('/api/account')
        .then(response => {
            setAccount(response.data.result)
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const populateExpenses = (data, setGroupExp) => {
    const expList = []
    data.map(expense => {
        const expObj = {
            id: expense.id,
            expName: expense.name
        }

        expList.push(expObj)
    })
    setGroupExp(expList)
}
const reRenderDisclosure = async (data, setData, setGroupExp, currUser) =>{
    await getFullData(setData, currUser)
    populateExpenses(data, setGroupExp)
}

export { getFullData, populateExpenses, getAccounts, reRenderDisclosure }