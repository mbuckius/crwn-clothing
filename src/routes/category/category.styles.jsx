import styled from 'styled-components';

import { HashLink as Link } from 'react-router-hash-link';

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

export const LinkContainer = styled.div`
  height: 70px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 80px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NavLink = styled(Link)`
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-transform: uppercase;
  text-decoration: none;
`;

export const FixedMenu = styled.div`
  padding: 0px 20px;
  height: 70px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  margin-top: 50px;
  top: 0px;
  opacity: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background-color: white;

  animation: fadeIn 1s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: .8; }
  }
`;

export const GoToTopButton = styled(Link)`
  font-size: 40px;
`;

export const TopContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right:20px;
  width: 40px;  

  animation: fadeIn 1s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: .8; }
  }
`;