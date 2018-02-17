import React from 'react';
import { Link, withRouter } from 'react-router-dom'; //withRouter preserves is-active functionality
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js'

export const Header = ({ startLogout }) => (
	<header className='header'>
		<div className='content-container'>
			<div className='header__content'>
				<Link className='header__title' to='/dashboard'>
					<img src='/images/shrewdent.svg' alt='shrewdent' height='50px' width='auto' />
					<h1>Shrewdent</h1>
				</Link>
				<button className='button button--link' onClick={startLogout}>Logout</button>
			</div>
		</div>
	</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Header));