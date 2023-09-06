import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ListContext } from "./ListContext";
import {FiTrash2} from "react-icons/fi"



const ListItem = ({item, quantity, choreId}) => {
    //Those states are used to keep track of the qty in list and quantity left if user adds more
    const [qty, setQty] = useState(quantity);

    const {setTriggerModification, triggerModification} = useContext(ListContext)

    const navigate = useNavigate()
    
    //This is the fetch to update quantity
    const updateFetch = (newQty) => {
        fetch("/api/list", {
            method: "PATCH",
            body: JSON.stringify({
                "chore" : item,
                "quantity": newQty
            }),
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
                } else {
                navigate("/error")
                }
            });
    }

    //same concept as the update fetch but to delete a product
    const deleteFetch = () => {
        fetch(`/api/list/${choreId}`, {
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
                {/* <QtyTotalDiv>
                    <p>Quantity: </p>
                    <QtyDiv>
                        <QtyBtn onClick={updateQtyLess}>-</QtyBtn>
                        <QtyInput onChange={updateQtyInpt} value={qty} />
                        <QtyBtn onClick={updateQtyAdd}>+</QtyBtn>
                    </QtyDiv>
                </QtyTotalDiv> */}
                
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

export default ListItem;
