import React, { Component } from "react";
import * as d3 from "d3";
import "./Glyphs.css";
import "../res/Values.css";

const availableColor = '#276a82';
const availableColorLighter = '#c8e0e3';
const unavailableColor = '#ccb6c5';
const unknownColor = "#bdbdbd";
const partiallyImplementedColor = "#4B73DB";

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

        vis.svg = d3.select(".scorecard").append("div")
            .attr("class", "scorecard-container");

        vis.tooltip = d3.select(".scorecard").append("div")   
            .attr("class", "tooltip");              

        vis.drawGlyphs();
    }

    // Use data from one state and g element to draw a glyph
    drawSingleGlyph(state, g) {
        var vis = this;

    	const allPractices = Object.keys(state).filter(p => p.startsWith('practice_')).slice(0, this.props.totalCount);
    	const allPracticesStatuses = vis.determinePracticeStatuses(allPractices, state);
    	const practicesAvailble = Object.keys(allPracticesStatuses).filter(p => allPracticesStatuses[p] === 'fully_implemented');

    	const width = 80;
    	const height = 80;
		const center = { x: width / 2, y: height / 2 };
		const glyphRadius = Math.round(height / 3);
		const circleRadius = Math.round(glyphRadius / 4);
		function pentagonVertex(i, numV) {
		    const angle = i / numV * Math.PI * 2 + 1.1 * Math.PI;
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
		        	return (state[p] === true) ? pentagonVertex(i, this.props.totalCount) : null;
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
		    	const v = pentagonVertex(i, this.props.totalCount);
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
		    .attr('class', d => allPracticesStatuses[d])
            .on('mouseover', function (event,d, i) {
                vis.tooltip
                    .html(
                      `<div>Practice: ${d}</div><div>Status: ${state[d]}</div>`
                    )
                    .style('visibility', 'visible');
                  // d3.select(this).transition().attr('fill', availableColor);
            })
            .on('mousemove', function (event) {
                vis.tooltip
                    .style('top', event.pageY - 310 + 'px')
                    .style('left', event.pageX - 210 + 'px');
            })
            .on('mouseout', function (event) {
                vis.tooltip.html("").style('visibility', 'hidden');
                // d3.select(this).transition().attr('fill', '#fff');
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
		    	.attr('x', width / 2.5)
		    	.attr('text-anchor', 'middle')
		    	.text(d['stateData']['name']);
		    vis.drawSingleGlyph(d['implementationData'], g);
		});
	}


	determinePracticeStatuses(practices, state) {

		const practice_status_dict = {};
		for (var i = 1; i <= practices.length; i++) {
		
			const num_subpractices = this.props.currentIssue["num_subpractices_" + i];
			const main_status = state['practice_' + i];
			var no_count = 0;
			var yes_count = 0;
			var unknown_count = 0;
			
			if (num_subpractices > 0) {
				for (var j = 1; j <= num_subpractices; j++) {
					if (state['subpractice_' + i + '_' + j] == true) yes_count++;
					else if (state['subpractice_' + i + '_' + j] == false) no_count++;
					else unknown_count++;
            	}
            	if (yes_count == num_subpractices) 	practice_status_dict['practice_' + i] = 'fully_implemented';
            	else if (no_count == num_subpractices || (no_count > 0 && yes_count == 0)) 	practice_status_dict['practice_' + i] = 'not_implemented';
            	else if ((no_count > 0 && yes_count > 0) || (yes_count > 0 && no_count == 0)) practice_status_dict['practice_' + i] = 'partially_implemented';
            	else practice_status_dict['practice_' + i] = 'status_unknown';
    		} 
    		else if (main_status == true) practice_status_dict['practice_' + i] = 'fully_implemented';
			else if (main_status == false) practice_status_dict['practice_' + i] = 'not_implemented';
			else practice_status_dict['practice_' + i] = 'status_unknown';
            
        }
		return practice_status_dict;
	}

    render() {
    	return (<div class="outer-box">
    				<div><div className="scorecard"></div></div>
    			</div>)
    }
}

export default Glyphs;