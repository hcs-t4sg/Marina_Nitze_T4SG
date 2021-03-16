// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"

const high_pop = 7500000;
const low_pop = 2500000;
class LandingPage extends Component {

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
            implemented_sort: 0
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


    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.countImplementations(res.data))
            .catch(err => console.log(err));
    }

    countImplementations(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var count = 0;
            var item = data[i];

            if (item["electronic_request"])
                count+=1;
            if (item["no_contact"])
                count+=1;
            if (item["no_fee"])
                count+=1;
            if (item["no_notary_required"])
                count+=1;
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

    render() {
        var newStates = this.state.data;
        
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
                state => state.no_contact === true);
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
        else if (this.state.implemented_sort === 0){
            newStates.sort((a, b) => (a.name > b.name) ? 1: -1)
        }


        return (
            <div className="landing-page">

                <h1> LandingPage </h1>
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
                            label="No Contact"
                            onChange={() => this.changeOffice(this.state.office)}
                        />
                    No Contact
                    </label> 

                    <label className="filter-label">

                        <input
                            className="filter-check"
                            type="checkbox"
                            label="No Witness"
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

                </div>

                {newStates.map(item => (
                    <li
                        key={item.id}
                    >
                        {item["name"]}
                    </li>

                ))}
            </div>

        );
    }

}

export default LandingPage
