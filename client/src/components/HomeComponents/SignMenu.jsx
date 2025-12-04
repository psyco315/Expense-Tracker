import React from 'react'
import useSign from '../../context/sign'

function SignMenu() {
    const { currentComp, switchCurrentComp } = useSign()

    return (
        <div className='text-center flex-row justify-center items-center'>
            <div className='bg-[#00B37E] px-20 py-10 rounded-[5px] my-[50px] hover:cursor-pointer hover:scale-[1.02] transition duration-100' onClick={()=>{switchCurrentComp('signIn')}}>
                <div className='text-[35px]'>Sign In</div>
                <div className='opacity-80'>to an existing account</div>
            </div>
            <div className='bg-[#00B37E] px-20 py-10 rounded-[5px] my-[50px] hover:cursor-pointer hover:scale-[1.02] transition duration-100' onClick={()=>{switchCurrentComp('signUp')}}>
                <div className='text-[35px]'>Sign Up</div>
                <div className='opacity-80'>for a new account</div>
            </div>
        </div>
    )
}

export default SignMenu
