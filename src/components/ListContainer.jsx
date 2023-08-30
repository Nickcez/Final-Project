import { styled } from "styled-components";
import ListItem from "./ListItem";
import { useEffect, useState } from "react";

const ListContainer = ({currentList}) =>
{
    const [total, setTotal] = useState(0)

    //Here we calculate the total price of the items in thee cart, with the current cart as a dependency so we calculate for any modification
    //We verify if the cart is empty and if it is not, we use the reduce method to calculate the total
    //Slice is used to remove the $ sign in the price then parseFloat to transform the string to a float and then toFixed(2) to only keep 2 digits after the period
    useEffect(() =>
    {
        if (currentList !== "empty") {
            const price = currentList.reduce((acc, item) => {return (acc += ((parseFloat(item.chore.slice(1)) * chore.quantity)))}, 0).toFixed(2)
            setTotal(price)
        }
    }, [currentList])

    //We use map to map over all items in the cart (after checking if its empty once again)
    return (
        <CartContain>
            {currentList === "empty" ? (<><Empty>Your List is Empty!</Empty></>) : (
                <>
                    {currentList.map((item) => {return (
                        <CartItem key={item.chore._id} item={item.chore} quantity={item.quantity}/>
                    )})}
                    <Total>Total : {total}</Total>
                </>
            )}

        </CartContain>
    )
}

const Total = styled.div`
    align-self: flex-end;
    justify-self: flex-end;
    font-size: 20px;
`

const CartContain = styled.div`
    width: 50vw;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;

    @media only screen and (max-width: 700px) {
        width: 80vw;
    }
`

const Empty = styled.div`
    font-size: 20px;
`

export default ListContainer;