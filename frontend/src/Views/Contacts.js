// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import "../Components/Contacts.css"
import Subheader from "../Components/Subheader";


class Contacts extends Component {

	constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            position: "",
            email: "",
            currentIssueTitle: "Adam Walsh"
        }
    }

	componentDidMount() {
        axios
            .get("http://localhost:8000/api/contacts/")
            .then(res => {
            	console.log(res.data);
                this.createContactRows(res.data[0])
            })
            .catch(err => console.log(err));
    }

    createContactRows(data) {
    	
    }

    render() {
    	return (
	        <div className="contacts-page">
		        <div className="teal-section-container">
		            <div className="teal-section"></div>
		            <h2 className="header-subtitle"> Child Welfare Playbook </h2>
		            <h1 className="title">Family Findings State Contacts </h1>
		        </div>

		        <Subheader title="Family Findings: Contacts"/>

		        <div className="contact-grid">
	                <div className="contact-grid-row"></div>
	            </div>

	        </div>

    	);
    }
}

export default Contacts
