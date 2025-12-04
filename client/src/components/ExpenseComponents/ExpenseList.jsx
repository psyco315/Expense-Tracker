import React from 'react'
import ExpenseCard from './ExpenseCard'
import useExpense from '../../context/expense'

function ExpenseList() {
    const { currentExp } = useExpense()

    return (
        <div className={`h-[450px] overflow-y-auto `}
            style={{
                scrollbarWidth: 'auto',
                scrollbarColor: '#015F43 #323238'
            }}
        >
            {currentExp.expenses.map(expense => (
                <ExpenseCard expense={expense} />
            ))}
        </div>
    )
}

export default ExpenseList
