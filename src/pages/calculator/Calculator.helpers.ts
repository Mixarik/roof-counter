import { IConfig, IDataBase } from './Calculator.types';

const emptyRowItem = { name: '', unit: '', amount: 0, price: 0, cell: '' };

export const calculateListData = ({ area, foundList }: { area: number; foundList?: IDataBase }) => {
	if (!foundList) return emptyRowItem;
	const listCount = Math.ceil(area / foundList.width);
	return {
		name: foundList.name,
		unit: foundList.unit,
		amount: listCount,
		price: listCount * foundList.price,
	};
};

export const calculatePipeData = ({
	length,
	width,
	foundPipe,
	foundFrame,
}: {
	length: number;
	width: number;
	foundPipe?: IDataBase;
	foundFrame?: IConfig;
}) => {
	if (!foundPipe || !foundFrame) return emptyRowItem;

	const lRows = Math.ceil(length / foundFrame.step);
	const newStepLength = +(length / lRows).toFixed(2);

	const wRows = Math.ceil(width / foundFrame.step);
	const newStepWidth = +(width / wRows).toFixed(2);

	const pipeAmount = Math.ceil(
		lRows * (wRows + 1) * newStepWidth + wRows * (lRows + 1) * newStepLength
	);

	const cell = `${newStepLength - foundPipe.width / 100} м x ${
		newStepWidth - foundPipe.width / 100
	} м`;

	return {
		name: foundPipe.name,
		unit: foundPipe.unit,
		amount: pipeAmount,
		price: pipeAmount * foundPipe.price,
		cell: cell,
	};
};

export const calculateFixData = ({
	fixData,
	plasticFixData,
	metalFixData,
	foundList,
	area,
}: {
	fixData?: IDataBase;
	plasticFixData?: IConfig;
	metalFixData?: IConfig;
	foundList?: IDataBase;
	area: number;
}) => {
	if (!fixData || !metalFixData || !plasticFixData) return emptyRowItem;

	const fixAmount =
		foundList?.material === 'metal'
			? (metalFixData?.value ?? 0) * area
			: (plasticFixData?.value ?? 0) * area;

	return {
		name: fixData.name,
		unit: fixData.unit,
		amount: fixAmount,
		price: Math.round(fixAmount * fixData.price),
	};
};
