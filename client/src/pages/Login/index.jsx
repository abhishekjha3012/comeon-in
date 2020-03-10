import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as LoginLogo } from '../../assets/login.svg'
import endpoint from '../../endpoint'
import global from '../../global.scss'

const useStyles = makeStyles(theme => ({
    inputRoot: {
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
    input: {
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
        fontSize: '12px'
    }
}));

export default function Login() {

    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setErrorDisplay] = useState(false);

    const handleUsernameChange = event => {
        setErrorDisplay(false);
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setErrorDisplay(false);
        setPassword(event.target.value);
    };

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
                        localStorage.setItem('userid', response.response.id );
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
            setErrorMsg('Please enter both username and password');
            setErrorDisplay(true);
        }
    }

    return (
        <React.Fragment>
            <div className="container login-page">
                <h2>Login</h2>

                <div className={classes.svgBox}>
                    <LoginLogo width='50%' height='50px' />
                </div>

                <TextField
                    variant="filled"
                    className={classes.inputRoot}
                    fullWidth
                    InputProps={{
                        className: classes.input
                    }}
                    label="Username"
                    onBlur={handleUsernameChange}
                />
                <TextField
                    variant="filled"
                    className={classes.inputRoot}
                    fullWidth
                    InputProps={{
                        className: classes.input
                    }}
                    label="Password"
                    type="password"
                    onBlur={handlePasswordChange}
                />
                
                {showError && <p className={classes.errorMsg}>
                    {errorMsg}
                </p>
                }

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