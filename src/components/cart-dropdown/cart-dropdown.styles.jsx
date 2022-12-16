import styled from 'styled-components';
import { BasicButton, GoogleLoginButton, InvertedButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BasicButton},
  ${GoogleLoginButton},
  ${InvertedButton} {
    margin-top: auto;
  } /* targets all of these button types nested inside the cart dropdown with given styles */
`;

export const EmptyMessage = styled.span`
  ont-size: 18px;
  margin: 50px auto;
`;

export const CartItemsStyles = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
//as scss
/* 
.cart-dropdown-container {
    position: absolute;
    width: 240px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;
  
    .empty-message {
      font-size: 18px;
      margin: 50px auto;
    }
  
    .cart-items {
      height: 240px;
      display: flex;
      flex-direction: column;
      overflow: scroll;
    }
  
    button {
      margin-top: auto;
    }
  } */