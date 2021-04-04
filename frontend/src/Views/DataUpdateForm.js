import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import StateCard from "../Components/State Scorecard/StateCard";
import Subheader from "../Components/Subheader";


class DataUpdateForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            issue_area: "",
            promising_practice: "no_fee",
            data: [{
                id: 0,
                abbreviation: "",
                electronic_request: false,
                name: "",
                no_fee: false,
                no_contact: false,
                no_notary_required: false,
                no_witness_required: false,
                county_administered: false,
                population: 0,
                implemented: 0
            }],
            display_data: [{
                id:0,
                name: "",
                display_bool: false,
            }],

        };
    }


    countImplementations(data) {
        let tempData = [];
        let tempDisplayData = [];
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
                    id: i,
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

            tempDisplayData.push(
                {
                    id: i,
                    name: item["name"],
                    display_bool: item[this.state.promising_practice]
                })
        }

        this.setState({ data: tempData });
        this.setState({ display_data: tempDisplayData});
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.countImplementations(res.data))
            .catch(err => console.log(err));
    }


/*
    setPromisingPractice = (p) => {
        for (var i = 1; i<this.state.data.length; i++){
            let bool = false;
            let state = this.state.data[i];
            switch(p){
                case "electronic_request":
                    bool = state.electronic_request;
                case "no_contact":
                    bool = state.no_contact;
                case "no_fee":
                    bool = state.no_fee;
                case "no_notary_required":
                    bool = state.no_notary_required;
                case "no_witness_required":
                    bool = state.no_witness_required;

            }
            this.state.display_data[i].display_bool = bool;
        }
    }
    */

    toggleDisplayCheckBox = (id) => {
        let temp_data = this.state.display_data;
        temp_data[id].display_bool = !temp_data[id].display_bool;
        this.setState({display_data: temp_data});
    }


    handleSaveDescriptions() {
        
    }


    handleSaveData() {

    }


    render() {

        return (
            <div className="landing-page">
            <div className="teal-section"></div>
            <div className = "data-update-page">
                <div className = "navigation-bar">
                    <div>Navigate to a Promising Practice...</div>
                    <div className="selected-promising-practice">Fee for a Background Check</div>
                    <div className="promising-practice">Notary Requirements</div>
                    <div className="promising-practice">Electronic Requests</div>
                </div>
                <div className = "update-section">
                    <Subheader title="Practice: Fee for Background Checks"/>
                    <div className = "update-box">
                        <h4>Update Descriptions</h4>
                        <div>Summary</div>
                        <div>Example Implementation</div>
                        <div>Contact Information</div>
                        <div>Link to Resource Guide</div>
                        <button className="save-button" onClick = {()=>this.handleSaveDescriptions()}>
                            Save Changes!</button>
                    </div>
                    <div className = "update-box">
                        <h4>Update State-By-State Data</h4>
                        <div className = "state-update-area">
                        
                        {this.state.display_data.map(state =>
                        <label className="state-update-check">
                        <input
                            className="state-update-check"
                            type="checkbox"
                            checked= {state.display_bool}
                            onChange={() => this.toggleDisplayCheckBox(state.id)}
                        />
                    {state.name}
                    </label>)}
                        </div>
                        <button className="save-button" onClick={()=>this.handleSaveData()}>
                            Save Changes!</button>
                    </div>
                </div>
            </div>
            </div>
        )

    }


}

export default DataUpdateForm;