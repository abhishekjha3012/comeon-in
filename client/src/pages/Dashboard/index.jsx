import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root:{
        textAlign: 'center',
        marginTop: '50px'
    }
}));

export default function Dashboard() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className="container dashboard-page">

                <h3>Hello, Welcome Back.</h3>

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