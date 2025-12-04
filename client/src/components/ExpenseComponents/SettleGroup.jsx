import React from 'react'
import { TiTick } from "react-icons/ti";

function SettleGroup() {
    return (
        <>
            <div
                className="bg-[#00B37E] mb-[20px] py-2 px-4 rounded-[5px] flex items-center font-semibold text-black gap-3 transition-all duration-200 hover:cursor-pointer hover:scale-[1.04] group"
            >
                <div>Settle Group</div>
                <TiTick className='h-[20px] w-[20px]' />
            </div>
        </>
    )
}

export default SettleGroup
