import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	startAddExpense,
	addExpense,
	startEditExpense,
	editExpense, 
	removeExpense, 
	startRemoveExpense, 
	setExpenses, 
	startSetExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'kjasfh13ejkolqa';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expenseData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expenseData[id] = { description, note, amount, createdAt };
	});
	database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

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
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
			expect(snapshot.val()).toEqual(defaults);
			done();
		});
});


test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});

test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const { id } = expenses[0];
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('should edit expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	const { id, description, note, amount, createdAt } = expenses[0];
	const updates = {
		description: 'Yo momma',
		note: 'last night',
		amount: 0
	};
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});
		return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual({
			description,
			amount,
			note,
			createdAt,
			...updates
		});
		done();
	});
});