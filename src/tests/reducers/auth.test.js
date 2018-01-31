import authReducer from '../../reducers/auth';

test('should log user in and set uid', () => {
	const uid = 'asdj12394';
	const action = {
		type: 'LOGIN',
		uid
	};
	const state = authReducer({}, action);
	expect(state).toEqual({uid});
});

test('should log user out and wipe uid', () => {
	const action = {
		type: 'LOGOUT'
	};
	const state = authReducer({uid: 'SOMEFAKEUID'}, action);
	expect(state).toEqual({});
});