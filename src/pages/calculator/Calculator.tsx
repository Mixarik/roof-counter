import React, { useState } from 'react';
import useSWR from 'swr';
import { Controller, useForm } from 'react-hook-form';

import { FormGroup } from '../../components/FormGroup';

import { calculatorFieldsConfig } from './Calculator.config';
import { CalculatorFormFields, IConfig, IDataBase } from './Calculator.types';
import {
	CalculatorConfigType,
	CalculatorDataType,
	CalculatorFieldsEnum,
	FieldTypesEnum,
} from './Calculator.enums';
import { InputField } from '../../components/InputField';
import { SelectField } from '../../components/SelectField';
import { ResultTable, TableDataT } from '../../components/ResultTable';
import { calculateFixData, calculateListData, calculatePipeData } from './Calculator.helpers';

const getMinAndMax = (key: string, calculatorConfig: IConfig[]) => {
	const keyItem = calculatorConfig.find((item) => item.key === key);
	return { min: keyItem?.min, max: keyItem?.max };
};

export const Calculator = ({
	ruleWidth,
	ruleLength,
	materialItems,
	pipeItems,
	frameItems,
	calculateTableData,
	tableData,
}: {
	ruleLength: { min?: number; max?: number };
	ruleWidth: { min?: number; max?: number };
	materialItems: { value: string; label: string }[];
	pipeItems: { value: string; label: string }[];
	frameItems: { value: string; label: string; step?: number }[];
	calculateTableData: (data: CalculatorFormFields) => { area: number; cell: string };
	tableData: TableDataT[];
}) => {
	const [areaAndCell, setAreaAndCell] = useState<{ area: number; cell: string }>({
		area: 0,
		cell: '',
	});
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<CalculatorFormFields>({
		defaultValues: {
			[CalculatorFieldsEnum.Material]: '',
			[CalculatorFieldsEnum.Pipe]: '',
			[CalculatorFieldsEnum.Width]: '',
			[CalculatorFieldsEnum.Length]: '',
			[CalculatorFieldsEnum.Frame]: '',
		},
	});
	const onSubmit = handleSubmit((data) => {
		calculateTableData(data);
		setAreaAndCell({ area: calculateTableData(data).area, cell: calculateTableData(data).cell });
	});

	return (
		<>
			<form>
				<div className="container">
					<div className="row mb-3">
						{calculatorFieldsConfig({
							materialItems,
							pipeItems,
							frameItems,
							ruleLength,
							ruleWidth,
						}).map((item) => (
							<FormGroup
								errorMessage={errors?.[item.name]?.message}
								key={item.name}
								required={item.required}
								name={item.name}
								label={item.label}
							>
								<Controller
									name={item.name}
									rules={item.rules}
									control={control}
									render={({ field }) => {
										switch (item.type) {
											case FieldTypesEnum.Number: {
												return (
													<InputField
														errorMessage={errors?.[item.name]?.message}
														{...field}
														{...item}
													/>
												);
											}
											case FieldTypesEnum.Dropdown: {
												return (
													<SelectField
														errorMessage={errors?.[item.name]?.message}
														{...field}
														{...item}
													/>
												);
											}
										}
									}}
								/>
							</FormGroup>
						))}
					</div>
					<button className="btn btn-primary mb-3" type="button" onClick={onSubmit}>
						Расчитать
					</button>
				</div>
			</form>
			<div className="mb-2 container d-flex justify-content-between w-50">
				<span>Площадь изделия - <b>{areaAndCell.area}</b> м2</span>
				<span>Размер ячейки - <b>{areaAndCell.cell}</b></span>
			</div>
			<ResultTable data={tableData} />
		</>
	);
};

const CalculatorContainer = () => {
	const [tableData, setTableData] = useState<TableDataT[]>([]);

	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	const { data: calculatorData = [] } = useSWR<IDataBase[]>(
		'https://raw.githubusercontent.com/Vistegra/test-calc-js/master/data/data.json',
		fetcher
	);
	const { data: calculatorConfig = [] } = useSWR<IConfig[]>(
		'https://raw.githubusercontent.com/Vistegra/test-calc-js/master/data/config.json',
		fetcher
	);

	const calculateTableData = (data: CalculatorFormFields) => {
		const { material, length, width, pipe, frame } = data;

		const foundList = calculatorData.find((item) => item.name === material);
		const foundPipe = calculatorData.find((item) => item.name === pipe);
		const foundFrame = calculatorConfig.find((item) => item.key === frame);
		const fixData = calculatorData.find((item) => item.type === CalculatorDataType.Fix);
		const plasticFixData = calculatorConfig.find(
			(item) => item.type === CalculatorConfigType.Fix && item.key === 'plastic'
		);
		const metalFixData = calculatorConfig.find(
			(item) => item.type === CalculatorConfigType.Fix && item.key === 'metal'
		);

		const area = +length * +width;

		const cell = calculatePipeData({ length: +length, width: +width, foundPipe, foundFrame }).cell;

		setTableData([
			[calculateListData({ area, foundList })],
			[calculatePipeData({ length: +length, width: +width, foundPipe, foundFrame })],
			[calculateFixData({ fixData, plasticFixData, metalFixData, foundList, area })],
		]);
		return { area, cell };
	};

	const ruleLength = getMinAndMax('length', calculatorConfig);
	const ruleWidth = getMinAndMax('width', calculatorConfig);

	const materialItems = calculatorData
		.filter((item) => item.type === CalculatorDataType.List)
		.map((item) => ({
			value: item.name,
			label: `${item.name}-${item.material}`,
		}));

	const pipeItems = calculatorData
		.filter((item) => item.type === CalculatorDataType.Pipe)
		.map((item) => ({
			value: item.name,
			label: item.name,
		}));

	const frameItems = calculatorConfig
		.filter((item) => item.type === CalculatorConfigType.Frame)
		.map((item) => ({ value: item.key, label: item.name }));

	return (
		<Calculator
			tableData={tableData}
			calculateTableData={calculateTableData}
			ruleLength={ruleLength}
			ruleWidth={ruleWidth}
			frameItems={frameItems}
			pipeItems={pipeItems}
			materialItems={materialItems}
		/>
	);
};

export default CalculatorContainer;
