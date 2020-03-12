import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Header from '../../components/Header/Header'
import { ReactComponent as UserLogo } from '../../assets/user.svg'
import endpoint from '../../endpoint';
import global from '../../global.scss';

const useStyles = makeStyles(theme => ({
    emailInput: {
        margin: '10px 0'
    },
    countryCodeInput: {
        width: '20%',
        marginRight: '10px',
    },
    phoneNoInput: {
        width: 'calc(80% - 10px)'
    },
    promotionCheck: {
        marginTop: '25px'
    },
    inputProps: {
        color: global.green,
    },
    inputBox: {
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
    svgBox: {
        textAlign: 'center',
        width: '100%',
        height: '50px',
    },
    errorBox: {
        height: '20px'
    },
    errorMsg: {
        color: global.red,
    }

}))

export default function UserInformation(props) {

    const classes = useStyles();
    const history = useHistory();

    /* Redirect to login page if user is not authenticated. */
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
    if (!isAuthenticated) {
        history.push("/login")
    }

    const [promoChecked, setPromoChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showError, setErrorDisplay] = useState(false);

    /**
    * Saves the email value when user focuses out of email input box.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handleEmailChange = event => {
        const validEmailId = validateEmail(event.target.value);
        if (validEmailId) {
            setErrorDisplay(false);
            setEmail(event.target.value);
        } else {
            setErrorMsg('Please enter valid email address.')
            setErrorDisplay(true);
        }
    };

    /**
    * Saves the country code value when user focuses out of country code input box.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handleCountryCodeChange = event => {
        setErrorDisplay(false);
        setCountryCode(event.target.value);
    };

    /**
    * Saves the phone number value when user focuses out of phone number input box.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handlePhoneChange = event => {
        setErrorDisplay(false);
        setPhoneNumber(event.target.value);
    };

    /**
    * Saves the promotion checkbox value when user clicks on checkbox.
    * @param {Object} event Object that can be referred as event handler triggered by user action 
    */
    const handlePromoChange = event => {
        setPromoChecked(event.target.checked);
    };

    /**
    * Checks for valid email address using regex.
    * @param {String} email email address entered by user.
    */
    const validateEmail = email => {
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    /**
    * Redirect user to welcome page.
    * @param none
    */
    const skipSaveInformation = () => {
        history.push("/dashboard")
    }

    /**
    * Saves information typed by user otherwise show error.
    * @param none 
    */
    const saveUserInformation = () => {
        if (email && countryCode && phoneNumber) {
            const url = `${endpoint.BASE_URL}${endpoint.UPDATE}`;
            const payload = {
                id: localStorage.getItem('userid'),
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password'),
                email,
                phone: `${countryCode}-${phoneNumber}`,
                acceptMarketing: promoChecked
            }

            fetch(url, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(resp => resp.json())
                .then((response) => {
                    console.error('success:', response);
                    if (response.status.toLowerCase() === 'success'){
                        history.push('/dashboard');
                    } else {
                        setErrorMsg(response.response.errorDescription)
                        setErrorDisplay(true);;
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setErrorMsg('Please enter all details.')
            setErrorDisplay(true);
        }
    }

    return (
        <React.Fragment>
            <div className={classNames('container', classes.userInfoPage)}>

                <Header />

                <div className={classes.svgBox}>
                    <UserLogo width='50%' height='50px' />
                </div>

                <div>

                    <h3>Share Your Details</h3>
                    <TextField
                        fullWidth
                        variant="filled"
                        className={classNames(classes.emailInput, classes.inputBox)}
                        InputProps={{
                            className: classes.inputProps
                        }}
                        label="Email"
                        onBlur={handleEmailChange}
                    />
                    <TextField
                        variant="filled"
                        className={classNames(classes.countryCodeInput, classes.inputBox)}
                        InputProps={{
                            className: classes.inputProps
                        }}
                        label="Code"
                        onBlur={handleCountryCodeChange}
                    />
                    <TextField
                        variant="filled"
                        className={classNames(classes.phoneNoInput, classes.inputBox)}
                        InputProps={{
                            className: classes.inputProps
                        }}
                        label="Phone Number"
                        onBlur={handlePhoneChange}
                    />
                    <div className={classes.promotionCheck}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={promoChecked}
                                        onChange={handlePromoChange}
                                        value="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label="I do not want to receive electronic marketing material"
                            />
                        </FormGroup>
                    </div>
                    <div className={classes.errorBox}>
                        {showError && <p className={classes.errorMsg}>
                            {errorMsg}
                        </p>
                        }
                    </div>
                </div>

                <div>
                    <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={skipSaveInformation}
                    >
                        Skip
                    </Button>
                    <Button
                        variant="contained"
                        className="primary-btn"
                        onClick={saveUserInformation}
                    >
                        Update
                    </Button>
                </div>

            </div>
        </React.Fragment>
    )
}