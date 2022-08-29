import styled from 'styled-components';

export const Title = styled.h2`
    text-transform: uppercase;
    margin: 25px 0px;
    text-align: center;
`;

export const ProductCards = styled.div`
    margin: 50px auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;
