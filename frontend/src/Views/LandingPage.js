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

    getStateInfo = (item, state, tempData) => {
        axios
            .get(`http://localhost:8000/api/states/${state}/`)
            .then(res => {
                var temp = {
                    implementationData: item,
                    stateData: res.data
                }
                return temp
            })
            .then(temp => {
                tempData.push(temp);
            }
            )

            .catch(err => console.log(err))

    }

    setStatesData = (data) => {
        let tempData = [];

        let issueArea = data[0]['issue_area'];

        for (var i = 0; i < data.length; i++) {

            var count = 0;

            var item = data[i];

            let state = item['state'];

            this.getStateInfo(item, state, tempData);

        }

        // console.log(tempData);
        this.setState({ data: tempData });

    }


    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err));
        axios
            .get("http://localhost:8000/api/implementation/")
            .then(res => this.setStatesData(res.data))
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
                <div className="content-sidenav-container">
                    <div className="sidenav">
                        <a href="#introduction-container">Introduction</a>
                        <a href="#implementation-div">Overview of Practices</a>
                        <a href="#nationwide-comparison">Nationwide Comparison</a>
                        <a href="#state-by-state-area">State-By-State Scorecard</a>
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
            </div>

        );
    }
}

export default LandingPage
