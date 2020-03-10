import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Header from '../../components/Header/Header'
import { ReactComponent as TNCLogo } from '../../assets/tnc.svg'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    tncBox: {  
        maxHeight: '25vh',
        overflow: 'scroll',
        padding: '10px 20px',
        border: '1px solid white'
    },
    svgBox: {
        textAlign: 'center',
        width: '100px',
        margin: '0 auto'
    },
    tncHeader: {
        textAlign: 'left',
    }
}));

export default function TermConditions() {
    
    const classes = useStyles();
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('username') && localStorage.getItem('password');

    if(!isAuthenticated){
        history.push("/login") 
    }

    return (
        <React.Fragment>
            <div className="container term-conditions-page">

                <Header/>

                <div className={classes.svgBox}>
                    <TNCLogo width='50%' height='50px' />
                </div>

                <h3>Terms and Conditions</h3>

                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>

                <p>Version: 25-04</p>

                <p>Senaste Update: 2014-05-06</p>

                <div className={classes.tncBox}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis sapien elit. Vestibulum porta sed
                    enim eu lobortis. Nulla facilisi. Donec dictum nibh eu nisl efficitur posuere. Duis sit amet rhoncus
                    ex. Vivamus eu lectus metus. Duis id blandit enim, ut luctus lacus. In in elementum augue.</p>

                    <h4 className={classes.tncHeader}>Casino Requirements</h4>

                    <p>Curabitur aliquet convallis lectus quis rutrum. Pellentesque ac tempus turpis. Nulla nec pharetra lectus,
                    get aliquet tortor. Donec dapibus et nibh nec accumsan. Cras euismod sollicitudin libero, ac consectetur
                    felis feugiat ac. Suspendisse pulvinar consectetur pulvinar. Quisque sollicitudin rhoncus risus, ut
                    sollicitudin nibh congue in. Quisque a dignissim elit. Proin eget erat metus. Donec aliquet hendrerit
                    arcu, ut sollicitudin lorem laoreet quis. Maecenas id justo eu elit lacinia interdum. Integer eget tempus
                    ante. Nunc laoreet turpis quis nibh bibendum, ut finibus mi ultricies. Pellentesque vulputate nunc etiaculis commodo.
                    Sed accumsan nibh sagittis, laoreet purus vel, convallis enim.</p>

                    <h4 className={classes.tncHeader}>Curabitur Aliquet</h4>

                    <p>Curabitur aliquet convallis lectus quis rutrum. Pellentesque ac tempus turpis. Nulla nec pharetra lectus,
                    get aliquet tortor. Donec dapibus et nibh nec accumsan. Cras euismod sollicitudin libero, ac consectetur
                    felis feugiat ac. Suspendisse pulvinar consectetur pulvinar. Quisque sollicitudin rhoncus risus, ut
                    sollicitudin nibh congue in. Quisque a dignissim elit. Proin eget erat metus. Donec aliquet hendrerit
                    arcu, ut sollicitudin lorem laoreet quis. Maecenas id justo eu elit lacinia interdum. Integer eget tempus
                    ante. Nunc laoreet turpis quis nibh bibendum, ut finibus mi ultricies. Pellentesque vulputate nunc etiaculis commodo.
                    Sed accumsan nibh sagittis, laoreet purus vel, convallis enim.</p>
                </div>

                <Button
                    variant="contained"
                    className="primary-btn"
                >
                    Accept
                </Button>

            </div>
        </React.Fragment>
    )
}