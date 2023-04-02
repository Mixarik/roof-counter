import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CalculatorContainer from '../pages/calculator/Calculator';
import { Layout } from './Layout';

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<CalculatorContainer />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
