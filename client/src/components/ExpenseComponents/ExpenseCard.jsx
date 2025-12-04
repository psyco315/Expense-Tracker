import React, { useState } from 'react';
import useExpense from '../../context/expense';

// green: bg-[#015F43]   black: bg-[#323238]

function ExpenseCard(props) {
    const expense = props.expense;
    const [isExpanded, setIsExpanded] = useState(false); // State for managing expansion

    const monthMap = {
        "01": "JAN",
        "02": "FEB",
        "03": "MAR",
        "04": "APR",
        "05": "MAY",
        "06": "JUN",
        "07": "JUL",
        "08": "AUG",
        "09": "SEP",
        "10": "OCT",
        "11": "NOV",
        "12": "DEC",
    };

    const { accounts, currUser } = useExpense();
    let owe = true;
    let amIinThere = false;
    let oweAmount = 0;

    if (expense.paidBy == currUser) {
        amIinThere = true;
        owe = false;
    }

    for (let guy in expense.sharedBy) {
        if (expense.sharedBy[guy] == currUser) {
            amIinThere = true;
            if (owe) {
                oweAmount = expense.amountPaid / expense.sharedBy.length;
            } else {
                oweAmount = (expense.amountPaid / expense.sharedBy.length) * (expense.sharedBy.length - 1);
            }
            break;
        } else {
            oweAmount = expense.amountPaid;
        }
    }

    oweAmount = Number.isInteger(oweAmount) ? oweAmount : oweAmount.toFixed(1);

    // Toggle expanded state
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div
            className={`bg-[#323238] rounded-[5px] flex flex-col px-5 py-3 mb-[5px] cursor-pointer transition-all duration-300 ${isExpanded ? 'pb-5' : ''
                }`}
            onClick={toggleExpand} // Toggle expansion on click
        >
            {/* Main Row */}
            <div className="flex justify-between items-center">
                <div className="flex gap-5">
                    {/* Date */}
                    <div className="bg-[#404042] flex flex-col items-center h-[65px] w-[65px] rounded-[5px]">
                        <div className="pt-[2.5px]">{monthMap[expense.date.slice(3, 5)]}</div>
                        <div className="text-[25px]">{expense.date.slice(0, 2)}</div>
                    </div>

                    {/* Expense Info */}
                    <div className="flex flex-col w-[320px]">
                        <div className="text-[25px]">{expense.expName}</div>
                        <div>
                            {accounts.map((account) => {
                                if (account.id === expense.paidBy) {
                                    if (account.id == currUser) return 'You';
                                    return account.name;
                                }
                            })}{' '}
                            paid {expense.amountPaid}
                        </div>
                    </div>
                </div>

                {/* Owe Info */}
                <div className="flex flex-col items-center w-[96px]">
                    <div>{owe ? 'You owe' : 'You are owed'}</div>
                    <div className={`text-[25px] ${amIinThere ? (owe ? 'text-red-500' : 'text-green-500') : 'text-white'}`}>
                        {amIinThere ? oweAmount : 'Nothing'}
                    </div>
                </div>
            </div>

            {/* Expanded Section */}
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isExpanded ? 'max-h-[100px]' : 'max-h-0'
                    }`}
            >
                <div className="mt-4 bg-[#404042] rounded-[5px] p-3">
                    <div className="font-semibold mb-2">Split among:</div>
                    <div className="flex gap-2 flex-wrap">
                        {expense.sharedBy.map((id) => (
                            <span key={id} className="bg-[#015F43] text-white py-1 px-3 rounded-full text-sm">
                                {accounts.map(account => (account.id == id && account.name))}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpenseCard;
