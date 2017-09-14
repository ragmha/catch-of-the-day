import React, { Component } from 'react';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends Component {
	// Initial State
	state = {
		fishes: {},
		order: {},
	};

	addFish = fish => {
		// take copy of our state
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

	addToOrder = key => {
		// take copy of our state
		const order = { ...this.state.order };
		// update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// update our state
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh SeaFood Market" />
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
						))}
					</ul>
				</div>
				<Order />
				<Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
			</div>
		);
	}
}

export default App;
