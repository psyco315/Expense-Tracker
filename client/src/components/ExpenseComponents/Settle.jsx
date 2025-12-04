import React from 'react'

function Settle() {
    return (
        <div className='flex flex-col items-center mt-[20px]'>
            <div className='flex flex-col items-center'>
                <div className='text-[25px]'>Settle your debt</div>
                <div className='text-white text-opacity-50'>your friends will love you for this</div>
            </div>
            <div className='bg-[#00B37E] py-1 px-5 mt-3 text-black rounded-[5px] font-semibold transition-all duration-200 hover:cursor-pointer hover:scale-[1.04]'>
                Pay Now
            </div>
        </div>
    )
}

export default Settle
