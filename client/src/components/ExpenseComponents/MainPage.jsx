import React, { useEffect, useState } from 'react'
import wallpaper from '../../assets/Untitled.png'
import { ExpenseProvider } from '../../context/expense'
import { getFullData, populateExpenses, getAccounts } from './dataHandler'
import runThisShi from './debtHandler'
import {
    AddExpense,
    DisclosureSelf,
    ExpenseCard,
    ExpenseDashboard,
    ExpenseList,
    Settle,
    UserIcon,
    LeaveGroup,
    SettleGroup
} from './componentHandler'

function MainPage() {
    const [data, setData] = useState([
        {
            _id: "",
            id: 0,
            name: "",
            type: "",
            createDate: "",
            createBy: "",
            members: [],
            expenses: [],
            createdAt: "",
            updatedAt: "",
            __v: 0
        }
    ]);
    const [accounts, setAccounts] = useState([
        {
            email: "xyz@gmail.com",
            id: "120",
            name: "parth",
            password: "12345",
            _id: "67421dd634bd8177395a2c0b"
        },
        {
            email: "xyz@gmail.com",
            id: "121",
            name: "shaan",
            password: "12345",
            _id: "67421def34bd8177395a2c0c"
        },
        {
            email: "xyz@gmail.com",
            id: "122",
            name: "ashish",
            password: "12345",
            _id: "67421dfe34bd8177395a2c0d"
        },
        {
            email: "xyz@gmail.com",
            id: "123",
            name: "abhinav",
            password: "12345",
            _id: "67421e1634bd8177395a2c0e"
        },
    ])
    const [groupAccounts, setGroupAccounts] = useState([
        {
            email: "xyz@gmail.com",
            id: "120",
            name: "parth",
            password: "12345",
            _id: "67421dd634bd8177395a2c0b"
        },
        {
            email: "xyz@gmail.com",
            id: "121",
            name: "shaan",
            password: "12345",
            _id: "67421def34bd8177395a2c0c"
        },
        {
            email: "xyz@gmail.com",
            id: "122",
            name: "ashish",
            password: "12345",
            _id: "67421dfe34bd8177395a2c0d"
        },
        {
            email: "xyz@gmail.com",
            id: "123",
            name: "abhinav",
            password: "12345",
            _id: "67421e1634bd8177395a2c0e"
        },
    ])
    // useEffect(() => {
    //     console.log(groupAccounts)
    //     console.log("Group acc changed")
    //     console.log(groupAccounts)
    // }, [groupAccounts])


    const [groupExp, setGroupExp] = useState([{}])
    const [currentExp, setCurrentExp] = useState({
        _id: "",
        id: 0,
        name: "",
        type: "",
        createDate: "",
        createBy: "",
        members: [],
        expenses: [],
        createdAt: "",
        updatedAt: "",
        __v: 0
    })
    const [active, setActive] = useState(false)
    const [endResult, setEndResult] = useState({})
    const [currUser, setCurrUser] = useState('120')


    useEffect(() => {
        getFullData(setData, currUser)
    }, [])

    useEffect(() => {
        populateExpenses(data, setGroupExp)
    }, [data])

    useEffect(() => {
        if (active) runThisShi(groupAccounts, currentExp, setEndResult)
    }, [currentExp])

    return (
        <ExpenseProvider value={{
            data, setData,
            groupExp, setGroupExp,
            currentExp, setCurrentExp,
            active, setActive,
            accounts, setAccounts,
            groupAccounts, setGroupAccounts,
            endResult, setEndResult,
            currUser, setCurrUser
        }}>
            <div className={`w-screen h-screen overflow-hidden relative flex justify-evenly text-white bg-cover bg-center bg-no-repeat hover:cursor-default`} style={{ backgroundImage: `url(${wallpaper})` }}>
                <UserIcon />

                <div className='w-screen flex justify-center mt-10'>
                    <DisclosureSelf />

                    <div className='flex flex-col items-center hover:cursor-default w-[550px] ml-[40px] mr-[63px]'>
                        {!active && (
                            <div className='bg-[#323238] text-center inline-block py-2 px-5 font-semibold text-[20px] rounded-[5px]'>
                                Select an expense
                            </div>
                        )}
                        {active && (<>
                            <div className='bg-[#323238] w-fit text-center inline-block py-2 px-5 mb-[10px] rounded-[5px] '>
                                <div className='text-[30px] mb-[5px] max-w-[400px] truncate'>
                                    {currentExp.name}
                                </div>
                                <div className='text-[15px] text-white text-opacity-60'>
                                    created by: {accounts.map((account) => (
                                        account.id === currentExp.createBy && (account.name)
                                    ))} <br />
                                    created on: {currentExp.createDate}
                                </div>
                            </div>

                            <div className='flex gap-2'>
                                <AddExpense />
                                <SettleGroup />
                                <LeaveGroup />
                            </div>
                            <ExpenseList />
                        </>
                        )}
                    </div>

                    <div className={`flex flex-col items-center w-[230px]`}>
                        <ExpenseDashboard />
                        {active && <Settle />}
                    </div>
                </div>
            </div>
        </ExpenseProvider>
    )
}

export default MainPage
