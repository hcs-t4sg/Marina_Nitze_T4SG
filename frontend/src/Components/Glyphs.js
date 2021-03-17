import React, { Component } from "react";
import * as d3 from "d3";
// import tip from "d3-v6-tip";
import "./Glyphs.css";

const availableColor = '#276a82';
const availableColorLighter = '#c8e0e3';
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
    }

	componentDidMount() {
        this.initVis();
    }

    // Redraw the glyphs each time a checkbox is selected
    componentDidUpdate(prevProps, prevState) {
    	var vis = this;
	    vis.drawGlyphs();
	}

    // Define parameters and Playbook drawing area (scorecard-container)
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

        vis.tooltip = d3.select(".scorecard").append("div")   
            .attr("class", "tooltip");              

        vis.drawGlyphs();
    }

    // Use data from one state and g element to draw a glyph
    drawSingleGlyph(state, g) {
        var vis = this;

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
    		.style('stroke', d => state[d] === true ? 'none' : unavailableColor)
            .on('mouseover', function (event,d, i) {
                vis.tooltip
                    .html(
                      `<div>Practice: ${d}</div><div>Status: ${state[d]}</div>`
                    )
                    .style('visibility', 'visible');
                  d3.select(this).transition().attr('fill', availableColor);
            })
            .on('mousemove', function (event) {
                vis.tooltip
                    .style('top', event.pageY - 315 + 'px')
                    .style('left', event.pageX - 45 + 'px');
                console.log(event.pageX);
            })
            .on('mouseout', function (event) {
                vis.tooltip.html("").style('visibility', 'hidden');
                d3.select(this).transition().attr('fill', '#fff');
            });

        practice.append('text')
            .text(d => allPractices.indexOf(d) + 1)
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('class', 'label')
            .style('fill', '#fff')
            .style('font-size', (circleRadius + 3) + 'px');

	}

	// Iterate through state data, creating a glyph svg for each
	drawGlyphs() {
		var vis = this;

		d3.select('.scorecard-container').selectAll('*').remove();
		d3.select('.glyph').selectAll('*').remove();

		var glyph = d3.select('.scorecard-container')
			.selectAll('.glyph')
		    .data(this.props.states)
		    .enter().append('div')
		    .attr('class', 'glyph')
		    .append('svg').attr('width', '20%').attr('height', '100%');

		glyph.exit().remove();

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
    	return (<div><div className="scorecard"></div></div>)
    }
}

export default Glyphs;