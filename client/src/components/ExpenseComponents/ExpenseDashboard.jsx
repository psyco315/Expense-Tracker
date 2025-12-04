import React from 'react'
import useExpense from '../../context/expense'

function ExpenseDashboard() {
    const { active, endResult, accounts, currUser } = useExpense()
    return (
        <div className={`bg-[#323238] px-7 py-5 rounded-[5px] flex flex-col w-auto`}>
            {/* self-start */}
            {active && (
                <>
                    {Object.entries(endResult).map(([id, value]) => {
                        let name = 'not-found'

                        accounts.forEach(account => {
                            if (account.id == id) {
                                name = account.name
                                if(id == currUser){
                                    name = 'You'
                                }
                            }
                        })

                        if (value < 0) {
                            return (
                                <div key={id} className='text-center p-0 m-0 max-w-[175px] hover:cursor-pointer'>
                                    <div className='text-center'>{name}  <p className='inline text-green-500'>{name==='You'? 'get': 'gets'}</p> {Math.abs(value)}</div>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div key={id} className='text-center p-0 m-0 max-w-[175px] hover:cursor-pointer'>
                                    <div className='text-center'>{name}  <p className='inline text-red-500'>{name==='You'? 'give': 'gives'}</p> {value}</div>
                                </div>
                            )
                        }
                    })}
                </>
            )}
            {!active && (
                <>
                    <div className='text-center'>No Debt</div>
                </>
            )}
        </div>
    )
}

export default ExpenseDashboard
