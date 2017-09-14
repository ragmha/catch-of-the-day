import React, { Component } from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

import sampleFishes from '../sample-fishes';

class App extends Component {
	// Initial State
	state = {
		fishes: {},
		order: {},
	};

	addFish = fish => {
		// update our state
		const fishes = { ...this.state.fishes };
		// add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set state
		this.setState({ fishes });
	};

	loadSamples = () => {
		this.setState({
			fishes: sampleFishes,
		});
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh SeaFood Market" />
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		);
	}
}

export default App;
