import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import useExpense from '../../context/expense';
import axios from 'axios';
import { reRenderDisclosure } from './dataHandler';

function DisclosureSelf() {
    const [groupOpen, setGroupOpen] = useState(false);
    const [soloOpen, setSoloOpen] = useState(false);
    const [addingNewGroup, setAddingNewGroup] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const { data, setData, groupExp, setGroupExp, currUser, setCurrentExp, setActive, setGroupAccounts, accounts } = useExpense();

    function getFormattedDate() {
        const date = new Date();

        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits for day
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
        const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

        return `${day}/${month}/${year}`;
    }

    const toggleGroup = () => {
        setGroupOpen(prev => !prev);
    };

    const toggleSolo = () => {
        setSoloOpen(prev => !prev);
    };

    const handleAddNewGroup = () => {
        if (!groupOpen) setGroupOpen(true)
        setAddingNewGroup(true);
        setNewGroupName('');
    };

    const handleRenameNewGroup = (e) => {
        if (e.key === 'Enter') {
            // Logic to save the renamed group goes here
            // console.log('New Group Name:', newGroupName);
            setAddingNewGroup(false);
            submitToDB(currUser, newGroupName)
        }
    };

    const submitToDB = async (currUser, newGroupName) => {
        const createDate = getFormattedDate()
        try {
            const response = await axios.post('/api/expense/groupData/postGroup', {
                currUser,
                newGroupName,
                createDate
            });

            await reRenderDisclosure(data, setData, setGroupExp, currUser)

            // Handle the response if needed
            // console.log('Response:', response.data);
        } catch (error) {
            // Handle the error
            console.error('Error posting group data:', error);
        }
    }

    const changeCurrentExp = (newExp, accounts, setGroupAccounts) => {
        const expense = data.find(expense => expense.id === newExp);

        if (expense) {
            setActive(true);
            setCurrentExp(expense);

            // const accountList = expense.members
            //     .map(memberId => accounts.find(account => account.id === memberId))
            //     .filter(Boolean); // Remove any undefined values if member not found

            // setGroupAccounts(accountList);
        }
    };

    return (
        <div className='bg-[#323238] self-start h-auto inline-block p-5 rounded-[5px]'>
            <div className='mb-5 text-[20px]'>Your expenses</div>

            <div className='w-[184px]'>
                <div className='relative pb-2'>
                    <div className='flex items-center hover:cursor-pointer select-none' onClick={toggleGroup}>
                        <IoIosArrowForward className={`transition-transform duration-200 ${groupOpen ? 'rotate-90' : ''}`} />
                        <div className='ml-1 mr-3'>Group Expenses</div>
                        <FaPlus
                            className='transition-transform duration-200 hover:rotate-90'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents toggling the group on click
                                handleAddNewGroup();
                            }}
                        />
                    </div>

                    <div className={`relative ml-5 overflow-y-auto transition-all duration-300 ${groupOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                        style={{
                            scrollbarWidth: 'auto',
                            scrollbarColor: '#323238 #323238'
                        }}>
                        {groupExp.map(expense => (
                            <div
                                key={expense.id}
                                onClick={() => changeCurrentExp(expense.id, accounts, setGroupAccounts)}
                                className='flex hover:cursor-pointer'>
                                <div>&rarr; </div><div className='w-[140px] h-[25px] truncate'>{expense.expName}</div>
                            </div>
                        ))}
                        {addingNewGroup && (
                            <div className='w-[140px]'>
                                <input
                                    type='text'
                                    className='bg-gray-700 text-white p-1 rounded-[5px] outline-none w-[140px]'
                                    value={newGroupName}
                                    autoFocus
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    onKeyDown={handleRenameNewGroup}
                                    placeholder='New Group'
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='relative'>
                    <div className='flex items-center hover:cursor-pointer select-none'>
                        <IoIosArrowForward className={`transition-transform duration-200 ${soloOpen ? 'rotate-90' : ''}`} onClick={toggleSolo} />
                        <div className='ml-1 mr-3' onClick={toggleSolo}>Solo Expenses</div>
                        <FaPlus className='transition-transform duration-200 hover:rotate-90' />
                    </div>
                    <div className={`relative ml-5 overflow-hidden transition-all duration-300 ${soloOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div>-Haircut</div>
                        <div>-Amusement Park</div>
                        <div>-Arcade</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DisclosureSelf;


