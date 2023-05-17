import React from 'react';
import styles from './Overlay.module.scss';

const Overlay = ({children, isOpen, setIsOpen}) => {

	const checkClick = (e) => {
		if(e.currentTarget === e.target) {
			setIsOpen(false)
		}
	}

	const childrenWithProps = React.Children.map(children, child => {

			return React.cloneElement(child, { isOpen, setIsOpen });

	});
	if(!isOpen) return null

	return <div className={styles.overlay} onClick={checkClick}>
		{childrenWithProps}</div>;
};

export default Overlay;
