export default (expenses) => {
	return expenses
		.map(({ amount }) => amount)
		.reduce((sum,value) => sum + value, 0);
};