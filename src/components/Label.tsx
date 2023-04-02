import React from 'react';
import cx from 'classnames';

import styles from './Label.module.scss';

type LabelProps = {
	label: string;
	htmlFor: string;
	required?: boolean;
	className?: string;
};

export const Label = (props: LabelProps) => {
	const { label, htmlFor, required, className } = props;
	const classNames = cx(styles.label, className, {
		[styles.required]: required,
	});

	return (
		<label className={classNames} htmlFor={htmlFor}>
			{label}
		</label>
	);
};
