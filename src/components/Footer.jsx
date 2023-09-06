import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Footer = () =>
{
    return (
    <Container>
        <DebutContainer>
            <HomeLink to={"/homepage"}>My App</HomeLink>
        </DebutContainer>    
        <CatBar>
            <InfoLink to={"/about"}>Why use this app ??</InfoLink>
            {/* <CatLink to={"/products?category=Fitness"}>Fitness</CatLink>
            <CatLink to={"/products?category=Entertainment"}>Entertainement</CatLink>
            <CatLink to={"/products?category=Lifestyle"}>Lifestyle</CatLink>
            <CatLink to={"/products?category=Medical"}>Medical</CatLink>
            <CatLink to={"/products?category=Industrial"}>Industrial</CatLink>
            <CatLink to={"/products?category=Pets and Animals"}>Animal</CatLink> */}
        </CatBar>   
    </Container>)
}

const Container = styled.div`
    background-color: black;
    height: 12vh;
    width: 100vw;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    gap: 40px;
    position: relative;
    overflow: hidden;


    @media only screen and (max-width: 600px) {
        gap: 20px;
        padding: 5px 10px;
    }
`

const HomeLink = styled(Link)`
    color: white;
    font-size: 32px;
    font-weight: 900;
    padding: 0;
    text-decoration: none;
`

const CatBar = styled.div`
    background-color: black;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @media only screen and (max-width: 600px) {
        justify-content: left;
        align-items: flex-start;
    }
`

const CatLink = styled(Link)`
    background-color: transparent;
    font-size: 18px;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 5px 20px;
    justify-content: center;

    @media only screen and (max-width: 600px) {
        font-size: 10px;
        padding: 2px 10px;
        height: fit-content;
    }
`

const InfoLink = styled(Link)`
background-color: transparent;
font-size: 18px;
color: white;
text-decoration: none;
display: flex;
align-items: center;
padding: 5px 20px;
justify-content: center;

@media only screen and (max-width: 600px) {
    font-size: 10px;
    padding: 2px 10px;
    height: fit-content;
}
`

const DebutContainer = styled.div`
    display: flex;
`

export default Footer;
