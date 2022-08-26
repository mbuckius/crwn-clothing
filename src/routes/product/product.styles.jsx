import styled from "styled-components";

export const ProductContainer = styled.div`
    margin: 50px auto; 
    display: flex;
    width: 800px;
    height: 700px;
    justify-content: space-between;
    column-gap: 20px;
    margin: 30px auto;

    img {
        width: 70%;
        height: 100%;
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
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
    }
`;