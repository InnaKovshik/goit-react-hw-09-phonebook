import { lazy } from 'react';

const Registration = lazy(() => {
	return import('./pages/Registration');
});

const Login = lazy(() => {
	return import('./pages/Login');
});

const Contacts = lazy(() => {
	return import('./pages/Contacts');
});

const MainPage = lazy(() => {
	return import('./pages/MainPage');
});

const routes = [
	{
		key: 1,
		path: '/registration',
		private: false,
		redirect: '/contacts',
		component: Registration,
		exact: true,
	},
	{
		key: 2,
		path: '/login',
		private: false,
		redirect: '/contacts',
		component: Login,
		exact: true,
	},
	{
		key: 3,
		path: '/contacts',
		redirect: '/login',
		private: true,
		component: Contacts,
		exact: true,
	},
	{
		key: 4,
		path: '/',
		redirect: '/contacts',
		private: false,
		component: MainPage,
		exact: false,
	},
];

export default routes;
