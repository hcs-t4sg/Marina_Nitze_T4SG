// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import ImplementBlock from "../Components/ImplementBlock"
import Subheader from "../Components/Subheader";
import StateCard from "../Components/State Scorecard/StateCard"
import Scorecard from "./Scorecard"

const jurisdictions = 54;

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            implementationBlocks: [],
            currentIssue: {},
            total_practices: {},
            issueAreaData: [],
            currentIssueTitle: "Adam Walsh",
            implementationData: []
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
                key={this.state.currentIssue[`practice_${i}`]}
                link={this.state.currentIssue[`practice_${i}_link`]}
                title={this.state.currentIssue[`practice_${i}`]}
                description={this.state.currentIssue[`practice_${i}_description`]}
                question={this.state.currentIssue[`practice_${i}_question`]}
                example={this.state.currentIssue[`practice_${i}_example`]}
            />
            tempImplementBlocks.push(implementBlock);
        }
        this.setState({ implementationBlocks: tempImplementBlocks });
    }


    componentDidMount() {
        this._isMounted = true;
        axios
            .get("https://marina-t4sg.herokuapp.com/api/issue-areas/")
            //.get("http://localhost:8000/api/issue-areas/")
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
        axios
            .get("https://marina-t4sg.herokuapp.com/api/implementations/")
            .then(res => {
                this.setState(
                    {
                        implementationData: res.data
                    })
            })
            .catch(err => console.log(err));
    }

    //componentDidMount() {
    //    this._isMounted = true;
    //    axios
    //        .get("https://marina-t4sg.herokuapp.com/api/issue-areas/")
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

    //        axios
    //            .get("http://localhost:8000/api/implementations/")
    //            .then(res => {
    //            this.setState(
    //            {
    //                implementationData: res.data
    //            })
    //            })
    //            .catch (err => console.log(err));
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

    countStateImplementations = () => {
        var counts = [];

        for (var i = 1; i <= this.state.total_practices; i++) {
            //console.log("HELLO")
            //console.log(this.state.currentIssue[`num_subpractices_${i}`])
            if (this.state.currentIssue[`num_subpractices_${i}`] <= 1 || !this.state.currentIssue[`num_subpractices_${i}`]) {
                counts.push(0);
            }
            else {
                var submetrics = [];
                for (var j = 0; j < this.state.currentIssue[`num_subpractices_${i}`]; j++) {
                    submetrics.push(0);
                }
                counts.push(submetrics);
            }

        }

        // console.log(counts);

        for (var i = 0; i < this.state.implementationData.length; i++) {

            var data = this.state.implementationData[i];

            if (data['issue_area'] === this.state.currentIssueTitle) {

                for (var j = 1; j <= this.state.total_practices; j++) {
                    if (!this.state.currentIssue[`num_subpractices_${j}`] || this.state.currentIssue[`num_subpractices_${j}`] <= 1) {
                        if (data[`practice_${j}`]) {
                            counts[j - 1]++;
                        }
                    }
                    else {
                        for (var k = 0; k < this.state.currentIssue[`num_subpractices_${j}`]; k++) {

                            if (data[`subpractice_${j}_${k + 1}`]) {
                                counts[j - 1][k]++;
                            }
                        }
                    }
                }
            }
        }
        // console.log(counts)

        return counts
    }

    render() {
        var imp_counts = this.countStateImplementations()
        // console.log(imp_counts)

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
            //console.log(this.state.currentIssueTitle);
            //console.log(this.state.currentIssueTitle);
            var submetrics = []
            if (this.state.currentIssue[`subpractices_${i}_names`]) {
                submetrics = (this.state.currentIssue[`subpractices_${i}_names`].slice(1, this.state.currentIssue[`subpractices_${i}_names`].length - 1).split(","))

            }

            for (var j = 0; j < submetrics.length; j++) {
                submetrics[j] = submetrics[j].trim()
                submetrics[j] = submetrics[j].slice(1, submetrics[j].length - 1)
            }

            let implementBlock = <ImplementBlock
                key={this.state.currentIssue[`practice_${i}`]}
                link={this.state.currentIssue[`practice_${i}_link`]}
                title={this.state.currentIssue[`practice_${i}`]}
                description={this.state.currentIssue[`practice_${i}_description`]}
                question={this.state.currentIssue[`practice_${i}_question`]}
                example={this.state.currentIssue[`practice_${i}_example`]}
                num_subpractices={this.state.currentIssue[`num_subpractices_${i}`]}
                p_count={imp_counts[i - 1]}
                jurisdictions={jurisdictions}
                subpractices={submetrics}
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
                                <div dangerouslySetInnerHTML={{ __html: this.state.currentIssue['intro_text'] }}></div>
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
