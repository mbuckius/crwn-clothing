import styled from "styled-components";

export const ProductDescriptionContainer = styled.div`
    width: 100%;
    height: 500px;
    margin: 20px 0px;
    font-size: 18px;
    overflow: scroll;
`;

export const Info = styled.div`
    border-style: solid none;
    border-color: gainsboro;
    cursor: pointer;

    :last-child {
        border-top-style: none;
    }
`;

export const Subheading = styled.div`
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        font-size: 30px;
    }
`;