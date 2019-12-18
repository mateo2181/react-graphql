import React, { useState, useContext } from 'react';
import { LOGIN_MUTATION } from '../../queries/login';
import { GET_LOGGED_USER } from '../../queries/loggedUser';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { Input, Header, Button } from 'semantic-ui-react';
import Context from '../../context';

function Login(props) {

    let history = useHistory();

    const {state, dispatch} = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errorLogin, setErrorLogin] = useState('');

    const { loading, error, data } = useQuery(GET_LOGGED_USER, { errorPolicy: 'all' });
    const [LoginMutation] = useMutation(LOGIN_MUTATION);

    async function loginForm() {
        // event.preventDefault();
        try {
            dispatch({ type: 'AUTH_BEGIN' });
            const user = await LoginMutation({ variables: { email, password } })
            localStorage.setItem('token', user.data.login.token)
            localStorage.setItem('user', user.data.login.user)
            dispatch({ type: 'AUTH_SUCCESS', user: user.data.login.user, token: user.data.login.token });
            history.replace('/authors')
            // return true;
        } catch (e) {
            console.error(`An error occured: `, e.graphQLErrors[0].message)
            dispatch({ type: 'AUTH_FAILURE', error: e.graphQLErrors[0].message });
            //   this.props.history.replace('/login')
        }
    }

    if (loading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        console.log('Error')
    }

    // redirect if user is logged in
    if (!error && data.getUserLogged && data.getUserLogged.email) {
        console.warn('Already logged in')
        history.replace('/authors')
    }

    return (
        <div className="bg-white rounded shadow px-2 pb-2">
            <form onSubmit={loginForm} className="max-w-xs mx-auto mt-4 w-full flex flex-wrap">
                <Header as="h2" style={{ paddingTop: '20px' }}> Login </Header>
                <div className="mb-2 w-full">
                    <Input className="w-full" autoFocus value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="E-mail" />
                </div>
                <div className="mb-2 w-full">
                    <Input className="w-full" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </div>
                <div className="pb-2 w-full">
                    <Button primary type="submit"> Login </Button>
                </div>
                {state.authError ?
                    <div className="text-red-600 text-sm"> {state.authError} </div> : ''
                }
            </form>


        </div>
    );
};

export default Login;