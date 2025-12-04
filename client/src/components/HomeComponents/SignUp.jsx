import React from 'react'
import useSign from '../../context/sign'

function SignUp() {
    const { currentComp, switchCurrentComp } = useSign()

    const handleSubmit = (e)=>{
        e.preventDefault()
        window.location.href = 'https://expense-tracker-client-blush.vercel.app/expenses';
    }

    return (
        <div className='bg-[#00B37E] px-20 py-10 rounded-[5px] hover:cursor-default'>
            <div className='pb-10'><p className='text-[20px]'>Get ready to be a pain in the a**</p> <p className='text-[15px] opacity-60'>(and we'll help you do it)</p></div>

            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div className="py-2 flex items-center">
                        <label htmlFor="signUpName" className="w-1/3">Name</label>
                        <input className="text-black p-1 ml-5 rounded-[5px] w-2/3" type="text" id="signUpName" name="signUpName" />
                    </div>
                    <div className="py-2 flex items-center">
                        <label htmlFor="signUpEmail" className="w-1/3">E-mail ID</label>
                        <input className="text-black p-1 ml-5 rounded-[5px] w-2/3" type="email" id="signUpEmail" name="signUpEmail" />
                    </div>
                    <div className="py-2 flex items-center">
                        <label htmlFor="signUpPassword" className="w-1/3">Password</label>
                        <input className="text-black p-1 ml-5 rounded-[5px] w-2/3" type="password" id="signUpPassword" name="signUpPassword" />
                    </div>
                    <div className="mt-8 bg-white text-black inline-block py-2 px-5 rounded-[5px] hover:cursor-pointer hover:scale-[1.02] transition duration-100">
                        <input className="cursor-pointer" type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
