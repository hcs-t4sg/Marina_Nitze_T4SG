// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import Subheader from "../Components/Subheader";
import StateCard from "../Components/State Scorecard/StateCard"


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            electronic_request: false,
            notary: false,
            fee: false,
            office: false,
            witness: false
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
            .then(res => this.setState({ data: res.data }, this.render))
            .catch(err => console.log(err));

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
                state => state.office_contact === true);
        }

        if (this.state.witness) {
            newStates = newStates.filter(
                state => state.no_witness_required === true);
        }
        if (newStates[0]) {

            console.log(newStates[0])
        }
        return (
            <div className="landing-page">

                <Subheader title="Hello" />
                <StateCard state="Alabama" state_data={{
                    abbreviation: "AL",
                    county_administered: true,
                    electronic_request: false,
                    name: "Alabama",
                    no_contact: false,
                    no_fee: true,
                    no_notary_required: true,
                    no_witness_required: false,
                    population: 4779736
                }} />

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
