import { useEffect, useState } from "react";
import { createContext } from "react";

import Loading from "./Loading";

export const ListContext = createContext(null);

export const ListProvider = ({ children }) => {
    //This function here will provide a context accessible on the whole website for the cart logic
    //No more fetches will be needed on cart page / checkout / navbar etc to GET the cart

    const [currentList, setCurrentList] = useState("empty");
    const [status, setStatus] = useState("loading");
    const [state, setState] = useState("clear");

    //This state here will be passed in the cart context and will be used everytime we fetch a post/patch/delete on the cart
    //It is as a dependency on the useEffect for the fetch so it will make it possible to re-GET the cart for every modification
    const [triggerModification, setTriggerModification] = useState(0)

    useEffect(() =>
    {
        fetch("/api/list")
            .then((response) => response.json())
            .then((data) =>
            {
                setCurrentList(data.data)
                setStatus("idle")
                setState("clear")
            })
            .catch((err) => {setCurrentList("empty"); setStatus("idle")})
    }, [triggerModification])

    return (
        <>
            {status === "loading" ? (
            <Loading /> ) : (
            <ListContext.Provider value={{ currentList, setTriggerModification, triggerModification, state, setState }}>
                {children}
            </ListContext.Provider>)}
        </>

    );
  };
