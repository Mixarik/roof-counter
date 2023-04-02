import { CalculatorFieldsEnum, FieldTypesEnum } from './Calculator.enums';
import { CalculatorFieldConfigT } from './Calculator.types';
import {
	CALCULATOR_FIELDS_LABELS,
	CALCULATOR_PLACEHOLDER_FIELD,
	CALCULATOR_REQUIRED_LABEL,
} from './Calculator.constants';

export const calculatorFieldsConfig = ({
	materialItems,
	pipeItems,
	frameItems,
	ruleLength,
	ruleWidth,
}: {
	materialItems: { value: string; label: string }[];
	pipeItems: { value: string; label: string }[];
	frameItems: { value: string; label: string }[];
	ruleLength: { min?: number; max?: number };
	ruleWidth: { min?: number; max?: number };
}): CalculatorFieldConfigT[] => {
	return [
		{
			name: CalculatorFieldsEnum.Material,
			type: FieldTypesEnum.Dropdown,
			label: CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Material],
			placeholder: CALCULATOR_PLACEHOLDER_FIELD[CalculatorFieldsEnum.Material],
			required: true,
			items: materialItems,
			rules: {
				required: CALCULATOR_REQUIRED_LABEL[CalculatorFieldsEnum.Material],
			},
		},
		{
			name: CalculatorFieldsEnum.Pipe,
			type: FieldTypesEnum.Dropdown,
			label: CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Pipe],
			placeholder: CALCULATOR_PLACEHOLDER_FIELD[CalculatorFieldsEnum.Pipe],
			required: true,
			items: pipeItems,
			rules: {
				required: CALCULATOR_REQUIRED_LABEL[CalculatorFieldsEnum.Pipe],
			},
		},
		{
			name: CalculatorFieldsEnum.Width,
			type: FieldTypesEnum.Number,
			label: CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Width],
			required: true,
			rules: {
				required: CALCULATOR_REQUIRED_LABEL[CalculatorFieldsEnum.Width],
				min: {
					value: ruleWidth?.min || 1,
					message: ruleWidth?.min ? `Минимум ${ruleWidth?.min} метров` : '',
				},
				max: {
					value: ruleWidth?.max || 100,
					message: ruleWidth?.max ? `Максимум ${ruleWidth?.max} метров` : '',
				},
			},
		},
		{
			name: CalculatorFieldsEnum.Length,
			type: FieldTypesEnum.Number,
			label: CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Length],
			required: true,
			rules: {
				required: CALCULATOR_REQUIRED_LABEL[CalculatorFieldsEnum.Length],
				min: {
					value: ruleLength?.min || 1,
					message: ruleLength?.min ? `Минимум ${ruleLength?.min} метров` : '',
				},
				max: {
					value: ruleLength?.max || 100,
					message: ruleLength?.max ? `Максимум ${ruleLength?.max} метров` : '',
				},
			},
		},
		{
			name: CalculatorFieldsEnum.Frame,
			type: FieldTypesEnum.Dropdown,
			label: CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Frame],
			placeholder: CALCULATOR_PLACEHOLDER_FIELD[CalculatorFieldsEnum.Frame],
			required: true,
			items: frameItems,
			rules: {
				required: CALCULATOR_REQUIRED_LABEL[CalculatorFieldsEnum.Frame],
			},
		},
	];
};
