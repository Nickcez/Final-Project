import { styled } from "styled-components";
import ListContainer from "./ListContainer";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "./ListContext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";

const List = () => {
    //Always using the cartcontext to get the current cart
    const {currentList} = useContext(ListContext);
    const [ graph, setGraph ] = useState();
    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pixe.la/v1/users/${user.nickname}/graphs/hello12`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                },
        })
        // .then((res) => {
        //     console.log(res);
        //     return (
        //         res.json()
        //     )
        // })
        .then((svg) => {
            setGraph(svg);
            console.log(svg);
        })
        }, [])


    return (
    <Container>
        <Profile />
        <h1>Your completed chores: </h1>
        <ListContainer currentList={currentList}/>
        {/*Displaying the checkoutbtn only if chores are in the cart*/}
        {/* {currentList === "empty" ? (<></>) : (<CheckoutBtn onClick={() => navigate("/checkout")}>Completely Done ??</CheckoutBtn>)} */}
        <img src={`https://pixe.la/v1/users/${user.nickname}/graphs/hello12`} alt="Pixela Graph"></img>
    </Container>
    )
}

const Container = styled.div`
    margin-top: 15vh;
    min-height: 89vh;
    width: 100vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 40px;

    h1 {
        font-size: 30px;
    }
`

const CheckoutBtn = styled.button`
    width: 50%;
    height: 40px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 15px;
    background-color: #0F4AA3;
    box-shadow: rgba(0, 219, 239, 0.4) 2.5px 2.5px, rgba(0, 219, 239, 0.3) 5px 5px, rgba(0, 219, 239, 0.2) 7.5px 7.5px, rgba(0, 219, 239, 0.1) 10px 10px, rgba(240, 46, 170, 0.05) 12.5px 12.5px;
    margin-bottom: 25px;
`



export default List;