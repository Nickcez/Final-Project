import {styled} from "styled-components";
import { useState } from "react";
import {FiEye, FiEyeOff} from "react-icons/fi"

const initialState = {username: null, password: null}

const LogForm = ({setStatus}) => {

    const [usermame, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    // So we have three states, on for the formdata, one to see the password
    const [formData, setFormData] = useState(initialState);
    const [seePw, setSeePw] = useState(false);

    //We set the formdata on changes in the form
    const handleChange = (ev) => {
        setFormData({ ...formData, [ev.target.id]: ev.target.value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const user = { username, password}

    };

    return (
    <Container>
        <h1>Log In</h1>
        <FormContainer>
            <NameDiv>
                <FormLabel htmlFor="fname">Username</FormLabel>
                <StyledInput onChange={handleChange} type='text' id="username" required/>
            </NameDiv>
            <NameDiv>
                <FormLabel htmlFor="password">Password</FormLabel>
                <StyledInput onChange={handleChange} type={seePw ? ("text") : ("password")} id="password" required/>
                <EyeButton onClick={(ev) => {ev.preventDefault(); setSeePw(!seePw)}}>{seePw ? (<EyeClosedIcon />) : (<EyeIcon />)}</EyeButton>
            </NameDiv>
        </FormContainer>
        <ButtonContainer>
            <Formbutton onClick={handleSubmit}>Log In</Formbutton>
            <p>Don't have an account? <CreateButton onClick={() => {setStatus("create")}}>Create an account</CreateButton></p>
        </ButtonContainer>
    </Container>
    )
}

const Container=styled.div`
    width: 90%;
    height: 95%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h1 {
        font-size: 30px;
    }
`

const FormContainer = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

const StyledInput = styled.input`
    position: absolute;
    top: 7px;
    left: 0px;
    background-color: transparent;
    border: none;
    width: 95%;
    font-size: 18px;
    padding: 10px;
    font-family: sans-serif;

    &:focus {
        border: none;
        outline: none;
    }

    @media only screen and (max-width: 700px) {
        font-size: 13px;
        top: 3px;
    }
`

const FormLabel = styled.label`
    position: absolute;
    top: -7.5px;
    left: 10px;
    padding: 0px 4px;
    background-color: white;
    font-weight: 900;
    font-size: 15px;
    transition: all 0.5s ease-out;

    @media only screen and (max-width: 700px) {
        font-size: 10px;
        top: -5px;
        left: 5px;
    }
`

const NameDiv = styled.div`
    border-radius: 10px;
    border: 1px solid black;
    width: 90%;
    height: 55px;
    position: relative;
    margin: 5px 0px;
    box-sizing: border-box;
    background-color: in;

    &:focus-within {
        outline: black;
        border: 2px solid black;
    }

    @media only screen and (max-width: 800px) {
        height: 42px;
    }
`

const Formbutton = styled.button`
    border-radius: 10px;
    border: 1px solid black;
    width: 50%;
    height: 55px;
    position: relative;
    margin: 5px 0px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    background-color: #0F4AA3;

    @media only screen and (max-width: 700px) {
        font-size: 15px;
        height: 45px;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    p {
        font-size: 12px;
    }
`

const CreateButton = styled.button`
        background-color: transparent;
        border: none;
        color: #0F4AA3;
        font-size: 12px;
        padding: 0px;
        margin: 0px;
        text-decoration: underline;

        &:hover {
            cursor: pointer;
        }
`

const EyeButton = styled.button`
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    border: none;
`

const EyeIcon = styled(FiEye)`
    position: absolute;
    top: 15px;
    right: 13px;
    height: 25px;
    width: auto;

    @media only screen and (max-width: 800px) {
        top: 10px;
        right: 10px;
        height: 20px;
    }
`

const EyeClosedIcon = styled(FiEyeOff)`
    position: absolute;
    top: 15px;
    right: 13px;
    height: 25px;
    width: auto;

    @media only screen and (max-width: 800px) {
        top: 10px;
        right: 10px;
        height: 20px;
    }
`

const Notification = styled.div`
    font-size: 12px;
    text-align: center;
`


export {Container, FormContainer, StyledInput, FormLabel, Formbutton, NameDiv, ButtonContainer, CreateButton, EyeButton, EyeClosedIcon, EyeIcon, Notification}

export default LogForm;