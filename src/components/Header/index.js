import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
function Header(props) {

    let history = useHistory();

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        props.dispatch({ type: 'LOGOUT'});
        history.replace('/login');
    }

    return (
        <div className="px-2 bg-gray-600 flex w-full justify-between">
            <div className="flex">
                <NavLink activeClassName="font-semibold bg-gray-900" className="text-white px-2 py-1" to="/authors"> Authors </NavLink>
                <NavLink activeClassName="font-semibold bg-gray-900" className="text-white px-2 py-1" to="/books"> Books </NavLink>
            </div>
            <div className="flex">
                {props.store.token ?
                    <button className="text-white px-2 py-1" onClick={logout}> Logout </button>
                    :
                    <NavLink activeClassName="font-semibold bg-gray-900" className="text-white px-2 py-1" to="/login"> Login </NavLink>
                }
            </div>
        </div>
    );
};

export default Header;