import axios from "axios";
import React, { Component , useState } from "react";
import Glyphs from '../Components/Glyphs'
import "../App.css"
import StateCard from "../Components/State Scorecard/StateCard"

const high_pop = 7500000;
const low_pop = 2500000;

class Scorecard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                abbreviation: "",
                county_administered: false,
                electronic_request: false,
                name: "",
                no_contact: false,
                no_fee: false,
                no_notary_required: false,
                no_witness_required: false,
                population: 0,
                implemented: 0
            }],
            electronic_request: false,
            notary: false,
            fee: false,
            office: false,
            witness: false,
            population_filter: 0,
            implemented_sort: 0,
            county_filter: 0,
            searchedState: ""
        };
    }

    changeReq = (req) => {
        this.setState({ electronic_request: !req})
    }
    changeNotary = (n) => {
        this.setState({ notary: !n })
    }
    changeFee = (f) => {
        this.setState({ fee: !f })
    }
    changeOffice = (o) => {
        this.setState({ office: !o })
    }
    changeWitness = (w) => {
        this.setState({ witness: !w })
    }

    updateSearchedState = (s) => {
        this.setState({ searchedState: s.target.value })
    }

    countImplementations(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var count = 0;
            var item = data[i];

            if (item["electronic_request"])
                count += 1;
            if (item["no_contact"])
                count += 1;
            if (item["no_fee"])
                count += 1;
            if (item["no_notary_required"])
                count += 1;
            if (item["no_witness_required"])
                count += 1;

            tempData.push(
                {
                    abbreviation: item["abbreviation"],
                    county_administered: item["county_administered"],
                    electronic_request: item["electronic_request"],
                    name: item["name"],
                    no_contact: item["no_contact"],
                    no_fee: item["no_fee"],
                    no_notary_required: item["no_notary_required"],
                    no_witness_required: item["no_witness_required"],
                    population: item["population"],
                    implemented: count
                })


        }

        this.setState({ data: tempData });
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.countImplementations(res.data))
            .catch(err => console.log(err));
    }

    render() {

        var newStates = this.state.data;
        var scoreCardStates = [];
        var searchedStates = []

        if (this.state.data[0]["name"]) {
             scoreCardStates = this.state.data;
             searchedStates = scoreCardStates;
             if(this.state.searchedState !== ""){
                searchedStates = searchedStates.filter(
                    state => state.name.toLowerCase().includes( this.state.searchedState.toLowerCase() )===true)
             }
             
        }

        if (this.state.electronic_request) {
            newStates = newStates.filter(
                state => state.electronic_request === true);
        }
        if (this.state.notary) {
            newStates = newStates.filter(
                state => state.no_notary_required === true);
        }
        if (this.state.fee) {
            newStates = newStates.filter(
                state => state.no_fee === true);
        }
        if (this.state.office) {
            newStates = newStates.filter(
                state => state.office_contact === true);
        }
        if (this.state.witness) {
            newStates = newStates.filter(
                state => state.no_witness_required === true);
        }

        if (this.state.population_filter === 1) {
            newStates = newStates.filter(
                state => state.population < low_pop);
        }
        else if (this.state.population_filter === 2) {
            newStates = newStates.filter(
                state => state.population >= low_pop && state.population < high_pop);
        }
        else if (this.state.population_filter === 3) {
            newStates = newStates.filter(
                state => state.population >= high_pop);
        }
        if (this.state.implemented_sort === 1) {

            newStates.sort((a, b) => (a.implemented < b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === -1) {

            newStates.sort((a, b) => (a.implemented > b.implemented) ? 1 : -1)
        }
        else if (this.state.implemented_sort === 0) {
            newStates.sort((a, b) => (a.name > b.name) ? 1 : -1)
        }

        if (this.state.county_filter === 0) {
            newStates = newStates;
        }
        else if (this.state.county_filter === 1) {
            newStates = newStates.filter(
                state => state.county_administered === true
            )
        }
        else if (this.state.county_filter === 2) {
            newStates = newStates.filter(
                state => state.county_administered === false
            )
        }

        var glyphs = null;
        if (newStates.length !== 0) {
            glyphs = <Glyphs states={newStates}/>
        }

    return (
            <div className="landing-page">
                <h1> Playbook </h1>
                <div className="filter-box">
                    <label className="filter-label">
                    <input
                        className="filter-check"
                        type="checkbox"
                        label="Electronic Request"
                        onChange={() => this.changeReq(this.state.electronic_request)}
                    />
                    Electronic Request
                    </label>
                    <label className="filter-label">
                        <input
                            className="filter-check"
                            type="checkbox"
                            label=" No Notary"
                            onChange={() => this.changeNotary(this.state.notary)}
                        />
                    No Notary
                    </label>
                    <label className="filter-label">
                        <input
                            className="filter-check"
                            type="checkbox"
                            label="No Fee"
                            onChange={() => this.changeFee(this.state.fee)}
                        />
                    No Fee
                    </label>
                    <label className="filter-label">
                        <input
                            className="filter-check"
                            type="checkbox"
                            label="Office Contact"
                            onChange={() => this.changeOffice(this.state.office)}
                        />
                    Office Contact
                    </label>
                    <label className="filter-label">
                        <input
                            className="filter-check"
                            type="checkbox"
                            label="First"
                            onChange={() => this.changeWitness(this.state.witness)}
                        />
                    No Witness Needed
                    </label>
            </div>

            <div className="filter-box">
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

            <div>{glyphs}</div>

            
            <input
                className = "searchbar"
                type = "text"
                value = {this.state.searchedState}
                placeholder={"search"}
                onChange={this.updateSearchedState}
            />

            {
                searchedStates.map(state =>
                    <StateCard state={state["name"]} state_data={state} />
                )}
            

            </div>
        );
    }
}
export default Scorecard