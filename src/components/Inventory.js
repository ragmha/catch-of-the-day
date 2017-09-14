import React from 'react';
import AddFishForm from './AddFishForm';

const Inventory = props => (
	<div>
		<h2>Inventory</h2>
		<AddFishForm addFish={props.addFish} />
	</div>
);

export default Inventory;
