import axios from "axios"

let transactionList = []
let accountMap = {}
let ids = []
let endResult = {}

const getTransactions = async (targetId) => {
    return axios.get('/api/transaction')
        .then(response => {
            transactionList = response.data.result.filter(transaction => transaction.groupID == targetId);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const populateAccountMap = (accounts) => {
    ids = accounts.map(obj => obj.id);

    ids.forEach(id1 => {
        // Initialize the object for id1 if it doesn't exist
        if (!accountMap[id1]) {
            accountMap[id1] = {};
        }

        ids.forEach(id2 => {
            accountMap[id1][id2] = 0; // Set all pairs to 0
        });
    });
}

const configureAccountMap = () => {
    transactionList.forEach(transaction => {
        const giver = transaction.party1
        const takerList = transaction.party2
        const amount = transaction.amount
        const num = takerList.length

        takerList.forEach(taker => {
            if (taker != giver) accountMap[taker][giver] += amount / num
        })
    })
}

const calcEndResult = (setEndResult) => {
    ids.forEach(id => {
        let totalGive = 0
        let totalGet = 0

        ids.forEach(otherGuy => {
            totalGive += accountMap[id][otherGuy]
            totalGet += accountMap[otherGuy][id]
        })

        let final = totalGive - totalGet
        endResult[id] = Number.isInteger(final) ? final : final.toFixed(1)
    })

    setEndResult(endResult)
}

const runThisShi = async (accounts, currentExp, setEndResult) => {
    const expID = currentExp.id
    transactionList = []
    accountMap = {}
    endResult = {}
    ids = []

    await getTransactions(expID)
    populateAccountMap(accounts)
    configureAccountMap()
    calcEndResult(setEndResult)
}

export default runThisShi