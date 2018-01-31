import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'; //withRouter preserves is-active functionality
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js'

export const Header = ({ startLogout }) => (
	<header>
		<h1>Expensify</h1>
		<NavLink to='/dashboard' activeClassName='is-active'>Dashboard</NavLink>
		<NavLink to='/create' activeClassName='is-active'>Create Expense</NavLink>
		<button onClick={startLogout}>Logout</button>
	</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Header));