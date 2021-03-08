import axios from "axios";
import React, { Component } from "react";
import * as d3 from "d3";
import Glyphs from '../Components/Glyphs'
import "../App.css"

class Scorecard extends Component {

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
            .then(res => this.setState({ data: res.data }))
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

        return (
            <div className="landing-page">

                <h1> Scorecard </h1>
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

                <Glyphs states={newStates}/>

            </div>

        );
    }


}

export default Scorecard;



