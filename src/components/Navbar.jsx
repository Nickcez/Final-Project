import {styled} from "styled-components"
import ListAndSearch from "./ListAndSearch";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
    <Container>
        <DebutContainer>
            <HomeLink to={"/"}>My App</HomeLink>
        </DebutContainer>
        <ListAndSearch />
        <CatBar>
            <CatLink to={"/chores?physicalTax=Low"}>Low</CatLink>
            <CatLink to={"/chores?physicalTax=Medium"}>Medium</CatLink>
            <CatLink to={"/chores?physicalTax=High"}>High</CatLink>
        </CatBar>
    </Container>
    )
}

const Container = styled.nav`
    top: 0px;
    left: 0px;
    background-color: black;
    height: 8vh;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    position: fixed;
    border-bottom: 1px solid white;

    z-index: 99;
`

const HomeLink = styled(Link)`
    color: white;
    font-size: 32px;
    font-weight: 900;
    padding: 0;
    text-decoration: none;
`

const DebutContainer = styled.div`
    display: flex;
`

const CatBar = styled.div`
    background-color: black;
    position: absolute;
    top: 101%;
    left: 0px;
    width: 100vw;
    height: 4vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: scroll;
`

const CatLink = styled(Link)`
    background-color: transparent;
    font-size: 18px;
    color: white;
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0px 20px;
    width: 100%;
    justify-content: center;
`

export default Navbar;