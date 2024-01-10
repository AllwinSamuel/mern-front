import { createContext ,useEffect,useState} from "react";
import Cookies from "universal-cookie";

export const UserContext = createContext({})

export const UserContextProvider =({children})=>{
    const cookies = new Cookies()
   
    const [author,setAuthor] = useState(cookies.get("userauth"))
    return (
        <UserContext.Provider value={{author,setAuthor}}>
            {children}
        </UserContext.Provider>
    )
}