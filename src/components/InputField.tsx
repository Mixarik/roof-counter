import React, { forwardRef } from 'react';

import { CalculatorFieldsEnum, FieldTypesEnum } from '../pages/calculator/Calculator.enums';
import styles from './InputField.module.scss';

type InputFieldProps = {
	required?: boolean;
	type?: FieldTypesEnum;
	placeholder?: string;
	errorMessage?: string;
	name: CalculatorFieldsEnum;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
	const { required, type = FieldTypesEnum.Number, errorMessage, name, placeholder, ...rest } = props;
	return (
		<input
			ref={ref}
			id={name}
			name={name}
			type={type}
			placeholder={placeholder}
			className={styles.input}
			aria-invalid={!!errorMessage}
			{...rest}
		/>
	);
});

InputField.displayName = 'InputField';
