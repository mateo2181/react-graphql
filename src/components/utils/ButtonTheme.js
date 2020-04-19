import React, { useContext } from 'react';
import Context from '../../context';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme == 'light' ? 'linear-gradient(#a9c5d8,#97ebff)' : 'linear-gradient(#091236, #1E215D)'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
  position: fixed;
  width: 6rem;
  height: 2.7rem;
  right: 15px;
  top: 12px;
  transition: all 0.3s linear;
  @media (max-width: 900px) {
    position: absolute;
  }
  &:focus {
      outline: none;
  }
  &:after {
      content: '';
      transition: all 0.3s linear;
      transform: ${({ theme }) => theme == 'light' ? 'translateX(0)' : 'translateX(3rem)'};
      width: 1.85rem;
      height: 1.85rem;
      border-radius: 100rem;
      background: ${({theme}) => theme == 'light' ? 'linear-gradient(#e57f28,#ffd746)' : 'linear-gradient(#938c87,#fffdf5)'}; 
  }
`;

const ButtonTheme = (props) => {

    const { state, dispatch } = useContext(Context);

    const changeTheme = () => {
        const theme = state.theme == 'light' ? 'dark' : 'light';
        dispatch({type: 'SET_THEME', payload: theme})
    };

    return (
        <ToggleButton theme={state.theme} onClick={() => changeTheme()}>

        </ToggleButton>
    )
};

export default ButtonTheme;