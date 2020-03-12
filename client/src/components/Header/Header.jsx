import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ReactComponent as LogoutIcon } from '../../assets/logout.svg';
import endpoint from '../../endpoint';

const useStyles = makeStyles(theme => ({
	header: {
		display: 'grid',
		gridTemplateColumns: '1fr 25px',
		justifyContent: 'center'
	},
}));

export default function Header() {

	const classes = useStyles();
	const history = useHistory();

	/**
    * Triggers logout and clears all local storage values.
    * @param none 
    */
	const triggerLogout = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('password');
		localStorage.removeItem('userid');
		history.push("/login");
	}

	return (
		<div className={classes.header}>
			<h2>Logo</h2>
			<div className={classes.logoutIcon} onClick={triggerLogout}>
				<LogoutIcon width='100%' height='100%' />
			</div>
		</div>
	);
}