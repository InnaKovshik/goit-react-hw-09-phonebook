import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	FormControl,
	Input,
	InputLabel,
	Button,
	Icon,
	Tooltip,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';

import operations from '../../redux/contacts/contactsOperetions';
import selectors from '../../redux/contacts/contactsSelectors';

const INITIAL_STATE = {
	name: '',
	number: '',
};

const MyButton = styled(Button)({
	color: 'teal',
	backgroundColor: 'rgb(233, 229, 229)',
	marginTop: '25px',
});

const MyInput = styled(Input)({
	margin: 'auto',
	fontSize: '26px',
	textAlign: 'center',
});

const ContactForm = ({ checkedName, sendToDataBase }) => {
	const [user, setUser] = useState(INITIAL_STATE);

	const resetState = () => {
		setUser(INITIAL_STATE);
	};

	const showErrorMessage = newContactData => {
		toast(`${newContactData.name} already in your contact's list!`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			transition: Zoom,
		});
	};

	const handleNewValue = ({ target }) => {
		const { value, name } = target;

		setUser({
			...user,
			[name]: value,
		});
	};

	const handleAddNewContact = () => {
		const newContactData = user;

		checkedName(newContactData)
			? showErrorMessage(newContactData)
			: sendToDataBase(newContactData);

		resetState();
	};

	return (
		<form autoComplete="off">
			<FormControl>
				<InputLabel>
					<Icon>person</Icon> Name
				</InputLabel>
				<MyInput
					label="Error"
					type="name"
					name="name"
					value={user.name}
					onChange={handleNewValue}
				/>
			</FormControl>

			<FormControl>
				<InputLabel>
					{' '}
					<Icon>phone</Icon>
					Phone
				</InputLabel>
				<MyInput
					type="text"
					key="number"
					name="number"
					value={user.number}
					onChange={handleNewValue}
				/>
			</FormControl>

			<ToastContainer />
			<Tooltip title="Please, enter name and phone to adding!">
				<span>
					<MyButton
						disabled={!user.name || !user.number}
						variant="contained"
						endIcon={<Icon>person</Icon>}
						onClick={handleAddNewContact}
					>
						Add contact
					</MyButton>
				</span>
			</Tooltip>
		</form>
	);
};

const mapStateToProps = state => {
	return {
		checkedName: selectors.getCheckedName(state),
	};
};

const mapDispathcToProps = dispatch => {
	return {
		sendToDataBase: newContact => dispatch(operations.addContact(newContact)),
	};
};

export default connect(mapStateToProps, mapDispathcToProps)(ContactForm);
