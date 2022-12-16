import styled from 'styled-components';

export const CategoryContainerStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr); //repeat four times one equal equidistance column
    column-gap: 15px;
    row-gap: 50px;
`;

export const CategoryTitleStyled = styled.h2`
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
`;

//as scss
/* .category-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); //repeat four times one equal equidistance column
    column-gap: 15px;
    row-gap: 50px;
}

.category-title {
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
} */