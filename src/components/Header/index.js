import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Context from '../../context';
import styled from 'styled-components';

const HeaderMenu = styled.ul`
    display: flex;
    margin: 0 0 10px 0;
    padding: 0;
    border-radius: 4px;
    width: 100%;
    background-color: ${({theme}) => theme == 'light' ? '#242424' : '#f9f9f9'};
    overflow: hidden;
`;

const HeaderItem = styled.li`
    padding: 12px 10px;
    color: ${({theme}) => theme == 'light' ? 'white' : '#252525'};
    &.active {
        background-color: #2693f0;
        color: ${({theme}) => theme == 'light' ? 'white' : '#252525'};
        font-weight: 600;
    }
    &:hover {
        background-color: #2693f0;
        color: ${({theme}) => theme == 'light' ? 'white' : '#252525'};
    }
`

function Header(props) {

    let history = useHistory();

    const {state, dispatch} = useContext(Context);

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        history.replace('/login');
    }

    return (
        <HeaderMenu theme={state.theme}>
                <HeaderItem theme={state.theme} activeClassName="active" as={NavLink} to="/authors">
                    Authors
                </HeaderItem>
                <HeaderItem theme={state.theme} activeClassName="active" as={NavLink} to="/books">
                    Books
                </HeaderItem>

                {/* <Menu.Menu position='right'>
                    {state.token ?
                        <Menu.Item> <button onClick={logout}> Logout </button> </Menu.Item>
                        :
                        <Menu.Item activeClassName="active" as={NavLink} to="/login" color={'blue'}>
                            Login
                        </Menu.Item>
                    }
                </Menu.Menu> */}
        </HeaderMenu>
    );
};

export default Header;