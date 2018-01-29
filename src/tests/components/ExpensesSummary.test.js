import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly with 1 expense', () => {
	const wrapper = shallow(<ExpensesSummary expenseCount = {1} expenseTotal = {100} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses', () => {
	const wrapper = shallow(<ExpensesSummary expenseCount = {11} expenseTotal = {13124420} />);
	expect(wrapper).toMatchSnapshot();
});