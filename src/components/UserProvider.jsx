import { createContext, useState, useContext } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const value = {
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    }
    
    useEffect(() => {
        fetch("/api/login")
            .then((response) => response.json())
            .then((data) => {
                setCurrentUser(data.data)
                setStatus("idle")
                setState("clear")
            })
            .catch((err) => {setCurrentList("empty"); setStatus("idle")})
    }, [])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};