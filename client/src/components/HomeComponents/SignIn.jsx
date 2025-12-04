import React from 'react'
import useSign from '../../context/Sign'

function SignIn() {
    const { currentComp, switchCurrentComp } = useSign()

    const handleSubmit = (e)=>{
        e.preventDefault()
        window.location.href = 'http://localhost:5173/expenses';
    }
    
    return (
        <div className='bg-[#00B37E] px-20 py-10 rounded-[5px] hover:cursor-default'>
            <div className='pb-10'><p className='text-[20px]'>Don't be stingy about money with your friends</p> <p className='text-[15px] opacity-60'>(without us)</p></div>

            <div>
                <form action="" onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <label htmlFor="signInEmail">E-mail ID</label>
                        <input className='text-black p-1 ml-5 rounded-[5px]' type="email" id="signInEmail" name="signInEmail" />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="signInPassword">Password</label>
                        <input className='text-black p-1 ml-5 rounded-[5px]' type="password" id="signInPassword" name="signInPassword" />
                    </div>
                    <div className='mt-8 bg-white text-black inline-block py-2 px-5 rounded-[5px] hover:cursor-pointer hover:scale-[1.02] transition duration-100'>
                        <input className='cursor-pointer' type="submit" value="Sign In" />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignIn
