import React from 'react'
import { MdDelete } from "react-icons/md";
import useExpense from '../../context/expense';
import { leaveGroup } from './groupHandler';

function LeaveGroup() {
    const { currentExp, currUser, setData, currExp, setCurrentExp, setActive } = useExpense();

    const leaveGrp = async () => {
        let newObj = currentExp
        newObj.members = currentExp.members.filter(member => member !== currUser);
        console.log("function triggered")

        await leaveGroup(currentExp.id, currUser, setData, currExp, setCurrentExp)
        setActive(false)
    }

    return (
        <>
            <div
                className="bg-[#00B37E] mb-[20px] py-2 px-4 rounded-[5px] flex items-center font-semibold text-black gap-3 transition-all duration-200 hover:cursor-pointer hover:scale-[1.04] group"
                onClick={leaveGrp}
            >
                <div>Leave Group</div>
                <MdDelete className='h-[20px] w-[20px]' />
            </div>
        </>
    )
}

export default LeaveGroup
