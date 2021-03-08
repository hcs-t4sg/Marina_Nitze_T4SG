import axios from "axios";
import React, { Component } from "react";
import * as d3 from "d3";

class Glyphs extends Component {

	componentDidMount() {
        this.displayData = this.props.states;
        this.initVis();
        console.log(this.props.states);
    }

    initVis() {
        var vis = this;

        vis.margin = { top: 20, right: 60, bottom: 200, left: 60 };

        vis.width = 600 - vis.margin.left - vis.margin.right;
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

        // SVG drawing area
        vis.svg = d3.select(".scorecard").append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.updateVis();
    }

    updateVis() {
        var vis = this;

        console.log(this.props.states);

    }

    render() {
    	return <div className="scorecard"></div>
    }

}

export default Glyphs;