import styled from 'styled-components';

export const CategoryContainer = styled.div`
  margin: 50px auto;
`;

export const Title = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
  text-align: center;
`;

export const SubTitle = styled.h2`
  font-size: 30px;
  text-transform: capitalize;
  margin-bottom: 25px;
`;

export const SubCategoryContainer = styled.div`
  margin: 50px 0px;
`;

export const Products = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;
