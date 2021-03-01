import React, { Component } from "react";
import * as d3 from "d3";

class Scorecard extends Component {
      constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
      componentDidUpdate() {
          var color = d3.scaleOrdinal(d3.schemeBlues[9]);

          d3.selectAll("svg").remove()

          let svg = d3.select(this.myRef.current)
             .append('svg')
             .attr("class", "svg")
             .attr('width', 400)
             .attr('height', 400)
             .style("margin-left", 100);

          d3.json('http://localhost:8000/api/todos/')
          .then(function(data) {
            console.log(data);


          });

      }
}

export default function Scorecard() {
    return (
        <div>
            <h1> Scorecard </h1>
            <div>class="scorecard"</div>
        </div>

    );
}
