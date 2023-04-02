import React, { ReactNode } from 'react';

import { Label } from './Label';
import { FieldErrorMessage } from './FieldErrorMessage';

import { CalculatorFieldsEnum } from '../pages/calculator/Calculator.enums';

type FormFieldProps = {
	required?: boolean;
	label: string;
	name: CalculatorFieldsEnum;
	errorMessage?: string;
	children: ReactNode;
};

export const FormGroup = (props: FormFieldProps) => {
	const { required, label, name, errorMessage, children } = props;
	return (
		<div className="col-6">
			<Label required={required} label={label} htmlFor={name} />
			{children}
			<FieldErrorMessage message={errorMessage} />
		</div>
	);
};
