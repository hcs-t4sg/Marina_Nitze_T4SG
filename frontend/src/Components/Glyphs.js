import axios from "axios";
import React, { Component } from "react";
import * as d3 from "d3";
import "./Glyphs.css";

const backgroundColor = '#fff';
const primaryTextColor = '#000';
const availableColor = '#0D77AC';
const availableColorLighter = '#C1D6E4';
const unavailableColor = '#d8d8d8';
const unavailableColorLighter = '#ddd';
const bestPractices = [
		'no_fee',
		'no_notary_required',
		'no_witness_required',
		'office_contact',
		'electronic_request'
	];

class Glyphs extends Component {

	constructor(props) {
        super(props);
        this.state = {
            states:props.states
        };
    }

	componentDidMount() {
        this.initVis();
    }

    initVis() {
        var vis = this;

        vis.margin = { top: 20, right: 60, bottom: 200, left: 60 };

        vis.width = 600 - vis.margin.left - vis.margin.right;
        vis.height = 500 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select(".scorecard").append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.drawGlyphs();
    }

    drawSingleGlyph(state, g) {
    	var vis = this;

    	const practicesUnavailble = bestPractices.filter(p => state[p] === false);
    	const practicesAvailble = bestPractices.filter(p => state[p] === true);
    	const practicesCount = practicesAvailble.length

    	var allPractices = []
    	for (var key in state) {
		    if (state.hasOwnProperty(key)) {
		        if (bestPractices.includes(key)) {
	    			allPractices.push(key)
	    		}
		    }
		}

    	const width = 80;
    	const height = 80;
		const center = { x: width / 2, y: height / 2 };
		const glyphRadius = Math.round(height / 3);
		const circleRadius = Math.round(glyphRadius / 4);
		function pentagonVertex(i) {
		    const angle = i / 5 * Math.PI * 2 + 1.1 * Math.PI;
		    return {
		    	x: Math.cos(angle) * glyphRadius + center.x,
		    	y: Math.sin(angle) * glyphRadius + center.y
		    };
	    }

	    const integration = g.selectAll('.integration')
		    .data(state)
		    .enter().append('g')
		    .attr('class', 'integration');

		integration.append('path')
		    .attr('d', site => {
		      const points = Object.values(state).map((p, i) => {
		        return p === true ? pentagonVertex(i) : null;
		      }).filter(p => p);
		      if (points.length === 2) {
		        return 'M' + points.map(p => [p.x, p.y].join(',')).join('L');
		      } else {
		        return 'M' + points.map(p => [p.x, p.y].join(',')).join('L') + 'Z';
		      }
		    })
		    .attr('fill', site => site.practicesCount > 2 ? availableColorLighter : availableColorLighter)
		    .attr('stroke', site => site.practicesCount > 2 ? 'none' : availableColorLighter)
		    .attr('stroke-width', circleRadius * 2);


		const practice = g.selectAll('.practice')
		    .data(practicesAvailble)
		    .enter().append('g')
		    .attr('class', 'practice')
		    .attr('transform', (d, i) => {
		    	const v = pentagonVertex(i);
		    	return `translate(${v.x},${v.y})`;
		    });

    	practice.append('circle')
		    .attr('r', circleRadius)
		    .style('fill', availableColor)
		    .style('stroke', unavailableColor);

  		practice.append('text')
		    .text("")
		    .attr('text-anchor', 'middle')
		    .attr('dy', '0.35em')
		    .attr('class', 'label')
		    .style('fill', backgroundColor)
		    .style('font-size', (circleRadius + 3) + 'px');

	}

	drawGlyphs() {
		var vis = this;

		const glyph = vis.svg.selectAll('.glyph')
		    .data(this.state.states)
		    .enter().append('g')
		    .attr('class', 'glyph');

			const width = 80;
			const topMargin = 15;

	    glyph.each(function (d, i) {

	    	const g = d3.select(this).append('g');
		    g.attr('transform', `translate(${100 * i}, ${topMargin})`);
		    g.append('text')
		    	.attr('x', width / 2)
		    	.attr('text-anchor', 'middle')
		    	.text(d['name']);
		    vis.drawSingleGlyph(d, g);
		});
	}

    render() {
    	return ( <div>
    				<div className="scorecard"></div>
    			</div>
    	)
    }

}

export default Glyphs;