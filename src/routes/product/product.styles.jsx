import styled from "styled-components";

export const ProductContainer = styled.div`
    margin: 50px auto; 
    display: flex;
    width: 800px;
    justify-content: space-between;
    column-gap: 20px;
`;

export const Images = styled.div`
    width: 300%;
    height: 1050px;
    overflow: scroll; 

    img {
        width: 100%;
        height: 700px;
        object-fit: cover;
        margin-bottom: 5px;
    }     
`;

export const Title = styled.h2`
    font-size: 40px;
    justify-content: center;
`;

export const Info = styled.div`
    position: relative;
    width: 100%;

    Button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;