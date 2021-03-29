// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import ImplementBlock from "../Components/ImplementBlock"
import Subheader from "../Components/Subheader";
import StateCard from "../Components/State Scorecard/StateCard"

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
            .get("http://localhost:8000/api/introduction_text/")
            .then((res) => this.setState({ introduction_text: res.data[0].text }))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/conclusion_text/")
            .then((res) => this.setState({ conclusion_text: res.data[0].text }))
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
        // var newStates = this.state.data;

        // if (this.state.electronic_request) {
        //     newStates = newStates.filter(
        //         state => state.electronic_request === true);
        // }

        // if (this.state.notary) {
        //     newStates = newStates.filter(
        //         state => state.no_notary_required === true);
        // }

        // if (this.state.fee) {
        //     newStates = newStates.filter(
        //         state => state.no_fee === true);
        // }

        // if (this.state.office) {
        //     newStates = newStates.filter(
        //         state => state.no_contact === true);
        // }

        // if (this.state.witness) {
        //     newStates = newStates.filter(
        //         state => state.no_witness_required === true);
        // }
        // if (newStates[0]) {


        // }

        // if (this.state.population_filter === 1) {
        //     newStates = newStates.filter(
        //         state => state.population < low_pop);
        // }
        // else if (this.state.population_filter === 2) {
        //     newStates = newStates.filter(
        //         state => state.population >= low_pop && state.population < high_pop);
        // }
        // else if (this.state.population_filter === 3) {
        //     newStates = newStates.filter(
        //         state => state.population >= high_pop);
        // }
        // if (this.state.implemented_sort === 1) {

        //     newStates.sort((a, b) => (a.implemented < b.implemented) ? 1 : -1)
        // }
        // else if (this.state.implemented_sort === -1) {

        //     newStates.sort((a, b) => (a.implemented > b.implemented) ? 1 : -1)
        // }
        // else if (this.state.implemented_sort === 0){
        //     newStates.sort((a, b) => (a.name > b.name) ? 1: -1)
        // }

        // if (this.state.county_filter === 0) {
        //     newStates = newStates;
        // }
        // else if (this.state.county_filter === 1) {
        //     newStates = newStates.filter(
        //         state => state.county_administered === true
        //     )
        // }
        // else if (this.state.county_filter === 2) {
        //     newStates = newStates.filter(
        //         state => state.county_administered === false
        //     )
        // }

        console.log(this.introduction_text);
        return (
            <div className="landing-page">
                
                <div className="teal-section"></div>
                <div className="general_text_area">
                    <h1 className="introduction-title"> Introduction </h1>
                    <div id="block_text" dangerouslySetInnerHTML={{__html: this.state.introduction_text}}></div>
                </div>

                {/* <div className="general_text_area">
                    <Subheader title="Introduction"/>
                    <div id="block_text" dangerouslySetInnerHTML={{__html: this.state.introduction_text}}></div>
                </div> */}

                <div className="implementation-div">{this.state.implementationBlocks}</div>

                <div id="block_text" dangerouslySetInnerHTML={{ __html: this.state.conclusion_text }}></div>
            </div>

        );
    }
}

export default LandingPage


// <div className="state-by-state-area">
//     <div className="playbook-region-header">
//     <Subheader title="State-by-State Scorecard"/>
//     <input
//         className = "searchbar"
//         type = "text"
//         value = {this.state.searchedState}
//         placeholder={"search"}
//         onChange={this.updateSearchedState}
//     />
//     </div>

//     {searchedStates.map(state =>
//         <StateCard state={state["name"]} state_data={state} key={state.id} total={this.state.total_practices} completed={state.implemented} />)}
//     </div>
// </div>


            


