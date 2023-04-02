import { CalculatorFieldsEnum } from './Calculator.enums';

export const CALCULATOR_FIELDS_LABELS = {
	[CalculatorFieldsEnum.Material]: 'Выбор материала',
	[CalculatorFieldsEnum.Pipe]: 'Выбор трубы',
	[CalculatorFieldsEnum.Width]: 'Ширина',
	[CalculatorFieldsEnum.Length]: 'Длина',
	[CalculatorFieldsEnum.Frame]: 'Выбор прочности',
};

export const CALCULATOR_REQUIRED_LABEL = {
	[CalculatorFieldsEnum.Material]: `${
		CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Material]
	} - обязательное поле для заполнения`,
	[CalculatorFieldsEnum.Pipe]: `${
		CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Pipe]
	} - обязательное поле для заполнения`,
	[CalculatorFieldsEnum.Width]: `${
		CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Width]
	} - обязательное поле для заполнения`,
	[CalculatorFieldsEnum.Length]: `${
		CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Length]
	} - обязательное поле для заполнения`,
	[CalculatorFieldsEnum.Frame]: `${
		CALCULATOR_FIELDS_LABELS[CalculatorFieldsEnum.Frame]
	} - обязательное поле для заполнения`,
};

export const CALCULATOR_PLACEHOLDER_FIELD = {
	[CalculatorFieldsEnum.Material]: 'Выберите тип листа',
	[CalculatorFieldsEnum.Pipe]: 'Выберите тип трубы',
	// [CalculatorFieldsEnum.Width]: 'Ширина покрытия',
	// [CalculatorFieldsEnum.Length]: 'Длина покрытия',
	[CalculatorFieldsEnum.Frame]: 'Выберите тип прочности',
};
