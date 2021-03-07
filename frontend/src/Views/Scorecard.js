import React, { Component } from "react";
import * as d3 from "d3";



class Scorecard extends Component {

    componentDidMount() {
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
                console.log(data);

            data.forEach( function(value, index) {
                vis.svg.append("text")
                    .attr("x", 100)
                    .attr("y", 100 * index)
                    .text(value.name + " " + value.population);

            });
        });


        vis.updateVis();
    }

    updateVis() {
        var vis = this;

        console.log("did this worksksksksksks")
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



