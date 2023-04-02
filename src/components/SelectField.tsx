import React, { forwardRef } from 'react';
import cx from 'classnames';

import stylesInput from './InputField.module.scss';
import styles from './SelectField.module.scss';
import { CalculatorFieldsEnum } from '../pages/calculator/Calculator.enums';
import { UseFormRegister } from 'react-hook-form';
import { CalculatorFormFields } from '../pages/calculator/Calculator.types';

type SelectProps = {
	placeholder?: string;
	items?: { value: string; label: string }[];
	required?: boolean;
	errorMessage?: string;
	name: CalculatorFieldsEnum;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
	const { errorMessage, name, placeholder, items, ...rest } = props;
	return (
		<select
			required
			id={name}
			ref={ref}
			placeholder={placeholder}
			className={cx(styles.select, stylesInput.input)}
			disabled={!items?.length}
			aria-invalid={!!errorMessage}
			{...rest}
		>
			{placeholder && (
				<option value="" hidden disabled>
					{placeholder}
				</option>
			)}
			{items &&
				items.map((item, index) => (
					<option key={index} value={item.value}>
						{item.label}
					</option>
				))}
		</select>
	);
});

SelectField.displayName = 'SelectField';
