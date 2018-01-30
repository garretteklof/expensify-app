import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
	const action = removeExpense({id: 'abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: 'abc'
	});
});

test('should setup edit expense action object', () => {
	const action = editExpense('abc', { amount:100, description: 'Hi' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'abc',
		'updates': {
			amount: 100,
			description: 'Hi'
		}
	});
});

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'Mouse',
		amount: 30,
		note: 'Mickey is his name',
		createdAt: 1000
	};
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});
	const defaults = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	};
	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaults
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(defaults);
			done();
		});
});


// test('should setup add expense action object with default values', () => {
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			description:'',
// 			note: '',
// 			amount: 0,
// 			createdAt: 0,
// 			id: expect.any(String)
// 		}
// 	});
// });