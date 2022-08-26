import styled from 'styled-components';

export const CategoryContainer = styled.div`
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

export const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 25px;
  text-align: center;
`;
