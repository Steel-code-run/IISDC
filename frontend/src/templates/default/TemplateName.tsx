import React, { FC } from 'react';
import styles from './Box.module.scss';

export interface TemplateNameProps {}

const TemplateName: FC<TemplateNameProps> = () => (
	<div className={styles.templateName} data-testid="Box">
		TemplateName Component
	</div>
);

export default TemplateName;
