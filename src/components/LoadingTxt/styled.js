import styled, { keyframes } from "styled-components";

// Nuqtalar animatsiyasi
const dotsAnimation = keyframes`
    0% {
        content: '';
    }
    33% {
        content: '.';
    }
    66% {
        content: '..';
    }
    100% {
        content: '...';
    }
`;

// Asosiy konteyner
export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
`;

// Animatsiyali nuqtalar
export const Dots = styled.span`
    &::after {
        content: "";
        display: inline-block;
        animation: ${dotsAnimation} 1.5s steps(3, end) infinite;
    }
`;
