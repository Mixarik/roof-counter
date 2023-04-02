import cx from 'classnames';

import styles from './FieldErrorMessage.module.scss';

type FormErrorMessageProps = {
	message?: string;
	className?: string;
};

export const FieldErrorMessage = ({ message, className }: FormErrorMessageProps) => (
	<div className={cx(styles.inputErrorMessage, className)}>{message}</div>
);
