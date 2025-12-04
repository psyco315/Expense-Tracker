import React, { useEffect, useState } from 'react'
import { SignProvider } from '../../context/sign.jsx'
import SignMenu from './SignMenu'
import SignUp from './SignUp'
import SignIn from './SignIn'
import SignBackBtn from './SignBackBtn'

function HomePage() {
    const [currentComp, setCurrentComp] = useState('menu')

    const switchCurrentComp = (newComp) => {
        setCurrentComp(newComp)
    }

    return (
        <SignProvider value={{ currentComp, switchCurrentComp }}>
            <div className='relative w-screen h-screen text-white flex justify-center items-center'>
                <div className='h-full w-1/2 bg-[#1F1F29] flex items-center justify-center'>
                    <div className='relative top-[-25px] text-center flex-row justify-center items-center hover:cursor-default'>
                        <div className='my-[8px] text-[75px]'>PayShare</div>
                        <div className='my-[8px] text-[25px] opacity-50'>You enjoy your trip, we'll handle the messy part</div>
                    </div>
                </div>

                <div className='h-full bg-[#015F43] w-1/2 text-center flex justify-center items-center relative'>
                    {currentComp === 'menu' && (<>
                        <SignMenu />
                    </>)}
                    {currentComp === 'signIn' && (<>
                        <SignBackBtn />
                        <SignIn />
                    </>)}
                    {currentComp === 'signUp' && (<>
                        <SignBackBtn />
                        <SignUp />
                    </>)}
                </div>
            </div>
        </SignProvider>
    )
}

export default HomePage
