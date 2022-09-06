import styled from "styled-components";

export const SearchContainer = styled.div`
    margin: 50px auto; 
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 700px;
    justify-content: 
    column-gap: 20px;
    margin: 30px auto;  
`;

export const Title = styled.h2`
    text-transform: uppercase;
    font-size: 40px;
    margin-bottom: 25px;
    text-align: center;
`;

export const SearchBoxContainer = styled.input`
    -webkit-appearance: none;
    border: solid;
    border-color: grey;
    outline: none;
    padding: 10px;
    width: 200px;
    line-height: 30px;
    margin-bottom: 30px;
`;