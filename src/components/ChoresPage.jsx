import { styled } from "styled-components";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import Loading from "./Loading";


const ChoresPage = () => {
    //For accessing and displaying the chores in the UI
    const [chores, setChores] = useState([]);
    const params = useLocation();
    const address = `${params.pathname}${params.search}`

    //For setting the chore physicalTax as a title in the UI
    const queryParams = new URLSearchParams(params.search);
    const physicalTaxFromURL = queryParams.get('physicalTax') || "All Items";
    const [currentphysicalTax, setCurrentphysicalTax] = useState(physicalTaxFromURL);

    //To enable/disable the loading state
    const [isLoading, setIsLoading] = useState(true);

    //Use for redirecting to the 404 page
    const navigate = useNavigate();

    //For warning user that their search is invalid
    const [noResults, setNoResults] = useState(false);

    //API fetching logic
    useEffect(() => {
        fetch(`/api/${address}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)){
                    setChores(data.data);
                    setIsLoading(false);
                    setNoResults(data.data.length === 0);
                } else {
                    navigate("/error");
                }
            })
            .catch(error => {
                navigate("/error");
            });
            setCurrentphysicalTax(physicalTaxFromURL)
    }, [address, navigate, physicalTaxFromURL]);

    //Render logic
    return(
    <>
    {isLoading ? (
        <Loading />
    ) : noResults ? (
        <NoResultsMessage>No chores match your search.</NoResultsMessage>
    ) : ( 
        <>
            <H1>{currentphysicalTax}</H1>
            <ChoreGrid>
                {chores.map(chore => (
                    <StyledLink to={`/chores/${chore._id}`} key={chore._id}>
                        <ChoreItem key={chore._id}>
                            <ChoreDetails>
                                <Name>{chore.name}</Name>
                                <Level>{chore.physicalTax}</Level>
                            </ChoreDetails>
                        </ChoreItem>
                    </StyledLink>
                ))}
            </ChoreGrid>
        </>
    )}
    </>
);
}


const H1 = styled.h1`
    margin: 10vw 0 0 2vw;
    font-size: 1.5rem;
    
    @media (max-width: 768px) {
            margin-top: 20vw;
    }
`;

export const ChoreGrid = styled.span`
    margin-top: 5vw;
    display: flex;
    flex-wrap:wrap;
    gap: 20px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    padding-bottom: 10vw;
`;

export const ChoreItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20vw;
    gap: 10px;
    flex-shrink: 0;
    padding: 2vw;

    @media (max-width: 768px) {
            width: 40vw;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;  
    color: inherit;         
    display: block;
`;

const NoResultsMessage = styled.div`
    color: #999;
    font-size: 1.5rem;
    text-align: center;
    margin: 15vw;
    padding: 10vw;
`;

export const ChoreDetails = styled.div`
    background-color: black;
    width: 100%;
    height: 6vw;
    border-radius: 5px;
    color: white;
    text-align: center;
    padding: 1vw;
    font-size: 0.9rem;
    @media (max-width: 768px) {
            height: 10vw;
    }
`;

export const Name = styled.p`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: 30rem;
font-weight: bold;
`;

export const Level = styled.p`
margin: 0.5vw;
`;

export default ChoresPage;