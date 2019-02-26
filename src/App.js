import React, { Component } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import AppCSS from "./App.module.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";
import devToolsEnhancer from "remote-redux-devtools";
import Footer from "./components/footer/Footer";
import MetaTags from "react-meta-tags";

class App extends Component {
	constructor() {
		super();
		this.developmentMode = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
		if (this.developmentMode) {
			this.store = createStore(reducer, devToolsEnhancer());
		} else {
			this.store = createStore(reducer);
		}
	}
	render() {
		return (
			<Provider store={this.store}>
				{this.developmentMode ? null : (
					<MetaTags>
						<meta
							httpEquiv="Content-Security-Policy"
							content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; style-src https://fonts.googleapis.com https://cryption.pw 'unsafe-inline'; img-src 'self'; media-src 'none'; frame-src 'none'; font-src https://fonts.gstatic.com; connect-src 'none'"
						/>
						<meta
							httpEquiv="X-Content-Security-Policy"
							content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; style-src https://fonts.googleapis.com https://cryption.pw 'unsafe-inline'; img-src 'self'; media-src 'none'; frame-src 'none'; font-src https://fonts.gstatic.com; connect-src 'none'"
						/>
						<meta
							httpEquiv="X-WebKit-CSP"
							content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; style-src https://fonts.googleapis.com https://cryption.pw 'unsafe-inline'; img-src 'self'; media-src 'none'; frame-src 'none'; font-src https://fonts.gstatic.com; connect-src 'none'"
						/>
					</MetaTags>
				)}
				<Layout className={AppCSS.layout}>
					<Header />
					<Body />
					<Footer />
				</Layout>
			</Provider>
		);
	}
}

export default App;
