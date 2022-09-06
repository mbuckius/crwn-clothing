import styled from 'styled-components';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles';

export const SearchDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 100px;
  z-index: 5;
  animation: fadeIn .5s;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
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