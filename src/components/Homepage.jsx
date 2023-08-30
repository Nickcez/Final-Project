import { styled } from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { ChoreDetails, ChoreGrid, ChoreItem, Name, Level } from "./ChoresPage";
import Loading from "./Loading";

const Homepage = () => {
    //For accessing and displaying the chores and brands in the UI
    const [allChores, setAllChores] = useState([]);
    
    //To enable/disable the loading state
    const [isLoading, setIsLoading] = useState(true);
    
    //Use for redirecting to the 404 page and/or the Chores associated to a specific company
    const navigate = useNavigate();
    
    //Logic for the view more button
    const handleViewMore = (physicalTax) => {
        navigate(`/chores?physicalTax=${physicalTax}`);
    };
    
    //API fetching logic for chores being displayed
    
    useEffect(() => {
        console.log("test test");
        fetch("/api/chores")
            .then((response) => {
                console.log(typeof response);
                response.json()})
            .then((data) => {
                console.log(data);
                setAllChores(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                // navigate("/error")
            });  
            // eslint-disable-next-line
            }, []);

    const getTopChoresByphysicalTax = (chores, limit = 2) => {
        const choreGroups = {};
    
        chores.forEach(chore => {
        if (!choreGroups[chore.physicalTax]) {
            choreGroups[chore.physicalTax] = [];
        }
        choreGroups[chore.physicalTax].push(chore);
        });
    
        for (let physicalTax in choreGroups) {
        choreGroups[physicalTax] = choreGroups[physicalTax].slice(0, limit);
        }
    
        return choreGroups;
    };

    const topChoresByphysicalTax = getTopChoresByphysicalTax(allChores);

    //Render logic
    
    return (
    <>
    Is it working ?
    {isLoading ? (<Loading />) : (
        <SectionTitle>Start with</SectionTitle>
        )}
            {Object.entries(topChoresByphysicalTax).map(([physicalTax, chores]) => (
                    <div key={physicalTax}>
                        <CatTitle>{physicalTax}</CatTitle>
                        <ModifiedChoreGrid>
                            {chores.map(chore => (
                                <StyledLink to={`/chores/${chore._id}`} key={chore._id}>
                                    <ChoreItem key={chore._id}>
                                        {/* <ImgDiv>
                                            <Img src={chore.imageSrc} alt={chore.name} />
                                        </ImgDiv> */}
                                        <ChoreDetails>
                                            <Name>{chore.name}</Name>
                                            <Price>{chore.physicalTax}</Price>
                                        </ChoreDetails>
                                    </ChoreItem>
                                </StyledLink>
                            ))}
                        </ModifiedChoreGrid>
                        <Button onClick={() =>handleViewMore(physicalTax)}>View more</Button>
                    </div>
                ))}
    </>)

}

export const ImgDiv = styled.div`
    width: 100%;
    aspect-ratio: 1;
    margin-left: auto;
    margin-right: auto;

    overflow: hidden;
    object-fit: cover;
    
    border-radius: 5px 5px 0 0;
`

const Button = styled.button`
    margin-top: 5vh; 
    padding: 1.5vw 2vw;
    background-color: #0F4AA3;  
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    margin-bottom: 4vw;
    box-shadow: rgba(0, 219, 239, 0.4) 2.5px 2.5px, rgba(0, 219, 239, 0.3) 5px 5px, rgba(0, 219, 239, 0.2) 7.5px 7.5px, rgba(0, 219, 239, 0.1) 10px 10px, rgba(240, 46, 170, 0.05) 12.5px 12.5px;

    &:hover {
        background-color: #094487;
    }

    @media (max-width: 785px) {
            margin-bottom: 5h;
            margin-top: 6vh;
    }

@media (max-width: 450px) {
            margin-bottom: 6vh;
            margin-top: 6vh;
    }
`;

const SectionTitle = styled.h1`
margin: 14vh 0 3vw 1vw;
font-weight: bold;
font-size: 1.5rem;

@media (max-width: 785px) {
            margin-top: 14vh;
    }

@media (max-width: 450px) {
            margin-top: 14vh;
    }
`;

const CatTitle = styled.h2`
    margin:0 0 0vw 2vw;
    font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
    text-decoration: none;  
    color: inherit;         
    display: block;
`;

const ModifiedChoreGrid = styled(ChoreGrid)`
    padding-bottom: 1vw;

    @media (max-width: 785px) {
        padding-bottom: 2vw;
    }

@media (max-width: 450px) {
        padding-bottom: 3vw;
    }
`;

export default Homepage;