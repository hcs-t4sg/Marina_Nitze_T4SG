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
            // console.log(this.state.currentIssue[`practice_${i}`]);
            let implementBlock = <ImplementBlock
                key={this.state.currentIssue[`practice_${i}`]}
                link={this.state.currentIssue[`practice_${i}_link`]}
                title={this.state.currentIssue[`practice_${i}`]}
                description={this.state.currentIssue[`practice_${i}_description`]}
                question={this.state.currentIssue[`practice_${i}_question`]}
                quote={this.state.currentIssue[`practice_${i}_quote`]}
            />
            tempImplementBlocks.push(implementBlock);
        }
        this.setState({ implementationBlocks: tempImplementBlocks });
    }


    componentDidMount() {
        this._isMounted = true;
        axios
            .get("https://marina-t4sg.herokuapp.com/api/issue-areas/")
            .then(res => {
                //  console.log(res.data);
                this.setState(
                    {
                        issueAreaData: res.data,
                        currentIssue: res.data[0],
                        currentIssueTitle: res.data[0]['title'],
                        total_practices: res.data[0]['num_practices']
                    })
            })
            .catch(err => console.log(err));
    }

    //componentDidMount() {
    //    this._isMounted = true;
    //    axios
    //        .get("http://localhost:8000/api/issue-areas/")
    //        .then(res => {
    //            console.log(res.data);
    //            this.setState(
    //                {
    //                    issueAreaData: res.data,
    //                    currentIssue: res.data[0],
    //                    currentIssueTitle: res.data[0]['title'],
    //                    total_practices: res.data[0]['num_practices']
    //                })
    //        })
    //        .catch(err => console.log(err));
    //}

    componentWillUnmount() {
        this._isMounted = false;
}

    handleClick = (issue) => {
        if (this._isMounted) {
            this.setState(
                {
                    currentIssueTitle: issue['title'],
                    currentIssue: issue,
                    total_practices: issue['num_practices']
                }
            )
        }

    }

    render() {

        var select_issues = [];
        var implement_blocks = [
            <div className="vary-block">
                <h1 className="vary-header"> Practices vary greatly state by state </h1>
                <p className="vary-text"> The following are descriptions of each practice, with implementation guides linked. </p>
            </div>
        ];

        if (this.state.issueAreaData.length > 0) {
            select_issues = this.state.issueAreaData.map(
                issue =>
                    <button
                        key={issue.id}
                        className={issue['title'] === this.state.currentIssueTitle ? "selected-issue" : "deselected-issue"}
                        onClick={() => {
                            this.handleClick(issue)
                        }}
                    > {issue['title']} </button>
            )
        }

        for (var i = 1; i <= this.state.total_practices; i++) {
            // console.log(implement_blocks.length);
            // console.log(this.state.currentIssueTitle);
            let implementBlock = <ImplementBlock
                key={this.state.currentIssue[`practice_${i}`]}
                link={this.state.currentIssue[`practice_${i}_link`]}
                title={this.state.currentIssue[`practice_${i}`]}
                description={this.state.currentIssue[`practice_${i}_description`]}
                question={this.state.currentIssue[`practice_${i}_question`]}
                quote={this.state.currentIssue[`practice_${i}_quote`]}
            />
            implement_blocks.push(implementBlock);
        }

        return (
            <div className="landing-page">
                <div className="teal-section-container">
                    <div className="teal-section"></div>
                    <h2 className="header-subtitle"> Child Welfare Playbook </h2>
                    <h1 className="title">Progress Dashboard</h1>
                </div>
                <div id="page-toggle">
                    {select_issues}
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

                        <div id="implementation-div">{implement_blocks}</div>

                        <div className="conclusion-text" dangerouslySetInnerHTML={{ __html: this.state.currentIssue['conclusion_text'] }}></div>

                        <div id="nationwide-comparison">
                            < Scorecard
                                key={this.state.currentIssue}
                                currentIssue={this.state.currentIssue}
                                currentIssueTitle={this.state.currentIssueTitle}
                                totalPractices={this.state.total_practices}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default LandingPage
