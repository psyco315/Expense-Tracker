import { createContext, useContext } from "react";

const defaultData = [
    {
        _id: "",
        id: 0,
        name: "",
        type: "",
        createDate: "",
        createBy: "",
        members: ["", "", "", ""],
        expenses: [
            {
                expID: 0,
                expName: "",
                date: "",
                paidBy: "",
                amountPaid: 0,
                userShare: 0,
                _id: ""
            },
            {
                expID: 0,
                expName: "",
                date: "",
                paidBy: "",
                amountPaid: 0,
                userShare: 0,
                _id: ""
            },
            {
                expID: 0,
                expName: "",
                date: "",
                paidBy: "",
                amountPaid: 0,
                userShare: 0,
                _id: ""
            }
        ],
        createdAt: "",
        updatedAt: "",
        __v: 0
    }
];
const defaultCurrentData = {
    _id: "",
    id: 0,
    name: "",
    type: "",
    createDate: "",
    createBy: "",
    members: ["", "", "", ""],
    expenses: [
        {
            expID: 0,
            expName: "",
            date: "",
            paidBy: "",
            amountPaid: 0,
            userShare: 0,
            _id: ""
        },
        {
            expID: 0,
            expName: "",
            date: "",
            paidBy: "",
            amountPaid: 0,
            userShare: 0,
            _id: ""
        },
        {
            expID: 0,
            expName: "",
            date: "",
            paidBy: "",
            amountPaid: 0,
            userShare: 0,
            _id: ""
        }
    ],
    createdAt: "",
    updatedAt: "",
    __v: 0
}

export const ExpenseContext = createContext({
    data: defaultData,
    switchCurrentComp: () => { },
    groupExp: [{}],
    setGroupExp: () => { },
    currentExp: defaultCurrentData,
    setCurrentExp: ()=>{}
})

export const ExpenseProvider = ExpenseContext.Provider

export default function useExpense() {
    return useContext(ExpenseContext)
}