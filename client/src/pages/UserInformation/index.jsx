import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";
import classNames from 'classnames';
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
    inputBox: {
        color: global.green,
    },
    inputRoot: {
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
        width: '100px',
        height: '50px',
        margin: '0 auto'
    },
    errorMsg: {
        color: global.red,
        fontSize: '12px'
    }

}))

export default function UserInformation(props) {

    const classes = useStyles();
    const history = useHistory();
    const [promoChecked, setPromoChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showError, setErrorDisplay] = useState(false);
    const [showSecError, setSecErrorDisplay] = useState(false);
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

    if (!isAuthenticated) {
        history.push("/login")
    }

    const handleEmailChange = event => {
        setSecErrorDisplay(false);
        const validEmailId = validateEmail(event.target.value);
        if (validEmailId) {
            setErrorDisplay(false);
            setEmail(event.target.value);
        } else {
            setErrorDisplay(true);
        }

    };

    const handleCountryCodeChange = event => {
        setSecErrorDisplay(false);
        setCountryCode(event.target.value);
    };

    const handlePhoneChange = event => {
        setSecErrorDisplay(false);
        setPhoneNumber(event.target.value);
    };

    const handlePromoChange = event => {
        setPromoChecked(event.target.checked);
    };

    const validateEmail = email => {
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const skipSaveInformation = () => {
        history.push("/dashboard") 
    }

    const saveUserInformation = () => {
        if(email && countryCode && phoneNumber){
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
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setSecErrorDisplay(true);
        }
        
    }

    return (
        <React.Fragment>
            <div className="container user-info-page">

                <Header />

                <div className={classes.svgBox}>
                    <UserLogo width='50%' height='50px' />
                </div>

                <h3>Share Your Details</h3>

                <TextField
                    fullWidth
                    variant="filled"
                    className={classNames(classes.emailInput, classes.inputRoot)}
                    InputProps={{
                        className: classes.inputBox
                    }}
                    label="Email"
                    onBlur={handleEmailChange}
                />

                {showError && <p className={classes.errorMsg}>
                    Please enter valid email address.
                </p>
                }

                <TextField
                    variant="filled"
                    className={classNames(classes.countryCodeInput, classes.inputRoot)}
                    InputProps={{
                        className: classes.inputBox
                    }}
                    label="Code"
                    onBlur={handleCountryCodeChange}
                />

                <TextField
                    variant="filled"
                    className={classNames(classes.phoneNoInput, classes.inputRoot)}
                    InputProps={{
                        className: classes.inputBox
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

                {showSecError && <p className={classes.errorMsg}>
                    Please enter all details.
                </p>
                }

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
        </React.Fragment>
    )
}