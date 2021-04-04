import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import StateCard from "../Components/State Scorecard/StateCard"
import Subheader from "../Components/Subheader"


const high_pop = 7500000;
const low_pop = 2500000;

class Scorecard extends Component {

    // TODO: initial condition maybe shouldn't include Adam Walsh    
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                id: 0,
                stateData: {},
                implementationsData: {},
                implemented: 0
            }],
            issueAreaData: {},
            currentIssue: "Adam Walsh",
            p1_filter: false,
            p2_filter: false,
            p3_filter: false,
            p4_filter: false,
            p5_filter: false,
            p6_filter: false,
            p7_filter: false,
            population_filter: 0,
            implemented_sort: 0,
            county_filter: 0,
            searchedState: "",
            total_practices: 0
        };
    }

    changeP1 = (p) => {
        this.setState({ p1_filter: !p})
    }
    changeP2 = (p) => {
        this.setState({ p2_filter: !p })
    }
    changeP3 = (p) => {
        this.setState({ p3_filter: !p })
    }
    changeP4 = (p) => {
        this.setState({ p4_filter: !p })
    }
    changeP5 = (p) => {
        this.setState({ p5_filter: !p })
    }
    changeP6 = (p) => {
        this.setState({ p6_filter: !p })
    }
    changeP7 = (p) => {
        this.setState({ p7_filter: !p })
    }

    updateSearchedState = (s) => {
        this.setState({ searchedState: s.target.value })
    }

    getStateInfo = (i, item, state, count, tempData) => {
        axios
            .get(`http://localhost:8000/api/states/${state}/`)
            .then(res => {
                var temp = {
                    id: i,
                    implementationData: item,
                    stateData: res.data,
                    implemented_practices: count
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

        for (var i = 0; i < data.length; i++) {

            var item = data[i];

            if (item['issue_area'] === this.state.currentIssue) {
                var count = 0;


                if (item['practice_1']) {
                    count++;
                }
                if (item['practice_2']) {
                    count++;
                }
                if (item['practice_3']) {
                    count++;
                }
                if (item['practice_4']) {
                    count++;
                }
                if (item['practice_5']) {
                    count++;
                }
                if (item['practice_6']) {
                    count++;
                }
                if (item['practice_7']) {
                    count++;
                }

                let state = item['state'];

                this.getStateInfo(i, item, state, count, tempData);
            }
        }

        // console.log(tempData);
        this.setState({ data: tempData });

    }

    // TODO: Add total practices so that it is variable
    componentDidMount() {
        axios
            .get("http://localhost:8000/api/implementation/")
            .then(res => this.setStatesData(res.data))
            .catch(err => console.log(err));
        axios
            .get("http://localhost:8000/api/issue-areas/")
            .then(res => this.setState(
                {
                    issueAreaData: res.data,
                    currentIssue: res.data[0],
                    total_practices: 5
                }
            ))
            .catch(err => console.log(err));
    }

    render() {

        var newStates = this.state.data;
        var scoreCardStates = [];
        var searchedStates = [];

        if (this.state.data.length > 1) {
             scoreCardStates = this.state.data;
             searchedStates = scoreCardStates;
             if(this.state.searchedState !== ""){
                 searchedStates = searchedStates.filter(
                     state => state.stateData.name.toLowerCase().includes(this.state.searchedState.toLowerCase()) === true)
             }
             
        }

        if (this.state.p1_filter) {
            newStates = newStates.filter(
                state => state.stateData.p1 === true);
        }
        if (this.state.p2_filter) {
            newStates = newStates.filter(
                state => state.stateData.p2 === true);
        }
        if (this.state.p3_filter) {
            newStates = newStates.filter(
                state => state.stateData.p3 === true);
        }
        if (this.state.p4_filter) {
            newStates = newStates.filter(
                state => state.stateData.p4 === true);
        }
        if (this.state.p5_filter) {
            newStates = newStates.filter(
                state => state.stateData.p5 === true);
        }
        if (this.state.p6_filter) {
            newStates = newStates.filter(
                state => state.stateData.p6 === true);
        }
        if (this.state.p7_filter) {
            newStates = newStates.filter(
                state => state.stateData.p7 === true);
        }

        if (this.state.population_filter === 1) {
            newStates = newStates.filter(
                state => state.stateData.population < low_pop);
        }
        else if (this.state.population_filter === 2) {
            newStates = newStates.filter(
                state => state.stateData.population >= low_pop && state.stateData.population < high_pop);
        }
        else if (this.state.population_filter === 3) {
            newStates = newStates.filter(
                state => state.stateData.population >= high_pop);
        }
        if (this.state.implemented_sort === 1) {

            newStates.sort((a, b) => (a.implemented < b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === -1) {

            newStates.sort((a, b) => (a.implemented > b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === 0) {
            newStates.sort((a, b) => (a.stateData.name > b.stateData.name) ? 1 : -1)
        }

        if (this.state.county_filter === 0) {
            newStates = newStates;
        }
        else if (this.state.county_filter === 1) {
            newStates = newStates.filter(
                state => state.stateData.county_administered === true
            )
        }
        else if (this.state.county_filter === 2) {
            newStates = newStates.filter(
                state => state.stateData.county_administered === false
            )
        }

        var glyphs = null;
        if (newStates.length !== 0) {
            glyphs = <Glyphs states={newStates}/>
        }

    return (
            <div className="landing-page">

                <div className="playbook-region-header">
                    <Subheader title = "National Comparison"/>
                </div>
                
                <div className="filter-box">
                    <div className="checkboxes">
                        <label className="filter-label">
                        <input
                            className="filter-check"
                            type="checkbox"
                            label="Electronic Request"
                            onChange={() => this.changeP1(this.state.p1_filter)}
                        />
                        Electronic Request
                        </label>
                        <label className="filter-label">
                            <input
                                className="filter-check"
                                type="checkbox"
                                label=" No Notary"
                                onChange={() => this.changeP2(this.state.p2_filter)}
                            />
                        No Notary
                        </label>
                        <label className="filter-label">
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="No Fee"
                                onChange={() => this.changeP3(this.state.p3_filter)}
                            />
                        No Fee
                        </label>
                        <label className="filter-label">
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="Office Contact"
                                onChange={() => this.changeP4(this.state.p4_filter)}
                            />
                        Office Contact
                        </label>
                        <label className="filter-label">
                            <input
                                className="filter-check"
                                type="checkbox"
                                label="First"
                                onChange={() => this.changeP5(this.state.p5_filter)}
                            />
                        No Witness Needed
                        </label>
                    </div>
                <div className="sort-boxes">
                    <label className="filter-label">

                        <select onChange={(e) => {
                            if (e.target.value === "no-filter") {
                                this.setState({ population_filter: 0 })
                            }

                            else if (e.target.value === "small") {
                                this.setState({ population_filter: 1 })
                            }
                            else if (e.target.value === "medium") {
                                this.setState({ population_filter: 2 })
                            }
                            else if (e.target.value === "large") {
                                this.setState({ population_filter: 3 })
                            }
                        }}>
                            <option value="no-filter">Select a Population</option>
                            <option value="small">Less than 2.5 M</option>
                            <option value="medium">2.5M to 7.5 M</option>
                            <option value="large">7.5M +</option>
                        </select>
                        Population Size
                        </label>

                    <label className="filter-label">

                        <select onChange={(e) => {
                            if (e.target.value === "most") {
                                this.setState({ implemented_sort: 1 })
                            }

                            else if (e.target.value === "least") {
                                this.setState({ implemented_sort: -1 })
                            }
                            else if (e.target.value === "no-sort") {
                                this.setState({ implemented_sort: 0 })
                            }
                        }}>
                            <option value="no-sort">No Sort</option>
                            <option value="most">Most Practices Implemented</option>
                            <option value="least">Least Practices Implemented</option>
                        </select>
                            Metric
                        </label>

                    <label className="filter-label">

                        <select onChange={(e) => {
                            if (e.target.value === "no-filter") {
                                this.setState({ county_filter: 0 })
                            }

                            else if (e.target.value === "county") {
                                this.setState({ county_filter: 1 })
                            }
                            else if (e.target.value === "state") {
                                this.setState({ county_filter: 2 })
                            }
                        }}>
                            <option value="no-filter">County or State</option>
                            <option value="county">County Administered</option>
                            <option value="state">State Administered</option>
                        </select>
                        State vs County
                        </label>
                    </div>
            </div>

            <div>{glyphs}</div>


            <div className="state-by-state-area">
                <div className="playbook-region-header">
                <Subheader title="State-by-State Scorecard"/>
                <input
                    className = "searchbar"
                    type = "text"
                    value = {this.state.searchedState}
                    placeholder={"search"}
                    onChange={this.updateSearchedState}
                />
                </div>

                {searchedStates.map(state =>
                    <StateCard state={state['stateData']["name"]} state_data={state['stateData']} key={state.id} total={this.state.total_practices} completed={state['implemented']} />)}
                </div>
            </div>
        );
    }
}
export default Scorecard