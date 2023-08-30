import { styled } from "styled-components";
import ListContainer from "./ListContainer";
import { useContext } from "react";
import { ListContext } from "./ListContext";
import { useNavigate } from "react-router-dom";

const List = () =>
{
    //Always using the cartcontext to get the current cart
    const {currentList} = useContext(ListContext);
    const navigate = useNavigate();

    return(
    <Container>
        <h1>Your List:</h1>
        <ListContainer currentList={currentList}/>
        {/*Displaying the checkoutbtn only if items are in the cart*/}
        {currentList === "empty" ? (<></>) : (<CheckoutBtn onClick={() => navigate("/checkout")}>Checkout</CheckoutBtn>)}
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