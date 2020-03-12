import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import classNames from 'classnames';
import Header from '../../components/Header/Header'
import { ReactComponent as WelcomeLogo } from '../../assets/welcome.svg'

const useStyles = makeStyles(theme => ({
    dashboardPage:{
        textAlign: 'center'
    },
    dashboardContent: {
        marginTop: '50px'
    },
    greetMsg: {
        marginTop: '-15px',
        fontSize: '14px',
    },
    svgBox: {
        width: '100%',
        height: '100px',
    },
    balance: {
        fontWeight: '900',
        marginTop: '-15px'
    }
}));

export default function Dashboard() {

    const classes = useStyles();
    const history = useHistory();
    
    /* Redirect to login page is user is not authenticated*/
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');
    if (!isAuthenticated) {
        history.push("/login")
    }

    return (
        <React.Fragment>
            <div className={classNames('container', classes.dashboardPage)}>

                <Header />

                <div className={classes.svgBox}>
                    <WelcomeLogo width='80%' height='100px' />
                </div>

                <div>
                    <h3>Hello, Welcome Back.</h3>
                    <p className={classes.greetMsg}> Its nice to see you again.</p>
                    <div className={classes.dashboardContent}>
                        <p>Your current balance is</p>
                        <p className={classes.balance}>100 Kr</p>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}