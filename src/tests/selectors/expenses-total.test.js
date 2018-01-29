import getExpensesTotal from '../../selectors/expenses-total.js';
import expenses from '../fixtures/expenses';

test('should add up multiple expenses correctly', () => {
	const result = getExpensesTotal(expenses);
	expect(result).toBe(114195);
});

test('should add up a single expense correctly', () => {
	const result = getExpensesTotal([expenses[0]]);
	expect(result).toBe(195);
});

test('should return 0 if no expenses', () => {
	const result = getExpensesTotal([]);
	expect(result).toBe(0);
});