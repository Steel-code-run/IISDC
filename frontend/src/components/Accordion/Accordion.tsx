import React, { FC } from 'react';
import styles from './Accordion.module.scss';

interface AccordionProps {}

const Accordion: FC<AccordionProps> = () => (
	<div className={styles.Accordion} data-testid="Accordion">
		Accordion Component
	</div>
);

export default Accordion;
