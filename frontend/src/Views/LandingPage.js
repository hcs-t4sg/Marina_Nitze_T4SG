// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import ImplementBlock from "../Components/ImplementBlock"

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
            implemented_sort: 0,
            county_filter: 0
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

        axios
            .get("http://localhost:8000/api/implementation_guidance/")
            .then(res => this.createImplementationBlocks(res.data))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/introduction_text/")
            .then(res => this.introduction_text = String(res.data[0].text))
            .catch(err => console.log(err));

        axios
            .get("http://localhost:8000/api/conclusion_text/")
            .then(res => this.conclusion_text = res.data[0].text)
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

    createImplementationBlocks(data) {
        this.implementBlocks = [
            <div className="vary-block">
                <h1 className="vary-header"> Practices vary greatly state by state </h1>
                <p className="vary-text"> The following are descriptions of each practice, with implementation guides linked. </p>
            </div>
        ];
        for (var i = 0; i < data.length; i++) {
            let implementBlock = <ImplementBlock link="https://www.childwelfareplaybook.com/" guidance={data[i]} />
            this.implementBlocks.push(implementBlock);
        }
    }

    handleBlockText(data) {

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

        var introduction_text = this.introduction_text;
        return (
            <div className="landing-page">
                <div className="introduction_area">
                    <h1> Introduction </h1>
                    <div id="introduction_text" dangerouslySetInnerHTML={{__html: introduction_text}}></div>
                </div>
            
                <div className="implementation-div">

                    {this.implementBlocks}
                </div>
            </div>

        );
    }

}

export default LandingPage