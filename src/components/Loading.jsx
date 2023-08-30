import {ImSpinner3} from "react-icons/im"
import { styled, keyframes } from "styled-components";

const Loading = () =>
{
    return (<SpinnerDiv><StyledSpinner /></SpinnerDiv>)
}

const Spinning = keyframes`
    0% {transform: rotate(0)}
    5% {transform: rotate(18deg)}
    10% {transform: rotate(36deg)}
    15% {transform: rotate(54deg)}
    20% {transform: rotate(72deg)}
    25% {transform: rotate(90deg)}
    30% {transform: rotate(108deg)}
    35% {transform: rotate(124deg)}
    40% {transform: rotate(144deg)}
    45% {transform: rotate(162deg)}
    50% {transform: rotate(180deg)}
    55% {transform: rotate(198deg)}
    60% {transform: rotate(216deg)}
    65% {transform: rotate(234deg)}
    70% {transform: rotate(252deg)}
    75% {transform: rotate(270deg)}
    80% {transform: rotate(288deg)}
    85% {transform: rotate(306deg)}
    90% {transform: rotate(324deg)}
    95% {transform: rotate(342deg)}
    100% {transform: rotate(360deg)}
`

const SpinnerDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 89vh;
`

const StyledSpinner = styled(ImSpinner3)`
    height: 50px;
    width: fit-content;
    animation-name: ${Spinning};
    animation-duration: 1s;
    animation-iteration-count: infinite;
`

export default Loading;