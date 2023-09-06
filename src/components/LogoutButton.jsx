import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {styled} from "styled-components"
import { FiLogOut } from "react-icons/fi";


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <Log>Log out</Log>
    </button>
  );
};

const Log = styled(FiLogOut)`
    color: black;
    font-size: 20px;
`


export default LogoutButton;