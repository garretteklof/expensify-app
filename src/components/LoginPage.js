import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => (
	<div className='box-layout'>
		<div className='box-layout__box'>
			<div className='box-layout__title'>
				<img src='/images/shrewdent.svg' alt='shrewdent' height='50px' width='auto' />
				<h1>Shrewdent</h1>
			</div>
			<p>a shrewd, prudent approach to personal expensing</p>
			<button className='button' onClick={startLogin}>Login With Google</button>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

