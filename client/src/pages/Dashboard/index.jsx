import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from '../../components/Header/Header'
import { ReactComponent as WelcomeLogo } from '../../assets/welcome.svg'

const useStyles = makeStyles(theme => ({
    root:{
        textAlign: 'center',
        marginTop: '50px'
    },
    svgBox: {
        textAlign: 'center',
        width: '300px',
        height: '100px',
        margin: '0 auto'
    },
}));

export default function Dashboard() {

    const classes = useStyles();
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

    if(!isAuthenticated){
        history.push("/login") 
    }

    return (
        <React.Fragment>
            <div className="container dashboard-page">

                <Header />

                <h3>Hello, Welcome Back.</h3>

                <div className={classes.svgBox}>
                    <WelcomeLogo width='80%' height='100px' />
                </div>

                <p>Its nice to see you again.</p>

                <div className={classes.root}>
                    <p>Your current balance is</p>
                    <h4>100 Kr</h4>
                </div>

            </div>
        </React.Fragment>
    )
}