import React, { useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
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
    emailInput:{
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
        '& label' : {
            color: global.green,
        },
        '& label.Mui-focused': {
            color: global.green,
        },
        '& .MuiFilledInput-underline:before' : {
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
    }

}))

export default function UserInformation(props) {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [promoChecked, setPromoChecked] = useState(true);
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

    if(!isAuthenticated){
        history.push("/login") 
    }

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleCountryCodeChange = event => {
        setCountryCode(event.target.value);
    };

    const handlePhoneChange = event => {
        setPhoneNumber(event.target.value);
    };

    const handleChange = event => {
        setPromoChecked(event.target.checked);
    };

    const saveUserInformation = () => {
        const url = `${endpoint.BASE_URL}${endpoint.UPDATE}`;
        const payload = {
            id: location.state.id,
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
                if (response.status.toLowerCase() === 'success') {
                    if (response.response.showEmailPhoneScreen) {
                        // history.push("/userInformation");
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
                        onChange={handleEmailChange}
                    />

                    <TextField
                        variant="filled"
                        className= {classNames(classes.countryCodeInput, classes.inputRoot)}
                        InputProps={{
                            className: classes.inputBox
                        }}
                        label="Code"
                        onChange={handleCountryCodeChange}
                    />
              
                    <TextField
                        variant="filled"
                        className={classNames(classes.phoneNoInput, classes.inputRoot)}
                        InputProps={{
                            className: classes.inputBox
                        }}
                        label="Phone Number"
                        onChange={handlePhoneChange}
                    />

                    <div className={classes.promotionCheck}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={promoChecked}
                                        onChange={handleChange}
                                        value="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                label="I do not want to receive electronic marketing material"
                            />
                        </FormGroup>
                    </div>

                <Button
                    variant="contained"
                    className="primary-btn"
                    onClick={saveUserInformation}
                >
                    Continue
                </Button>

            </div>
        </React.Fragment>
    )
}