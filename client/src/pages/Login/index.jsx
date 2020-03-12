import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ReactComponent as LoginLogo } from '../../assets/login.svg';
import endpoint from '../../endpoint';
import global from '../../global.scss';

const useStyles = makeStyles(theme => ({
    inputBox: {
        margin: '10px 0',
        '& label': {
            color: global.green,
        },
        '& label.Mui-focused': {
            color: global.green,
        },
        '& .MuiFilledInput-underline:before': {
            borderBottomColor: global.grey,
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: global.green,
        }
    },
    inputProps: {
        color: global.green,
    },
    svgBox: {
        textAlign: 'center',
        width: '100px',
        height: '50px',
        margin: '0 auto'
    },
    errorMsg: {
        color: global.red,
    }
}));

export default function Login() {

    const classes = useStyles();
    const history = useHistory();

    if(localStorage.getItem('username')){
        history.push('/dashboard');
    }
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setErrorDisplay] = useState(false);

    /**
    * Saves the username value when user focuses out of username input box.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handleUsernameChange = event => {
        setErrorDisplay(false);
        setUsername(event.target.value);
    };

    /**
    * Saves the password value when user focuses out of password input box.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handlePasswordChange = event => {
        setErrorDisplay(false);
        setPassword(event.target.value);
    };

    /**
    * Triggers authentication if both username/password entered. Otherwise show error.
    * @param none 
    */
    const triggerLogin = () => {
        if (username && password) {
            setErrorMsg('');
            setErrorDisplay(false);
            const url = `${endpoint.BASE_URL}${endpoint.AUTHENTICATION}`;
            const payload = {
                username,
                password
            }

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(resp => resp.json())
                .then((response) => {
                    if (response.status.toLowerCase() === 'success') {
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                        localStorage.setItem('userid', response.response.id);
                        if (response.response.showEmailPhoneScreen) {
                            history.push("/userInformation", { id: response.response.id });
                        } else if (response.response.showTermsAndCondition) {
                            history.push("/termConditions", { id: response.response.id });
                        } else if (response.response.showWelcomeScreen) {
                            history.push("/dashboard", { id: response.response.id });
                        }
                    } else {
                        setErrorMsg(response.response.errorDescription);
                        setErrorDisplay(true);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setErrorMsg('Please enter valid username and password');
            setErrorDisplay(true);
        }
    }

    return (
        <React.Fragment>
            <div className={classNames('container', classes.loginPage)}>

                <h2>Login</h2>

                <div className={classes.svgBox}>
                    <LoginLogo width='50%' height='50px' />
                </div>

                <div>

                    <TextField
                        variant="filled"
                        className={classes.inputBox}
                        fullWidth
                        InputProps={{
                            className: classes.inputProps
                        }}
                        label="Username"
                        onBlur={handleUsernameChange}
                    />

                    <TextField
                        variant="filled"
                        className={classes.inputBox}
                        fullWidth
                        InputProps={{
                            className: classes.inputProps
                        }}
                        label="Password"
                        type="password"
                        onBlur={handlePasswordChange}
                    />

                    {showError && <p className={classes.errorMsg}>
                        {errorMsg}
                    </p>
                    }
                </div>

                <Button
                    variant="contained"
                    className="primary-btn"
                    fullWidth
                    onClick={triggerLogin}
                >
                    Login
                </Button>

            </div>
        </React.Fragment>
    )
}