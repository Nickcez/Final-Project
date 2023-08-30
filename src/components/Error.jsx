import { styled } from "styled-components";

const Error = () => {
    return (
    <Container>
        <h2>Uh-Oh</h2>
        <h1>404</h1>
        <h3>Looks like your'e lost...</h3>
        <h4>Go back to the home page or come back later if the problem persists.</h4>
    </Container>
    )
}

const Container = styled.div`
    height: 92vh;
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    h1 {
        font-size: 150px;
        padding: 5vh 0;
    }

    h2 {
        font-size: 50px;
    }
    
    h3, h4 {
        font-size: 20px;
    }
`

export default Error;