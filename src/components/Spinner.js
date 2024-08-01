import styled from "styled-components"



export const Spinner = styled.div`
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #008080 transparent #9A0000 transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;

    @keyframes spin-anim {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`