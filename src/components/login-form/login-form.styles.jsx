import styled from 'styled-components';

export const ButtonsContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LoginContainerStyled = styled.div `
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }
`;


//as scss
/* .login-container {
    display: flex;
    flex-direction: column;
    width: 380px;

    h2 {
        margin: 10px 0;
    }

    .buttons-container {
        display: flex;
        justify-content: space-between;
    }
} */