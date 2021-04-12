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
            currentIssue: {},
            total_practices: {},
            issueAreaData: [],
            currentIssueTitle: "Adam Walsh"
        }
    }

    createImplementationBlocks(data) {
        var tempImplementBlocks = [
            <div className="vary-block">
                <h1 className="vary-header"> Practices vary greatly state by state </h1>
                <p className="vary-text"> The following are descriptions of each practice, with implementation guides linked. </p>
            </div>
        ];
        for (var i = 1; i <= this.state.total_practices; i++) {
            let implementBlock = <ImplementBlock
                link={this.state.currentIssue[`practice_${i}_link`]}
                title={this.state.currentIssue[`practice_${i}`]}
                description={this.state.currentIssue[`practice_${i}_description`]}
                question={this.state.currentIssue[`practice_${i}_question`]}
                quote={this.state.currentIssue[`practice_${i}_quote`]}
            />
            tempImplementBlocks.push(implementBlock);
        }
        console.log(tempImplementBlocks);
        this.setState({ implementationBlocks: tempImplementBlocks });
    }


    componentDidMount() {
        axios
            .get("https://marina-t4sg.herokuapp.com/api/issue-areas/")
            .then(res => {
                this.setState(
                    {
                        issueAreaData: res.data,
                        currentIssue: res.data[0],
                        currentIssueTitle: res.data[0]['title'],
                        total_practices: res.data[0]['num_practices']
                    })
                this.createImplementationBlocks(res.data[0])
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div className="landing-page">
                <div className="teal-section-container">
                    <div className="teal-section"></div>
                    <h2 className="header-subtitle"> Child Welfare Playbook </h2>
                    <h1 className="title">Progress Dashboard</h1>
                </div>
                <div className="content-sidenav-container">
                    <div className="sidenav">
                        <a href="#introduction-container">Introduction</a>
                        <a href="#implementation-div">Overview of Promising Practices</a>
                        <a href="#nationwide-comparison">Nationwide Comparison</a>
                        <a href="#state-by-state-area">State-By-State Scorecard</a>
                    </div>

                    <div className="content">

                        <div id="introduction-container">
                            <Subheader title="Introduction" />
                            <div className="introduction-text">
                                <div dangerouslySetInnerHTML={{__html: this.state.currentIssue['intro_text']}}></div>
                            </div>
                        </div>
                        <div className="subtitle-container">
                            <Subheader title="Overview of Promising Practices" />
                        </div>

                        <div id="implementation-div">{this.state.implementationBlocks}</div>

                        <div className="conclusion-text" dangerouslySetInnerHTML={{ __html: this.state.currentIssue['conclusion_text'] }}></div>

                        <div id="nationwide-comparison">
                            <Scorecard />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default LandingPage
