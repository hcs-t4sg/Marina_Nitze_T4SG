
import axios from "axios";
import React, { Component } from "react";
import * as d3 from "d3";
import "./Legend.css"
import "../App.css"

class Legend extends Component {

	render() {
		return (
	        <div className="legend-container">
	        	<svg height="100">
	            	<g>
				        <circle className="legend-implemented" cx="20" cy="20" r="10" text="A"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="25"> X </text>
				        <text x="40" y="25"> Metric Implemented </text>
				    </g>
				    <g>
				        <circle className="legend-nonimplemented" text="yo" cx="20" cy="50" r="10"></circle>
				        <text fill="#ffffff" text-anchor="middle" x="20" y="55"> X </text>
				        <text x="40" y="55"> Not Implemented </text>
				    </g>	
				</svg>
				<div className="legend-labels">
					<text className="legend-title"> 1. No fee </text>
					<text className="legend-title"> 2. No notary required </text>
					<text className="legend-title"> 3. No witness required </text>
					<text className="legend-title"> 4. Electronic request </text>
					<text className="legend-title"> 5. No contact </text>
				</div>
	        </div>

    	);
	}

}

export default Legend