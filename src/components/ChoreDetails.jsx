import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { ListContext } from "./ListContext";
import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

const ChoreDetails = () => {
    const [chore, setChore] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isAdded, setIsAdded] = useState(false)
    const { choreId } = useParams();
    const navigate = useNavigate();
    const { user} = useAuth0();
    const {currentList, triggerModification, setTriggerModification, state, setState} = useContext(ListContext)

    //this fetch is getting the specific item with its id which is taken from the params
    useEffect(() => {
        fetch(`/api/chores/${choreId}`)
            .then(response => {
                console.log(choreId);
                return response.json();
            })
            .then(data => {
                console.log(data, ("fetchlog"));
                if (data.status === 200){
                    setChore(data.data);
                    setIsLoading(false);
                } else {
                    navigate("/error");
                }
            })
            .catch(error => {
                navigate("/error");
            });
            // eslint-disable-next-line
    }, []);

    //This will make a small pop up to let the user know the chore was added to cart and disaeappear after 2 seconds
    const addedNotif = () => {
        setIsAdded(true)

        setTimeout(() => setIsAdded(false), 2000)
    }

    //This fetch here will add the item to the list if its not there already
    //If it is there already it will do a patch to change the quantity and add 1
    const addToList = () => {
        //checking if we already are doing a fetch, we want to wait for the list to update since we are checking at wether the item is already in the cart or not
        if (state !== "clear") {return}
        setState("fetching")
        // if (currentList !== "empty" && currentList.some((item) => item.chore._id === chore._id))
        //     {
            // const choreInList = currentList.filter((item) => item.chore._id === chore._id)
            // const newQty = (Number(choreInList[0].quantity) + 1)
            // fetch("/api/list", {
            //     method: "PATCH",
            //     body: JSON.stringify({
            //         "chore" : chore,
            //         "quantity": newQty
            //     }),
            //     headers: {
            //         Accept: "application/json",
            //         "Content-Type": "application/json",
            //     },
            //     })
            //     .then((res) => res.json())
            //     .then((json) => {
            //         //Adding the notif and triggering a new GET on the List context
            //         addedNotif();
            //         setTriggerModification(triggerModification + 1)
            //         const { status } = json;
            //         if (status === 201) {
            //         return;
            //         } else {
            //         navigate("/error")
            //         }
            //     });
                
        
        // }
        // else {
            fetch(`/api/list/${user?.nickname}`, {
            method: "POST",
            body: JSON.stringify({"chore" : chore,
                                "quantity": 1}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((json) => {
                addedNotif();
                setTriggerModification(triggerModification + 1)
                const { status } = json;
                if (status === 201) {
                return;
                } else {
                navigate("/error")
                }
            });

            fetch(`https://pixe.la/v1/users/${user.nickname}/graphs/hello12/add`, {
                method: 'PUT',
                headers: {
                    "X-USER-TOKEN": "-Hello8990" ,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    quantity : "1" 
                })
        })
        .then((res) => res.json())
        .then((json) => {
                console.log(json);
            })
        // }

    }

    return (
        <>
        {isLoading ? (<Loading />) : (
                <Container>
                <ProductContainer>
                    {/* <ImageContainer>
                        <Image src={chore.imageSrc} />
                    </ImageContainer> */}
                    <DescContainer>
                        <h1>{chore.name}</h1>
                        <p>Fatigue level: {chore.physicalTax}</p>
                        <AddButton onClick={addToList}>Confirm</AddButton>
                    </DescContainer>
                </ProductContainer>
                {isAdded ? (<Notif>Chore was completed!</Notif>): (<></>)}
            </Container>
        )}
        </>
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
    position: relative;
`

const ProductContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const ImageContainer = styled.div`
    width: 27vw;
    aspect-ratio: 1;
    object-fit: cover;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(240, 46, 170, 0.4) 2.5px 2.5px, rgba(240, 46, 170, 0.3) 5px 5px, rgba(240, 46, 170, 0.2) 7.5px 7.5px, rgba(240, 46, 170, 0.1) 10px 10px, rgba(240, 46, 170, 0.05) 12.5px 12.5px;


    @media only screen and (max-width: 1000px) {
        width: 40vw;
    }

    @media only screen and (max-width: 700px) {
        width: 60vw;
    }
`

const Image = styled.img`
    width: 85%;
    height: auto;
    object-fit: cover;
`

const DescContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 50vw;
    min-height: 27vw;

    h1 {
        font-size: 40px;
    }

    p {
        font-size: 20px;
    }

    @media only screen and (max-width: 1000px) {
        min-height: 40vw;
    }

    @media only screen and (max-width: 700px) {
        gap: 15px;
        align-items: center;
        text-align: center;
        padding-bottom: 30px;

        h1 {
            font-size: 25px;
        }

        p {
            font-size: 18px;
        }
    }
`

const AddButton = styled.button`
    color: white;
    font-weight: bold;
    background-color: #0F4AA3;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    width: fit-content;
    box-shadow: rgba(0, 219, 239, 0.4) 1.25px 1.25px, rgba(0, 219, 239, 0.3) 2.5px 2.5px, rgba(0, 219, 239, 0.2) 3.75px 3.75px, rgba(0, 219, 239, 0.1) 5px 5px, rgba(240, 46, 170, 0.05) 6.25px 6.25px;

`

const Notif = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #0F4AA3;
    color: white;
    font-weight: bold;
    font-size: 20px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 0px 0px 10px rgba(17, 35, 239, 0.05), 0px 0px 0px 8px rgba(17, 35, 239, 0.10), 0px 0px 0px 6px rgba(17, 35, 239, 0.20), 0px 0px 0px 4px rgba(17, 35, 239, 0.30), 0px 0px 0px 2px rgba(17, 35, 239, 0.40);
`

export default ChoreDetails;