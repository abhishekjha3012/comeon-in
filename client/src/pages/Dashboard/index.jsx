import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Header from '../../components/Header/Header'
import { ReactComponent as WelcomeLogo } from '../../assets/welcome.svg'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        marginTop: '50px'
    },
    greetMsg: {
        marginTop: '-15px',
        textAlign: 'center',
        fontSize: '14px',
    },
    svgBox: {
        textAlign: 'center',
        width: '300px',
        height: '100px',
        margin: '0 auto'
    },
    balance: {
        fontWeight: '900',
        marginTop: '-15px'
    }
}));

export default function Dashboard() {

    const classes = useStyles();
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

    /* Redirect to login page is user is not authenticated*/
    if(!isAuthenticated){
        history.push("/login") 
    }

    return (
        <React.Fragment>
            <div className="container dashboard-page">

                <Header />

                <div className={classes.svgBox}>
                    <WelcomeLogo width='80%' height='100px' />
                </div>

                <h3>Hello, Welcome Back.</h3>

                <p className={classes.greetMsg}> Its nice to see you again.</p>

                <div className={classes.root}>
                    <p>Your current balance is</p>
                    <p className={classes.balance}>100 Kr</p>
                </div>

            </div>
        </React.Fragment>
    )
}