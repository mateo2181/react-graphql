import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react'
import Context from '../../context';

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
        <Menu inverted>
            <Container>
                <Menu.Item activeClassName="active" as={NavLink} to="/authors" color={'blue'}>
                    Authors
                </Menu.Item>
                <Menu.Item activeClassName="active" as={NavLink} to="/books" color={'blue'}>
                    Books
                </Menu.Item>

                <Menu.Menu position='right'>
                    {state.token ?
                        <Menu.Item> <button onClick={logout}> Logout </button> </Menu.Item>
                        :
                        <Menu.Item activeClassName="active" as={NavLink} to="/login" color={'blue'}>
                            Login
                        </Menu.Item>
                    }
                </Menu.Menu>
            </Container>
        </Menu>
    );
};

export default Header;