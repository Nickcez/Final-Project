import Login from "./Login";
import {styled} from "styled-components"

const LandingPage = () => {
    return (
        <Wrapper>
            <Login />
        </Wrapper>
    )
};

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
`

export default LandingPage;