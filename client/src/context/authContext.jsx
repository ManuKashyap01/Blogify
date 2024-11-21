import { createContext,useState,useEffect } from "react"
import axios from "axios"
export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    const [curruser, setcurruser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    
    const login=async(inputs)=>{
        await axios.post('auth/login',inputs,{withCredentials:true})
        .then(res=>{
            console.log('res',res.data.user)
            setcurruser({...res.data.user})
            // console.log("The user in auth",curruser)
        })
    }

    const logout=async(inputs)=>{
        await axios.post('auth/logout')
        .then(res=>{
            console.log(res.data)
        })
        setcurruser(null)
    }

    useEffect(() => {
        console.log("in useeffect",curruser)
        localStorage.setItem('user',JSON.stringify(curruser))
    }, [curruser])
    // the second argument in useeffect is to listen for change in the passed value for this case, curruser is that value
    
    return (
        <AuthContext.Provider value={{curruser,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}