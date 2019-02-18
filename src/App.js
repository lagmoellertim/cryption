import React, { Component } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Header from './components/header/Header';
import Body from './components/body/Body';
import AppCSS from './App.module.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import devToolsEnhancer from 'remote-redux-devtools';

class App extends Component {
	constructor() {
		super();
		this.store = createStore(reducer, devToolsEnhancer());
	}
	render() {
		return (
			<Provider store={this.store}>
				<Layout className={AppCSS.layout}>
					<Header />
					<Body />
				</Layout>
			</Provider>
		);
	}
}

export default App;
