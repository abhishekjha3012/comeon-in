import React from 'react';
import Button from '@material-ui/core/Button';
import { ReactComponent as WelcomeLogo } from '../../assets/welcome.svg'
import { makeStyles } from "@material-ui/core/styles";

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

    return (
        <React.Fragment>
            <div className="container dashboard-page">

                <h3>Hello, Welcome Back.</h3>

                <div className={classes.svgBox}>
                    <WelcomeLogo width='80%' height='100px' />
                </div>

                <p>Its nice to see you again.</p>

                <div className={classes.root}>
                    <p>Your current balance is</p>
                    <h4>100 Kr</h4>
                </div>

                <Button
                    variant="contained"
                    className="primary-btn bottom"
                >
                    Logout
                </Button>

            </div>
        </React.Fragment>
    )
}