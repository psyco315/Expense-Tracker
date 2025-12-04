import { createContext, useContext } from "react";

export const SignContext = createContext({
    currentComp: 'menu',
    switchCurrentComp: ()=>{}
})

export const SignProvider = SignContext.Provider

export default function useSign(){
    return useContext(SignContext)
}