import styled from 'styled-components';

export const SearchResultsContainer = styled.div`
    margin: 50px auto;
`;

export const Title = styled.h2`
    text-transform: uppercase;
    margin: 25px 0px;
    text-align: center;
`;

export const ProductCards = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`;

export const NoResults = styled.h2`
    margin: 100px 0px;
    text-transform: uppercase;
    text-align: center;
`;

