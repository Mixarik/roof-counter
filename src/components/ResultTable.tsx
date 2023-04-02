import React from 'react';
import { thConfig } from './ResultTable.config';

type TableDataItemT = {
	name: string;
	unit: string;
	amount: number;
	price: number;
	cell?:string
};

export type TableDataT = TableDataItemT[];

export const ResultTable = ({ data }: { data: TableDataT[] }) => {
	const totalAmount = data.reduce((acc, row) => {
		row.forEach((item) => {
			acc += item.price;
		});
		return acc;
	}, 0);
	return (
		<div className="container">
			<table className="table">
				<thead>
					<tr>
						{Object.keys(thConfig).map((item, idx) => (
							<th key={`${idx}_${item}`}>{thConfig[item]}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{row.map((cell, cellIndex) => (
								<React.Fragment key={cellIndex}>
									<td>{cell.name}</td>
									<td>{cell.unit}</td>
									<td>{cell.amount}</td>
									<td>{cell.price}</td>
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				Итого: <b>{totalAmount}</b>
			</div>
		</div>
	);
};
