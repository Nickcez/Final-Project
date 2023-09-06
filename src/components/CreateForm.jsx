import { useState } from "react";
import { Container, FormContainer, StyledInput, FormLabel, Formbutton, NameDiv, ButtonContainer, CreateButton, EyeButton, EyeClosedIcon, EyeIcon } from "./LogForm"


const initialState = {username: null, password: null, confirmPassword: null, email: null}

const CreateForm = ({ setStatus }) =>
{
    //See notes in logform as it is pretty much the same
    const [formData, setFormData] = useState(initialState)
    const [seePw, setSeePw] = useState(false)
    const [seeCPw, setSeeCPw] = useState(false)

    const handleChange = (ev) => {
        setFormData({ ...formData, [ev.target.id]: ev.target.value });
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        setFormData({...formData})
    };


    return(
        <Container>
        <h1>Create an account</h1>
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
            <NameDiv>
                <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
                <StyledInput onChange={handleChange} type={seeCPw ? ("text") : ("password")} id="confirmPassword" required/>
                <EyeButton onClick={(ev) => {ev.preventDefault(); setSeeCPw(!seeCPw)}}>{seeCPw ? (<EyeClosedIcon />) : (<EyeIcon />)}</EyeButton>
            </NameDiv>
            <NameDiv>
                <FormLabel htmlFor="email">Email</FormLabel>
                <StyledInput onChange={handleChange} type='email' id="email" required/>
            </NameDiv>
        </FormContainer>
        <ButtonContainer>
            <Formbutton onClick={handleChange}>Confirm</Formbutton>
            <p>Already have an account? <CreateButton onClick={() => {setStatus("login")}}>Log in</CreateButton></p>
        </ButtonContainer>
        
    </Container>
    )
}


export default CreateForm;