import React, { Component } from "react";
import * as d3 from "d3";
import Glyphs from '../Components/Glyphs'

class Scorecard extends Component {


    componentDidMount() {

    }

    render(){

    return (
        <div>
            <div class="scorecard"></div>
            <Glyphs></Glyphs>
        </div>
        );
  }

}

export default Scorecard;



