import {styled} from "styled-components"
import {FiShoppingCart, FiSearch} from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ListContext } from "./ListContext"

const ListAndSearch = () =>
{
    const [searchTerms, setSearchTerms] = useState("");
    const navigate = useNavigate();

    //those 3 next elements all make it possible to display the number of items in the cart on the navbar, 
    //we use the cart context and useEffect to check everytime if changes. then we use the reduce method to calculate the total

    const {currentList} = useContext(ListContext);

    const [ListNumber, setListNumber] = useState(null)

    useEffect(() => {
        if (currentList !== "empty")
        {
            let qty = currentList.reduce((acc, chore) => {return acc += chore.quantity}, 0)
            setListNumber(qty)
        }
        else {setListNumber(0)}
    }, [currentList])

    //listening for the enter key to make a research
    const enterListener = (ev) =>
    {
        if (ev.key === "Enter") {navSearch()}
    }

    const setSearch = (ev) =>
    {
        setSearchTerms(ev.target.value)
    }

    //for the search we navigate to the products page with a "q" query with the search terms, we use the backend to return only the items with the term
    const navSearch = () =>
    {
        navigate(`/chores?q=${searchTerms}`)
        setSearchTerms("")
    }

    return(
    <Container>
        <Search tabIndex={0}>
            <SearchInput value={searchTerms} onKeyDown={enterListener} onChange={setSearch}></SearchInput>
            <SearchButton onClick={navSearch} disabled={searchTerms ? false : true}><SearchIcon></SearchIcon></SearchButton>
        </Search>
        <LogDiv to={"/list"}><Cart></Cart>{ListNumber ? (<NumberCircle><Number>{ListNumber}</Number></NumberCircle>) : (<></>)}</LogDiv>
        <LogDiv to={"/login"}><Log>Log In</Log></LogDiv>
    </Container>)
}

const Container = styled.div`
    width: fit-content;
    height: 100%;
    display: flex;
    gap: 25px;
    align-items: center;
`

const Search = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    height: 100%;

    &:focus-within {
        color: black;
    }

    &:focus {
        outline: none;
    }
`

const SearchInput = styled.input`
    height: 30px;
    position: absolute;
    right: 0px;
    width: 0px;
    transition: width 0.3s ease;
    visibility: hidden;
    font-size: 18px;
    padding-left: 10px;
    padding-right: 45px;
    border-radius: 5px;
    border: none;
    overflow: scroll;

    &:focus {
        visibility: visible;
        width: 150px;
        outline: none;
    }

    ${Search}:hover & {
        visibility: visible;
        width: 150px;
    }

    ${Search}:focus & {
        visibility: visible;
        width: 150px;
    }
`

const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    height: 100%;
    z-index: 100;
    display: flex;
    align-items: center;

    color: inherit;
`

const SearchIcon = styled(FiSearch)`
    height: 20px;
    width: auto;
    z-index: 105;

    ${Search}:hover & {
        color: black;
    }
`

const Cart = styled(FiShoppingCart)`
    color: white;
    fill: white;
    height: 20px;
    width: auto;
    position: relative;
`

const NumberCircle = styled.div`
    aspect-ratio: 1 !important;
    background-color: red;
    min-width: 17px;
    border-radius: 50%;
    position: absolute;
    bottom: -10px;
    right: -12px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Number = styled.p`
    margin: 2px;
    font-size: 15px;
    font-weight: bold;
    color: white;
`

const Log = styled.div`
    color: white;
    font-size: 20px;
`

const LogDiv = styled(Link)`
    background-color: transparent;
    border: none;
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
`

export default ListAndSearch;