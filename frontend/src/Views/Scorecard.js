import axios from "axios";
import React, { Component } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import StateCard from "../Components/State Scorecard/StateCard"
import Subheader from "../Components/Subheader"
import Legend from '../Components/Legend'


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
                implementationData: {},
                implemented: 0
            }],
            issueAreaData: {},
            currentIssue: {},
            currentIssueTitle: "Adam Walsh",
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
        this.setState({ p1_filter: !p });
        console.log("1");
    }
    changeP2 = (p) => {
        this.setState({ p2_filter: !p });

        console.log("2");
    }
    changeP3 = (p) => {
        this.setState({ p3_filter: !p })

        console.log("3s");
    }
    changeP4 = (p) => {
        this.setState({ p4_filter: !p })

        console.log("4");
    }
    changeP5 = (p) => {
        this.setState({ p5_filter: !p })

        console.log("5");
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


    //getStateInfo = (i, item, state, count, tempData) => {
    //    axios
    //        .get(`https://marina-t4sg.herokuapp.com/api/states/${state}/`)
    //        .then(res => {
    //            var temp = {
    //                id: i,
    //                implementationData: item,
    //                stateData: res.data,
    //                implemented: count
    //            }
    //            return temp
    //        })
    //        .then(temp => {
    //            tempData.push(temp);
    //            console.log(tempData.length);
    //        }
    //        )

    //        .catch(err => console.log(err))

    //}

    //setStatesData = (data) => {
    //    let tempData = [];
    //     // TODO: Data.reduce((practices) => {} , {})

    //    for (var i = 0; i < data.length; i++) {

    //        var item = data[i];

    //        if (item['issue_area'] === this.state.currentIssue) {
    //            var count = 0;


    //            if (item['practice_1']) {
    //                count++;
    //            }
    //            if (item['practice_2']) {
    //                count++;
    //            }
    //            if (item['practice_3']) {
    //                count++;
    //            }
    //            if (item['practice_4']) {
    //                count++;
    //            }
    //            if (item['practice_5']) {
    //                count++;
    //            }
    //            if (item['practice_6']) {
    //                count++;
    //            }
    //            if (item['practice_7']) {
    //                count++;
    //            }

    //            let state = item['state'];

    //            this.getStateInfo(i, item, state, count, tempData);
    //        }
    //    }

    //    this.setState({ data: tempData });

    //}

    matchData = (stateData, impData) => {
        let tempData = []
        console.log(stateData);
        console.log(impData);
        for (var i = 0; i < impData.length; i++) {
            var item = impData[i];
            if (item["issue_area"] === this.state.currentIssueTitle) {
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

                for (var j = 0; j < stateData.length; j++) {
                    if (item['state'] === stateData[j]['name']) {

                        var temp = {
                            id: j,
                            implementationData: item,
                            stateData: stateData[j],
                            implemented: count
                        }
                        tempData.push(temp);
                    }
                }
            }
        }

        this.setState({ data: tempData });
    }

    // TODO: Add total practices so that it is variable
    componentDidMount() {
        axios
            .get("https://marina-t4sg.herokuapp.com/api/states/")
            .then(stateRes => {
                axios
                    .get("https://marina-t4sg.herokuapp.com/api/implementations/")
                    .then(impRes => this.matchData(stateRes.data, impRes.data))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
        axios
            .get("https://marina-t4sg.herokuapp.com/api/issue-areas/")
            .then(res => this.setState(
                {
                    issueAreaData: res.data,
                    currentIssue: res.data[0],
                    currentIssueTitle: res.data[0]['title'],
                    total_practices: res.data[0]['num_practices']
                }
            ))
            .catch(err => console.log(err));
    }

    render() {
        // console.log("RENDER");
        //console.log(this.state.data);
        // console.log(this.state.data.length);
        var newStates = [...this.state.data];
        // console.log(newStates);
        var searchedStates = [];

        if (this.state.data.length > 1) {
            searchedStates = this.state.data;
            console.log(this.state.data);
            if (this.state.searchedState !== "") {
                searchedStates = searchedStates.filter(
                    state => state.stateData.name.toLowerCase().includes(this.state.searchedState.toLowerCase()) === true)
            }

        }

        if (this.state.p1_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_1 === true);
        }
        if (this.state.p2_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_2 === true);
        }
        if (this.state.p3_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_3 === true);
        }
        if (this.state.p4_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_4 === true);
        }
        if (this.state.p5_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_5 === true);
        }
        if (this.state.p6_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_6 === true);
        }
        if (this.state.p7_filter) {
            newStates = newStates.filter(
                state => state.implementationData.practice_7 === true);
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
        //console.log(newStates);
        //console.log(scoreCardStates);
        //console.log(searchedStates);
        if (newStates.length !== 0) {
            glyphs = <Glyphs
                states={newStates}
                totalCount={this.state.total_practices}
            />
        }

        var filter_checkboxes = [];
        for (var i = 1; i <= this.state.total_practices; i++) {
            if (i === 1) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP1(this.state.p1_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 2) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP2(this.state.p2_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 3) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP3(this.state.p3_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 4) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP4(this.state.p4_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 5) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP5(this.state.p5_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 6) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP6(this.state.p6_filter);
                            }
                            }
                        />
                    </label>
                )
            }
            else if (i === 7) {
                filter_checkboxes.push(
                    <label className="filter-label">
                        {this.state.currentIssue[`practice_${i}`]}
                        <input
                            className="filter-check"
                            type="checkbox"
                            label={this.state.currentIssue[`practice_${i}`]}
                            onChange={() => {
                                this.changeP7(this.state.p7_filter);
                            }
                            }
                        />
                    </label>
                )
            }

        }

        return (

            <div className="landing-page">

                <div className="playbook-region-header">
                    <Subheader title="National Comparison" />
                </div>

                <div className="filter-box">
                    <div>
                        <div className="filter-titles">

                            <h2> Promising Practices: </h2>
                            <h4> How Do the 50 States Compare? </h4>
                        </div>

                        <h5> Sort By... </h5>
                        <div className="sort-boxes">
                            <label className="sort-label">

                                <div className="sort-title"> Population Size </div>

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
                            </label>

                            <label className="sort-label">
                                <div className="sort-title">  Practices Implemented </div>

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
                            </label>

                            <label className="sort-label">

                                <div className="sort-title"> State vs County </div>
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
                            </label>
                        </div>
                    </div>


                    <div className="right-header">
                        <h5> Filter By... </h5>
                        <div className="checkboxes">
                            {filter_checkboxes}

                        </div>
                    </div>
                    <Legend />
                </div>

                <div>{glyphs}</div>


                <div id="state-by-state-area">
                    <div className="playbook-region-header">
                        <Subheader title="State-by-State Scorecard" />
                        <input
                            className="searchbar"
                            type="text"
                            value={this.state.searchedState}
                            placeholder={"search"}
                            onChange={this.updateSearchedState}
                        />
                    </div>

                    {searchedStates.map(state =>
                        <StateCard
                            state={state['stateData']["name"]}
                            implementation_data={state['implementationData']}
                            state_data={state['stateData']}
                            key={state.id}
                            total={this.state.total_practices}
                            completed={state['implemented']}
                            issueArea={this.state.currentIssue}
                        />)}
                </div>
            </div>
        );
    }
}
export default Scorecard
