import React, { useState, useEffect } from "react";
import useExpense from "../../context/expense";
import { postSingleExpense, rerender } from "./postExpense";

function AddExpPopup({ onClose }) {
    const { accounts, currentExp, currUser, data, setData, setCurrentExp, groupAccounts, setEndResult } = useExpense();
    const [expenseName, setExpenseName] = useState("");
    const [amountPaid, setAmountPaid] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [checkboxError, setCheckboxError] = useState(false); // State to handle checkbox validation
    

    // Handle checkbox changes
    const handleCheckboxChange = (id) => {
        setCheckboxError(false); // Clear error when a checkbox is selected
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((member) => member !== id)
                : [...prev, id]
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedMembers.length === 0) {
            setCheckboxError(true);
            return;
        }
        await postSingleExpense(
            currentExp, expenseName, amountPaid, selectedMembers, currUser,
            setExpenseName, setAmountPaid, setSelectedMembers, paidBy, setPaidBy,
            rerender, setData, setCurrentExp, groupAccounts, setEndResult
        );
        onClose(); // Close the popup after submission
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#323238] text-white w-[400px] rounded-lg shadow-lg p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-center text-lg font-semibold mb-4">
                    Add New Expense
                </h2>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Expense Name */}
                    <div>
                        <label className="block text-sm mb-1" htmlFor="expenseName">
                            Expense Name
                        </label>
                        <input
                            type="text"
                            id="expenseName"
                            value={expenseName}
                            onChange={(e) => setExpenseName(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                            placeholder="e.g., Dinner"
                            required
                        />
                    </div>

                    {/* Amount Paid */}
                    <div>
                        <label className="block text-sm mb-1" htmlFor="amountPaid">
                            Amount Paid
                        </label>
                        <input
                            type="number"
                            id="amountPaid"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                            placeholder="e.g., 100"
                            required
                        />
                    </div>

                    {/* Paid By */}
                    <div>
                        <label className="block text-sm mb-2">Paid by</label>
                        <div className="flex flex-col gap-2">
                            {accounts.map((account) => (
                                <label
                                    key={account.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="radio"
                                        name="paidBy"
                                        value={account.id}
                                        onChange={() => setPaidBy(account.id)}
                                        className="text-[#00B37E] focus:ring-[#00B37E]"
                                    />
                                    {account.name}
                                </label>
                            ))}
                        </div>
                        {checkboxError && (
                            <p className="text-red-500 text-sm mt-1">
                                Please select at least one account.
                            </p>
                        )}
                    </div>

                    {/* Distributed Among */}
                    <div>
                        <label className="block text-sm mb-2">Distribute Among</label>
                        <div className="flex flex-col gap-2">
                            {accounts.map((account) => (
                                <label
                                    key={account.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        value={account.id}
                                        checked={selectedMembers.includes(account.id)}
                                        onChange={() => handleCheckboxChange(account.id)}
                                        className="rounded text-[#00B37E] focus:ring-[#00B37E]"
                                    />
                                    {account.name}
                                </label>
                            ))}
                        </div>
                        {checkboxError && (
                            <p className="text-red-500 text-sm mt-1">
                                Please select at least one account.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-[#00B37E] text-black font-semibold py-2 px-4 rounded hover:scale-105 transition-transform"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddExpPopup;
