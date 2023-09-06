import {styled} from "styled-components";
import { useState } from "react";
// import LogForm from "./LogForm";
// import CreateForm from "./CreateForm";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLogIn } from "react-icons/fi"

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
    
    // const [status, setStatus] = useState("login")
    // return (
    // <Container>
    //     <LogContainer>
    //         {status === "login" ? (<LogForm setStatus={setStatus} />) : (<CreateForm setStatus={setStatus} />)}
    //     </LogContainer>
    // </Container>
    // )
//}

const Log = styled(FiLogIn)`
    color: white;
    font-size: 20px;
`

const Container = styled.div`
    margin-top: 5vh;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LogContainer = styled.div`
    width: 30vw;
    aspect-ratio: 0.8;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1000px) {
        width: 45vw;
    }

    @media only screen and (max-width: 800px) {
        width: 60vw;
    }

    @media only screen and (max-width: 450px) {
        width: 80vw;
        aspect-ratio: 0.75;
    }
`

export default Login;