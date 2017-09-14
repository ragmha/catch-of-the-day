import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
	goToStore = event => {
		event.preventDefault();
		console.log('You Changed the URL!');
		// grab the text from the box
		console.log(this.storeInput.value);
		// Transition from / to /store/:storeId
	};
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					placeholder="Store Name"
					required
					defaultValue={getFunName()}
					ref={input => {
						this.storeInput = input;
					}}
				/>
				<button type="submit">Visit Store -></button>
			</form>
		);
	}
}

export default StorePicker;
