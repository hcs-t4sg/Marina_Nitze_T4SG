import React, { Component } from "react";
import * as d3 from "d3";

// var displayData = [];

class Scorecard extends Component {


    componentDidMount() {
        this.displayData = [];
        this.initVis();
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

            vis.wrangleData();
    }

    wrangleData() {
        var vis = this;

        d3.json('http://localhost:8000/api/states/')
            .then(function(data) {
                // console.log(data);

            data.forEach( function(value, index) {

                // vis.displayData.append(value);

                vis.svg.append("text")
                    .attr("x", 100)
                    .attr("y", 100 * index)
                    .text(value.name + " " + value.population);

            });


        });

        // console.log(vis.displayData);

        // console.log(globalThis.displayData);


        vis.updateVis();
    }

    updateVis() {
        var vis = this;

    }

    drawSingleGlyph(state, g, width, height) {
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
    }

    render(){

    return (
        <div>
            <div class="scorecard"></div>


        </div>
        );


  }

}

export default Scorecard;



