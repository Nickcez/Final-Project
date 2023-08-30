import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ListContext } from "./ListContext";
import {FiTrash2} from "react-icons/fi"

let deletetime;

const CartItem = ({item, quantity}) =>
{
    //Those states are used to keep track of the qty in cart, total price and quantity left if user adds more than possible
    const [qty, setQty] = useState(quantity);
    const [qtyLeft, setQtyLeft] = useState(null);

    const {setTriggerModification, triggerModification} = useContext(CartContext)

    const navigate = useNavigate()

    //This is the + button, the timeout thing will be explained in the next button
    //We set a max quantity of 10, why? we dont want user to buy more than 10 per items. why? i dont know it was my personal decision
    //so then we set the new qty and send a update fetch to update the quantity in the backend
    //Note:  we set the quantity here and take care in the fetch of changing it back if there's not enough in stock because it makes the experience more responsive
    const updateQtyAdd = () =>
    {
        clearTimeout(deletetime)
        if ((qty + 1) > 10) {return}
        setQty(Number(qty) + 1)
        updateFetch(Number(qty) + 1)
    }


    //Exact same thing as the + button but we also have the setTimeout here
    //The set timeout will be used to delete an item from the cart if the quantity is put to 0
    //We use a set timeout because maybe the user erased the quantity to change it or put it to 0 by accident
    //So they have 5 seconds to change it back to more than 0, if they dont we assume they want to delete the item
    //If they do change it back the timeout is cleared
    const updateQtyLess = () =>
    {
        if ((qty - 1) < 0) {return}
        clearTimeout(deletetime)
        setQty(Number(qty) - 1)
        if (Number(qty - 1) > 0) {updateFetch(Number(qty) - 1)}
        else {
            deletetime = setTimeout(() =>
            {
                deleteFetch()
            }, 4000)
        }
    }

    //This is the same as the two last functions but combined if the user enters the input by himself instead of using the buttons
    const updateQtyInpt = (ev) =>
    {
        clearTimeout(deletetime)

        if (!Number.isInteger(Number(ev.target.value)) || Number(ev.target.value) > 10) {return}

        setQty(Number(ev.target.value))

        if (Number(ev.target.value) > 0) {updateFetch(Number(ev.target.value))}
        else {
            deletetime = setTimeout(() =>
            {
                deleteFetch()
            }, 4000)
        }
    }

    //This useEffect is used to change the price each time the quanity changes (total price for specific item)
    // useEffect(() =>
    // {
    //     setPrice((parseFloat(item.price.slice(1)) * qty).toFixed(2))
    //     // eslint-disable-next-line
    // }, [qty])

    //This is the fetch to update quantity
    const updateFetch = (newQty) =>
    {
        fetch("/api/list", {
            method: "PATCH",
            body: JSON.stringify({"chore" : item,
                                "quantity": newQty}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                //Important line here, we use the trigger modification from the cartcontext to make the useeffect GET the new cart after its changed
                setTriggerModification(triggerModification + 1)
                const { status, leftQuantity } = json;
                if (status === 201) {
                return;
                } else if (status === 400) {
                    // If we have this status here that means there's not enough in stock so we setQtyLeft to display a message and set the QTY to the quantity in the cart context
                    setQty(quantity)
                    setQtyLeft(leftQuantity)
                } else {
                navigate("/error")
                }
            });
    }

    //same concept as the update fetch but to delete a product
    const deleteFetch = () =>
    {
        fetch(`/api/list/${chore._id}`, {
            method: "DELETE"
            })
            .then((res) => res.json())
            .then((json) => {
                setTriggerModification(triggerModification + 1)
                const { status } = json;
                if (status === 200) {
                return;
                } else {
                navigate("/error")
                }
            });
    }

    return (
    <Container>
        {/* <ImgContainer>
            <Image src={item.imageSrc}/>
        </ImgContainer> */}
        <DescContainer>
            <ItemDesc>
                <h2>{item.name}</h2>
                <QtyTotalDiv>
                    <p>Quantity: </p>
                    <QtyDiv>
                        <QtyBtn onClick={updateQtyLess}>-</QtyBtn>
                        <QtyInput onChange={updateQtyInpt} value={qty} />
                        <QtyBtn onClick={updateQtyAdd}>+</QtyBtn>
                    </QtyDiv>
                </QtyTotalDiv>
                
            </ItemDesc>
            <PriceDiv>
                <TrashButton onClick={deleteFetch}><Trash /></TrashButton>
            </PriceDiv>
        </DescContainer>
    </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    border-radius: 20px;
    border: 1px solid black;
    padding: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
`

const ImgContainer = styled.div`
    width: 20%;
    aspect-ratio: 1;
    object-fit: cover;
    overflow: hidden;
    border-radius: 15px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const DescContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`

const ItemDesc = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 100px;
    gap: 4px;

    h2 {
        font-size: 16px;
    }

    p {
        font-size: 14px;
        font-weight: bold;
    }

    @media only screen and (max-width: 700px) {
        min-height: 60px;

        h2 {
            font-size: 12px;
        }

        p {
            font-size: 10px;
        }
    }
`

const Price = styled.div`
    font-size: 25px;

    @media only screen and (max-width: 700px) {
        font-size: 17px;
    }
`

const QtyTotalDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

const QtyDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
`

const QtyInput = styled.input`
    width: 20px;
    aspect-ratio: 1;
    background-color: transparent;
    border-radius: 3px;
    border: none;
    font-size: 15px;
    text-align: center;
    font-weight: bold;

    &:focus {
        border: none;
        outline: none;
    }

    @media only screen and (max-width: 700px) {
        width: 13px;
        font-size: 11px;
    }
`

const QtyBtn = styled.button`
    width: 20px;
    aspect-ratio: 1;
    background-color: #0F4AA3;
    border-radius: 3px;
    border: none;
    font-size: 17px;
    text-align: center;
    color: white;
    font-weight: bold;

    @media only screen and (max-width: 700px) {
        width: 15px;
        font-size: 11px;
    }
`

const Trash = styled(FiTrash2)`
    height: 25px;
    width: auto;

    @media only screen and (max-width: 700px) {
        height: 17px;
    }
`

const PriceDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const TrashButton = styled.button`
    background-color: transparent;
    border: none;
    height: fit-content;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`

const LeftMsg = styled.p`
    color: red;
    font-size: 12px !important;
    font-weight: bold;
`

export default CartItem;
