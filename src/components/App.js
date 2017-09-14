import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../base';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';

class App extends Component {
	static propTypes = {
		params: PropTypes.object.isRequired,
	};

	// Initial State
	state = {
		fishes: {},
		order: {},
	};

	componentWillMount() {
		// this runs before <App/> is rendered
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes',
		});

		// check if there is any order in LocalStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if (localStorageRef) {
			// update our App component's order state
			this.setState({
				order: JSON.parse(localStorageRef),
			});
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	addFish = fish => {
		// take copy of our state
		const fishes = { ...this.state.fishes };
		// add in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set state
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = updatedFish;
		this.setState({ fishes });
	};

	removeFish = key => {
		const fishes = { ...this.state.fishes };
		fishes[key] = null;
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

	removeFromOrder = key => {
		const order = { ...this.state.order };
		delete order[key];
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
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					loadSamples={this.loadSamples}
					addFish={this.addFish}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
