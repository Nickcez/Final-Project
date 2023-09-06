import { createContext, useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const value = {
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    }

    const createNewUser =  () => {
        console.log("test");
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
        })
        .catch((err) => {
            console.log(err);
        })
        if (isAuthenticated) {
            fetch("https://pixe.la/v1/users", {
                method: "POST",
                body: JSON.stringify({
                    token: "-Hello8990",
                    username: user.nickname,
                    agreeTermsOfService: "yes",
                    notMinor: "yes"
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
        }

        fetch(`https://pixe.la/v1/users/${user.nickname}/graphs`, {
            method: "POST",
            body: JSON.stringify({
                id: "hello12",
                name: "responsabilities",
                unit: "chores",
                type: "int",
                color: "ichou"
            }),
            headers: {
                "X-USER-TOKEN": "-Hello8990" ,
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
        })
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            fetch(`/api/login/${user.nickname}`)
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200) {
                    setCurrentUser(data.data)
                } else {
                    createNewUser();
                }

            })
        }
    }, [user])

    // useEffect(() => {
    //     fetch(`https://pixe.la/${user.nickname}`)})


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};