import React, { Component } from "react";
import * as d3 from "d3";
import "./Glyphs.css";

const availableColor = '#0D77AC';
const availableColorLighter = '#C1D6E4';
const unavailableColor = '#d8d8d8';
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

        vis.width = 1000 - vis.margin.left - vis.margin.right;
        vis.height = 900 - vis.margin.top - vis.margin.bottom;

        vis.svg = d3.select(".scorecard").append("div")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("class", "scorecard-container")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        vis.drawGlyphs();
    }

    drawSingleGlyph(state, g) {

    	const practicesAvailble = bestPractices.filter(p => state[p] === true);
    	const allPractices = bestPractices.filter(p => state[p] === true || state[p] === false);

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
		    .data(allPractices)
		    .enter().append('g')
		    .attr('class', 'integration');

		integration.append('path')
		    .attr('d', d => {
				const points = allPractices.map((p, i) => {
		        	return state[p] === true ? pentagonVertex(i) : null;
		        }).filter(p => p);
		    	if (points.length === 2) {
		        	return 'M' + points.map(p => [p.x, p.y].join(',')).join('L');
		    	} else {
		        	return 'M' + points.map(p => [p.x, p.y].join(',')).join('L') + 'Z';
		    	}
		    })
		    .attr('fill', practicesAvailble.length > 2 ? availableColorLighter : 'none')
		    .attr('stroke', practicesAvailble.length > 2 ? 'none' : availableColorLighter)
		    .attr('stroke-width', circleRadius * 2)
		    .attr('practice-status', d => {
		      return state[d] === true;
		    })
		    .attr('practice-name', d => {
		      return d;
		    });


		const practice = g.selectAll('.practice')
		    .data(allPractices)
		    .enter().append('g')
		    .attr('class', 'practice')
		    .attr('transform', (d, i) => {
		    	const v = pentagonVertex(i);
		    	return `translate(${v.x},${v.y})`;
		    })
		    .attr('practice-status', d => {
		      return state[d] === true;
		    })
		    .attr('practice-name', d => {
		      return d;
		    });

    	practice.append('circle')
		    .attr('r', circleRadius)
		    .style('fill', d => state[d] === true ? availableColor : unavailableColor)
    		.style('stroke', d => state[d] === true ? 'none' : unavailableColor);

	}

	drawGlyphs() {
		var vis = this;

		const glyph = d3.select('.scorecard-container')
			.selectAll('.glyph')
		    .data(this.state.states)
		    .enter().append('div')
		    .attr('class', 'glyph')
		    .append('svg').attr('width', '20%').attr('height', '100%');

			const width = 110;
			const topMargin = 15;

	    glyph.each(function (d, i) {
	    	const g = d3.select(this).append('g');
		    g.attr('transform', `translate(0, ${topMargin})`);
		    g.append('text')
		    	.attr('class', 'glyph-titles')
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