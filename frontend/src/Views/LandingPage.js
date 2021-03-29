// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import ImplementBlock from "../Components/ImplementBlock"
import Subheader from "../Components/Subheader";
import StateCard from "../Components/State Scorecard/StateCard"

const high_pop = 7500000;
const low_pop = 2500000;
class LandingPage extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        axios
            .get("http://localhost:8000/api/implementation_guidance/")
            .then(res => this.createImplementationBlocks(res.data))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/introduction_text/")
            .then(res => this.introduction_text = String(res.data[0].text))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/conclusion_text/")
            .then(res => this.conclusion_text = res.data[0].text)
            .catch(err => console.log(err));
    }

    createImplementationBlocks(data) {
        this.implementBlocks = [
            <div className="vary-block">
                <h1 className="vary-header"> Practices vary greatly state by state </h1>
                <p className="vary-text"> The following are descriptions of each practice, with implementation guides linked. </p>
            </div>
        ];
        for (var i = 0; i < data.length; i++) {
            let implementBlock = <ImplementBlock link="https://www.childwelfareplaybook.com/" guidance={data[i]} />
            this.implementBlocks.push(implementBlock);
        }
    }

    handleBlockText(data) {

    }

    render() {
        return (
            <div className="landing-page">
                <div className="teal-section"></div>

                <div className="general_text_area">
                    <Subheader title="Introduction"/>
                    <div id="block_text" dangerouslySetInnerHTML={{__html: this.introduction_text}}></div>
                </div>

                <div className="implementation-div">{this.implementBlocks}</div>
                <div className="general_text_area">
                    <div id="block_text" dangerouslySetInnerHTML={{__html: this.conclusion_text}}></div>
                </div>

            </div>
        );
    }

}

export default LandingPage