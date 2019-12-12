import React, { useState } from 'react';
import { LOGIN_MUTATION } from '../../queries/login';
import { GET_LOGGED_USER } from '../../queries/loggedUser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

function Login(props) {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error, data } = useQuery(GET_LOGGED_USER, { errorPolicy: 'all' });
    const [LoginMutation] = useMutation(LOGIN_MUTATION);

    const loginForm = async () => {

        try {
            props.dispatch({ type: 'AUTH_BEGIN' });
            const user = await LoginMutation({ variables: { email, password } })
            localStorage.setItem('token', user.data.login.token)
            localStorage.setItem('user', user.data.login.user)
            props.dispatch({ type: 'AUTH_SUCCESS', user: user.data.login.user, token: user.data.login.token });
            history.replace('/authors')
        } catch (e) {
            console.error(`An error occured: `, e)
            props.dispatch({ type: 'AUTH_FAILURE', error: e });
            //   this.props.history.replace('/login')
        }
    }

    if (loading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        console.log('Error')
        // return (
        //     <pre>Bad: {error.networkError.result.errors.map(({ message }, i) => (
        //         <span key={i}>{message}</span>
        //     ))}
        //     </pre>
        // )
    }

    // redirect if user is logged in
    if (!error && data.getUserLogged && data.getUserLogged.email) {
        console.warn('Already logged in')
        history.replace('/authors')
    }

    return (
        <div className="bg-white rounded shadow px-2">
            <div className="pt-2 text-xl w-full border-b"> Login </div>
            <div className="max-w-xs mx-auto mt-4 w-full flex flex-wrap">

                <div className="mb-2 w-full">
                    <input className="w-full" value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="E-mail" />
                </div>
                <div className="mb-2 w-full">
                    <input className="w-full" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <div className="pb-2 w-full">
                    <button className="btn btn-black" onClick={loginForm}> Login </button>
                </div>
            </div>


        </div>
    );
};

export default Login;