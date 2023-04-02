import {
	CalculatorConfigType,
	CalculatorDataType,
	CalculatorDataUnit,
	CalculatorFieldsEnum,
	FieldTypesEnum,
} from './Calculator.enums';

export interface IDataBase {
	type: CalculatorDataType;
	name: string;
	unit: CalculatorDataUnit;
	material: string;
	width: number;
	price: number;
}

export interface IConfig {
	type: CalculatorConfigType;
	key: string;
	name: string;
	min?: number;
	max?: number;
	step: number;
	value?: number;
}

export type CalculatorFieldConfigT = {
	name: CalculatorFieldsEnum;
	type: FieldTypesEnum;
	label: string;
	required: boolean;
	items?: { value: string; label: string }[];
	placeholder?: string;
	rules: {
		required: string;
		min?: {
			value: number;
			message: string;
		};
		max?: {
			value: number;
			message: string;
		};
	};
};

export type CalculatorFormFields = {
	[CalculatorFieldsEnum.Material]: string;
	[CalculatorFieldsEnum.Pipe]: string;
	[CalculatorFieldsEnum.Width]: string;
	[CalculatorFieldsEnum.Length]: string;
	[CalculatorFieldsEnum.Frame]: string;
};
