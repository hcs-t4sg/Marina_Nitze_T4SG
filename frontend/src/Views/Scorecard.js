import React, { Component } from "react";
import * as d3 from "d3";


export default function Scorecard() {
    var margin = {top: 40, right: 60, bottom: 60, left: 60};
    var width = 1000 - margin.left - margin.right;
    var height = 800 - margin.top - margin.bottom;

    // SVG scorecard drawing area
    var svg = d3.select(".scorecard").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.json('http://localhost:8000/api/states/')
		.then(function(data) {
		    console.log(data);

		data.forEach( function(value, index) {
			svg.append("text")
		        .attr("x", 100)
		        .attr("y", 100 * index)
		        .text(value.name + " " + value.population);

        });

	});


    return (
        <div>
            <h1> Scorecard </h1>
            <div class="scorecard"></div>
        </div>

    );
}
