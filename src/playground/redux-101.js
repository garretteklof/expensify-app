import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy // incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const setCount = ({count}) => ({
	type: 'SET',
	count
});

const resetCount = () => ({
	type: 'RESET'
});

const store = createStore((state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			}
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			}
		case 'SET':
			return {
				count: action.count
			}
		case 'RESET':
			return {
				count: 0
			}
		default:
			return state;
	}	
});

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy:5}));

store.dispatch({
	type: 'INCREMENT'
});

store.dispatch({
	type: 'RESET'
});

store.dispatch({
	type: 'DECREMENT'
});

store.dispatch(decrementCount({decrementBy:10}));

store.dispatch({
	type: 'SET',
	count: 101
});