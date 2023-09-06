import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import ListContainer from "./ListContainer";
import { ListContext } from "./ListContext";

//Initial state for the form for the checkout data
const initialState = {
    "chores": []
}

const CheckoutForm = () => {
    const [formData, setFormData] = useState(initialState)
    const {currentList, triggerModification, setTriggerModification} = useContext(ListContext)

    const navigate = useNavigate();
        
    //Function to fetch the mission
    const handleClick = async (ev) => {
    ev.preventDefault();
    
    // Before sending everything, set the chores in the order.
    setFormData({ ...formData, "chores": currentList });
    fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({"order" : formData}),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((json) => {
            setTriggerModification(triggerModification + 1)
            const { status, data } = json;
            if (status === 201) {
            //if order is a success we navigate to their confirmation with their order #
            navigate(`/order/${data}`)
            } else {
            // navigate("/error")
            }
        });

};


    return(
    <Container>
        <ListContainer currentList={currentList} />
        <FormContainer>
            <Formbutton disabled={currentList === "empty" ? true : false} onClick={handleClick}>Alright let's see your graph</Formbutton>
        </FormContainer>
        
    </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    margin-top: 12vh;
    padding: 20px;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    margin-bottom: 35px;

    h1 {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 35px;
    }
`

const FormContainer = styled.form`
    width: 50vw;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    @media only screen and (max-width: 700px) {
        width: 70vw;
    }
`

const PairDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
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
        top: 5px;
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
    width: 49%;
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

const MailDiv = styled.div`
    border-radius: 10px;
    border: 1px solid black;
    width: 100%;
    height: 55px;
    position: relative;
    margin: 5px 0px;
    box-sizing: border-box;

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
    border-style: none;
    width: 50%;
    height: 55px;
    position: relative;
    margin: 5px 0px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    background-color: #0F4AA3;
    box-shadow: rgba(0, 219, 239, 0.4) 2.5px 2.5px, rgba(0, 219, 239, 0.3) 5px 5px, rgba(0, 219, 239, 0.2) 7.5px 7.5px, rgba(0, 219, 239, 0.1) 10px 10px, rgba(240, 46, 170, 0.05) 12.5px 12.5px;


    @media only screen and (max-width: 700px) {
        font-size: 15px;
        height: 45px;
    }
`

export default CheckoutForm;