import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import useSign from '../../context/Sign'

function SignBackBtn() {
    const { currentComp, switchCurrentComp } = useSign()

    return (
        <div className='absolute top-5 left-5 flex justify-center items-center p-5 rounded-full bg-[#00B37E] hover:cursor-pointer hover:scale-[1.02]' onClick={()=>{ switchCurrentComp('menu') }}>
            <FaArrowLeft />
        </div>
    )
}

export default SignBackBtn
