// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import ImplementBlock from "../Components/ImplementBlock"
import Subheader from "../Components/Subheader";
import StateCard from "../Components/State Scorecard/StateCard"
import Scorecard from "./Scorecard"

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            implementationBlocks: [],
            introduction_text: "",
            conclusion_text: ""

        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/implementation_guidance/")
            .then(res => this.createImplementationBlocks(res.data))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/issue-areas/")
            .then((res) => this.setState({ 
                introduction_text: res.data[0].introduction_text,
                conclusion_text: res.data[0].conclusion_text
            }))
            .catch(err => console.log(err));
    }

    createImplementationBlocks(data) {
        var tempImplementBlocks = [
            <div className="vary-block">
                <h1 className="vary-header"> Practices vary greatly state by state </h1>
                <p className="vary-text"> The following are descriptions of each practice, with implementation guides linked. </p>
            </div>
        ];
        for (var i = 0; i < data.length; i++) {
            let implementBlock = <ImplementBlock link="https://www.childwelfareplaybook.com/" guidance={data[i]} />
            tempImplementBlocks.push(implementBlock);
        }

        this.setState({ implementationBlocks: tempImplementBlocks });
    }

    render() {
        return (
            <div className="landing-page">
                <div className="teal-section-container">
                    <div className="teal-section"></div>
                    <h2 className="header-subtitle"> Child Welfare Playbook </h2>
                    <h1 className="title">Scorecard</h1>
                </div>

                <div className="sidenav">
                    <a href="#introduction-container">Introduction</a>
                    <a href="#implementation-div">Overview of Practices</a>
                    <a href="#nationwide-comparison">Nationwide Comparison</a>
                    <a href=".state-by-state-area">State-By-State Scorecard</a>
                </div>

                <div className="general-text-area">
                    <Subheader title="Introduction"/>
                    <div id="block_text" dangerouslySetInnerHTML={{__html: this.state.introduction_text}}></div>
                </div>

                <div className="content">

                    <div id="introduction-container">
                        <Subheader title="Introduction"/>
                        <div id="introduction-text" dangerouslySetInnerHTML={{__html: this.state.introduction_text}}></div>
                    </div>

                    <div id="implementation-div">{this.state.implementationBlocks}</div>

                    <div id="nationwide-comparison">
                        <Scorecard/>
                    </div>

                    <div id="conclusion-text" dangerouslySetInnerHTML={{ __html: this.state.conclusion_text }}></div>
                </div>
            </div>

        );
    }
}

export default LandingPage
