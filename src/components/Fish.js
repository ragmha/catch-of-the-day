import React from 'react';
import { formatPrice } from '../helpers';

const Fish = ({ details }) => (
	<li className="menu-fish">
		{details.name}
		<img src={details.image} alt={details.name} />
		<h3 className="fish-name">
			{details.name}
			<span className="price">{formatPrice(details.price)}</span>
		</h3>
		<p>{details.desc}</p>
		<button>Add To Order</button>
	</li>
);

export default Fish;
