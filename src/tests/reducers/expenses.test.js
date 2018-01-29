import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
	const state = expensesReducer(undefined, {type: '@@INIT'});
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: -1
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const action = {
		type: 'ADD_EXPENSE',
		expense: {
			id: 4,
			description: 'Car',
			amount: 1000000,
			note: 'Lambo',
			createdAt: 0
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense by id', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			description: 'Gumby'
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toBe('Gumby');
});

test('should not edit an expense by id if not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: -1,
		updates: {
			description: 'Gumby'
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

