import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Confirmation = () => {
    const [data, setData] = useState({});
    const [loading,setloading] = useState(true);
    const { missionId } = useParams();

    const navigate = useNavigate();

    //fetch for confirmation
    useEffect(() => {
      fetch(`/api/order/${missionId}`)
      .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch data");
          }
      })
      .then(responseData => {
        setData(responseData.data)
        setloading(false);
      })
      .catch(error => {
        // navigate("/error");
      });
    },)

    //confirmation page following order
    return (
        <Wrapper>        
          <Box>
          {!loading ? (
              <>
              <MyHeader>Pixela Graph</MyHeader>
              </>
          ) : (
            <p>Loading data...</p>
          )}   
          </Box> 
        </Wrapper>
    )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Box = styled.div`
  border: 1px solid #000;
  padding: 20px;
  text-align: left;
`

const MyHeader = styled.p`
  font-size: 30px;
`

const Line = styled.div`
  border-bottom: 1px solid black;
  padding-top: 5px;
  padding-bottom: 5px;
`

const TextHolder = styled.p`
  padding-top: 15px;
  padding-bottom: 15px;
`

const BoldSpan = styled.span`
  font-weight: bold;
`

export default Confirmation;