import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ color, size, onClick, disabled, children }) {

	const styles = {
		color,
		fontSize: Button.sizes[size],
	};

	return (
		<button className="button" style={styles} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

Button.propTypes = {
	/** Button label */
    children: PropTypes.node.isRequired,
    
	/** The color for the button */
    color: PropTypes.string,
    
	/** The size of the button */
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    
	/** Disable button */
    disabled: PropTypes.bool,
    
	/** Gets called when the user clicks on the button */
	onClick: PropTypes.func,
};

Button.defaultProps = {
	color: '#000',
	size: 'normal',
	onClick: event => {
		// eslint-disable-next-line no-console
		console.log('You have clicked me!', event.target);
	},
};

Button.sizes = {
	small: '12px',
	normal: '14px',
	large: '16px',
};