import React from 'react'
import useExpense from '../../context/expense'

function UserIcon() {
    const { currUser, accounts } = useExpense()

    return (
        <div className='absolute top-[20px] right-[50px] bg-[#323238] py-2 px-5 rounded-[5px]'>
            {accounts.map(account =>
                account.id === currUser && <span key={account.id}>{account.name}</span>
            )}
        </div>
    )
}

export default UserIcon
